import Concept from             '../Concept/main.mjs'
import NodeInstanceConcept from '../NodeInstanceConcept/main.mjs'
import Prove from               '../Prove/main.mjs'
import TextConcept from         '../TextConcept/main.mjs'
let insertArrayAfter=(a,b)=>{
    for(let p of a){
        b.parentNode.insertBefore(p,b.nextSibling)
        b=p
    }
}
let FragmentConcept=class extends Concept{
    constructor(prop={},child){
        super(prop)
        this.c=child.map(a=>
            typeof a=='string'?new TextConcept({},a):
            a instanceof Node?new NodeInstanceConcept(a):
            Symbol.iterator in a?new FragmentConcept({},a):a
        )
    }
    getNode(p){
        return[p.node[0],...this.c.flatMap((c,i)=>
            c.getNode(p.child[i])
        )]
    }
    make(root){
        let child=this.c.map((a,i)=>
            a.make(root)
        )
        return new Prove(root,[new Text,...child.flatMap(a=>a.node)],child)
    }
    sub(c){
        if(!(c instanceof FragmentConcept))
            return super.sub(c)
        return prove=>{
            let m=prove.node[0]
            let posNode=[],keyNode={}
            {
                let n=m
                for(let[i,d]of c.c.entries()){
                    let res=d.getNode(prove.child[i])
                    if('_key'in d.p)
                        keyNode[d.p._key]={i,node:res}
                    else
                        posNode.push({i,node:res})
                    n=res.at(-1)
                }
            }
            let mount={}
            {
                let pos=0
                for(let[i,d]of this.c.entries())
                    if('_key'in d.p){
                        if(d.p._key in keyNode){
                            mount[i]=keyNode[d.p._key]
                            delete keyNode[d.p._key]
                        }
                    }else{
                        if(pos in posNode){
                            mount[i]=posNode[pos]
                            delete posNode[pos]
                        }
                        pos++
                    }
            }
            for(let n of function*(){
                for(let k in posNode)
                    yield posNode[k]
                for(let k of Reflect.ownKeys(keyNode))
                    yield keyNode[k]
            }()){
                c.c[n.i].undoEffect(prove.child[n.i])
                for(let o of n.node)
                    m.parentNode.removeChild(o)
            }
            let child=[],n=m
            for(let[i,d]of this.c.entries()){
                let newProve
                if(mount[i]){
                    if(n.nextSibling!=mount[i].node[0])
                        insertArrayAfter(mount[i].node,n)
                    newProve=d.sub(c.c[mount[i].i])(prove.child[mount[i].i])
                }else{
                    newProve=d.make(prove.root)
                    insertArrayAfter(newProve.node,n)
                }
                child.push(newProve)
                n=newProve.node.at(-1)
            }
            prove.child=child
            prove.node=[m,...child.flatMap(a=>a.node)]
            return prove
        }
    }
    undoEffect(prove){
        this.c.map((c,i)=>c.undoEffect(prove.child[i]))
    }
}
export default FragmentConcept

import Concept from             '../Concept/main.mjs'
import NodeInstanceConcept from '../NodeInstanceConcept/main.mjs'
import TextConcept from         '../TextConcept/main.mjs'
let FragmentConcept=class extends Concept{
    constructor(prop={},...child){
        super()
        this.c=child.map(a=>
            typeof a=='string'?new TextConcept({},a):
            a instanceof Node?new NodeInstanceConcept(a):
            Symbol.iterator in a?new FragmentConcept({},...a):a
        )
        this.p=prop
    }
    getNode(n){
        return[n,...this.c.flatMap(c=>{
            let b=c.getNode(n.nextSibling)
            n=b.at(-1)
            return b
        })]
    }
    make(){
        return[new Text,...this.c.flatMap(a=>a.make())]
    }
    sub(c){
        if(!(c instanceof FragmentConcept))
            return super.sub(c)
        return m=>{
            let posNode=[],keyNode={}
            {
                let n=m
                for(let d of c.c){
                    let res=d.getNode(n.nextSibling)
                    if('_key'in d.p)
                        keyNode[d.p._key]={concept:d,node:res}
                    else
                        posNode.push({concept:d,node:res})
                    n=res.at(-1)
                }
            }
            let insertArrayAfter=(a,b)=>{
                for(let p of a){
                    b.parentNode.insertBefore(p,b.nextSibling)
                    b=p
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
            let n=m
            for(let s of[posNode,keyNode])
                for(let k in s)
                    for(let o of s[k].node)
                        m.parentNode.removeChild(o)
            for(let[i,d]of this.c.entries())
                if(mount[i]){
                    if(n.nextSibling!=mount[i].node[0])
                        insertArrayAfter(mount[i].node,n)
                    ;[,n]=d.sub(mount[i].concept)(mount[i].node[0])
                }else{
                    let res=d.make()
                    insertArrayAfter(res,n)
                    n=res.at(-1)
                }
            return[m,n]
        }
    }
}
export default FragmentConcept

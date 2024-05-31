import Concept from             '../Concept/main.mjs'
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
      Symbol.iterator in a?new FragmentConcept({},a):a
    )
  }
  doEffect(prove){
    if(prove.ended)
      return
    super.doEffect(prove)
    for(let i=0;i<this.c.length;i++)
      this.c[i].doEffect(prove.child[i])
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
          let res=prove.child[i].node
          if('key'in d.p)
            keyNode[d.p.key]={i,node:res}
          else
            posNode.push({i,node:res})
          n=res.at(-1)
        }
      }
      let mount={}
      {
        let pos=0
        for(let[i,d]of this.c.entries())
          if('key'in d.p){
            if(d.p.key in keyNode){
              mount[i]=keyNode[d.p.key]
              delete keyNode[d.p.key]
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
          d.doEffect(newProve)
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
    if(prove.ended)
      return
    this.c.map((c,i)=>c.undoEffect(prove.child[i]))
    super.undoEffect(prove)
  }
}
export default FragmentConcept

import Concept from             '../Concept/main.mjs'
import Proof from               '../Proof/main.mjs'
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
    this._child=child
  }
  _doEffect(proof){
    if(proof._ended)
      return
    super._doEffect(proof)
    for(let i=0;i<this._child.length;i++)
      this._child[i]._doEffect(proof._child[i])
  }
  _make(root){
    let child=this._child.map((a,i)=>
      a._make(root)
    )
    return new Proof(root,[new Text,...child.flatMap(a=>a._node)],child)
  }
  _sub(c,proof){
    if(!(c instanceof FragmentConcept))
      return super._sub(c,proof)
    let m=proof._node[0]
    let posNode=[],keyNode={}
    {
      let n=m
      for(let[i,d]of c._child.entries()){
        let res=proof._child[i]._node
        if('key'in d._prop)
          keyNode[d._prop.key]={i,_node:res}
        else
          posNode.push({i,_node:res})
        n=res.at(-1)
      }
    }
    let mount={}
    {
      let pos=0
      for(let[i,d]of this._child.entries())
        if('key'in d._prop){
          if(d._prop.key in keyNode){
            mount[i]=keyNode[d._prop.key]
            delete keyNode[d._prop.key]
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
      c._child[n.i]._undoEffect(proof._child[n.i])
      for(let o of n._node)
        m.parentNode.removeChild(o)
    }
    let child=[],n=m
    for(let[i,d]of this._child.entries()){
      let newProof
      if(mount[i]){
        if(n.nextSibling!=mount[i]._node[0])
          insertArrayAfter(mount[i]._node,n)
        newProof=d._sub(c._child[mount[i].i],proof._child[mount[i].i])
      }else{
        newProof=d._make(proof._root)
        insertArrayAfter(newProof._node,n)
        d._doEffect(newProof)
      }
      child.push(newProof)
      n=newProof._node.at(-1)
    }
    proof._child=child
    proof._node=[m,...child.flatMap(a=>a._node)]
    return proof
  }
  _undoEffect(proof){
    if(proof._ended)
      return
    this._child.map((c,i)=>c._undoEffect(proof._child[i]))
    super._undoEffect(proof)
  }
}
export default FragmentConcept

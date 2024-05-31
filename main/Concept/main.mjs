let sentinel=new Text
export default class{
  constructor(prop){
    this._prop=prop
  }
  _doEffect(){
  }
  _sub(c){
    return proof=>{
      let n=proof._node[0]
      c._undoEffect(proof)
      let
        newProof=this._make(proof._root),
        res=newProof._node,
        a=proof._node,
        parentNode=n.parentNode
      parentNode.insertBefore(sentinel,n)
      let f=new DocumentFragment
      f.append(...res)
      parentNode.insertBefore(f,sentinel)
      parentNode.removeChild(sentinel)
      for(let o of new Set(a).difference(new Set(res)))
        parentNode.removeChild(o)
      this._doEffect(newProof)
      return newProof
    }
  }
  _undoEffect(proof){
    proof._ended=1
  }
}

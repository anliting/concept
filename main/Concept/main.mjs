let sentinel=new Text
export default class{
  constructor(prop){
    this.p=prop
  }
  doEffect(){
  }
  sub(c){
    return prove=>{
      let n=prove.node[0]
      c.undoEffect(prove)
      let
        newProve=this.make(prove.root),
        res=newProve.node,
        a=prove.node,
        parentNode=n.parentNode
      parentNode.insertBefore(sentinel,n)
      let f=new DocumentFragment
      f.append(...res)
      parentNode.insertBefore(f,sentinel)
      parentNode.removeChild(sentinel)
      for(let o of new Set(a).difference(new Set(res)))
        parentNode.removeChild(o)
      this.doEffect(newProve)
      return newProve
    }
  }
  undoEffect(prove){
    prove.ended=1
  }
}

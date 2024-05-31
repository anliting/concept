import Concept from'../Concept/main.mjs'
let NodeConcept=class extends Concept{
  _sub(c){
    if(!(c instanceof NodeConcept))
      return super._sub(c)
    return proof=>{
      let res=this._make(proof._root)
      proof._node[0].parentNode.replaceChild(res._node[0],proof._node[0])
      proof._child=res._child
      proof._node=res._node
      return proof
    }
  }
}
export default NodeConcept

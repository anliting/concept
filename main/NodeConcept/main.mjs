import Concept from'../Concept/main.mjs'
let NodeConcept=class extends Concept{
  sub(c){
    if(!(c instanceof NodeConcept))
      return super.sub(c)
    return prove=>{
      let res=this.make(prove.root)
      prove.node[0].parentNode.replaceChild(res.node[0],prove.node[0])
      prove.child=res.child
      prove.node=res.node
      return prove
    }
  }
}
export default NodeConcept

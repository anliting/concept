import NodeConcept from'../NodeConcept/main.mjs'
import Prove from'../Prove/main.mjs'
let TextConcept=class extends NodeConcept{
  constructor(prop,wholeText){
    super(prop)
    this.t=wholeText
  }
  make(root){
    return new Prove(root,[new Text(this.t)])
  }
  sub(c){
    if(!(c instanceof TextConcept))
      return super.sub(c)
    if(this.t==c.t)
      return prove=>prove
    return prove=>{
      prove.node[0].nodeValue=this.t
      return prove
    }
  }
}
export default TextConcept

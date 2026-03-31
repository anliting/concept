import NodeConcept from'../NodeConcept/main.mjs'
import Proof from'../Proof/main.mjs'
let TextConcept=class extends NodeConcept{
  constructor(prop,wholeText){
    super(prop)
    this._text=wholeText
  }
  _make(root){
    return new Proof(root,[new Text(this._text)])
  }
  _sub(c,p){
    if(!(c instanceof TextConcept))
      return super._sub(c,p)
    if(this._text==c._text)
      return p
    p._node[0].nodeValue=this._text
    return p
  }
}
export default TextConcept

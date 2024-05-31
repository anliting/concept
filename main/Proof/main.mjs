export default class{
  constructor(root,node,child=[]){
    this._child=child
    this._clean=1
    this._concept=null
    this._effect=[]
    this._ended=0
    this._functionConcept=null
    this._node=node
    this._ref={}
    this._root=root
  }
}

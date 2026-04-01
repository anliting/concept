export default class{
  constructor(root,node,child=[]){
    this._child=child
    this._effect=[]
    this._ended=0
    this._node=node
    this._ref={}
    this._root=root
  }
}

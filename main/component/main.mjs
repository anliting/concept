import Concept from                     '../Concept/main.mjs'
import Proof from                       '../Proof/main.mjs'
import{arrayIs,objectContentIs}from     '../base/main.mjs'
import{withEffect}from                  '../effect/main.mjs'
import{withMemory}from                  '../memory/main.mjs'
import toConcept from                   '../toConcept/main.mjs'
let GeneratorFunction=function*(){}.constructor
let ComponentProof=class extends Proof{
  _childConcept=null
  constructor(root,concept){
    super(root)
    this._concept=concept
  }
}
let ComponentConcept=class extends Concept{
  constructor(prop,fun,child){
    super(prop)
    this._function=fun
    this._child=child
  }
  _doEffect(proof){
    if(proof._ended)
      return
    super._doEffect(proof)
    proof._effect.map(e=>{
      if(e[0] instanceof GeneratorFunction){
        let a=e[0]()
        a.next()
        e[0]=a.next.bind(a)
      }else
        e[0]=e[0]()
    })
    proof._childConcept._doEffect(proof._child[0])
  }
  _make(root){
    let proof=new ComponentProof(root,this)
    proof._childConcept=toConcept(withEffect(proof._effect,()=>
      withMemory(proof,()=>this._function(this._prop,...this._child))
    ))
    proof._child=[proof._childConcept._make(root)]
    proof._node=proof._child[0]._node
    return proof
  }
  _sub(c,proof){
    if(!(
      c instanceof ComponentConcept&&
      this._function==c._function
    ))
      return super._sub(c,proof)
    if(
        objectContentIs(c._prop,this._prop)&&
        arrayIs(c._child,this._child)&&
        proof._clean
      ||
        proof._ended
    )
      return proof
    let oldCon=proof._childConcept,oldEff=proof._effect,effect=[]
    let concept=toConcept(withEffect(effect,()=>
      withMemory(proof,()=>this._function(this._prop,...this._child))
    ))
    let dif=oldEff.map((e,i)=>i).filter(i=>{
      let e=oldEff[i]
      return !(e[1]&&arrayIs(e[1],effect[i][1]))
    })
    dif.map(i=>oldEff[i][0]?.())
    proof._child[0]=proof._root._changeProof(oldCon,proof._child[0],concept)
    proof._childConcept=concept
    effect=effect.map((e,i)=>{
      if(arrayIs(e[1],oldEff[i][1]))
        return oldEff[i]
      if(e[0] instanceof GeneratorFunction){
        let a=e[0]()
        a.next()
        e[0]=a.next.bind(a)
      }else
        e[0]=e[0]()
      return e
    })
    proof._clean=1
    proof._concept=this
    proof._effect=effect
    proof._node=proof._child[0]._node
    return proof
  }
  _undoEffect(proof){
    if(proof._ended)
      return
    proof._effect.map(a=>a[0]?.())
    proof._effect=[]
    proof._childConcept._undoEffect(proof._child[0])
    super._undoEffect(proof)
  }
}
export let component=f=>(...a)=>{
  let[prop,arg]=
    typeof a[0]=='object'&&
    a[0]!=null&&
    Object.getPrototypeOf(a[0])==Object.prototype?
      [a[0],a.slice(1)]
    :
      [{},a]
  return new ComponentConcept(prop,f,arg)
}

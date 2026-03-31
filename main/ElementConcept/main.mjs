import{arrayIs}from             '../base/main.mjs'
import FragmentConcept from     '../FragmentConcept/main.mjs'
import NodeConcept from         '../NodeConcept/main.mjs'
import Proof from               '../Proof/main.mjs'
let propertySub=(newP,oldP)=>proof=>{
  let n=proof._node[0]
  let specialProp=new Set([
    'key','ref',
    'checked',
    'innerHTML',
    'style','Style',
    'value',
  ])
  if(oldP.ref)
    delete oldP.ref.current
  if(newP.ref)
    newP.ref.current=n
  if(!Object.is(oldP.checked,newP.checked))
    n.checked=newP.checked
  if(!Object.is(oldP.innerHTML,newP.innerHTML))
    n.innerHTML=newP.innerHTML
  if(!arrayIs(
    [oldP.style,oldP.Style],
    [newP.style,newP.Style],
  ))
    if('Style'in oldP||'Style'in newP){
      n.removeAttribute('style')
      if('Style'in newP)
        n.setAttribute('style',newP.Style)
      if('style'in newP)
        Object.assign(n.style,newP.style)
      for(let s of Object.keys(newP.style||{}))
        if(s.includes('-'))
          n.style.setProperty(s,newP.style[s])
        else
          n.style[s]=newP.style[s]
    }else
      for(let s of
        new Set(Object.keys(newP.style||{}))
        .union(new Set(Object.keys(oldP.style||{})))
      )
        if(newP.style&&s in newP.style){
          if(oldP.style?.[s]!=newP.style[s])
            if(s.includes('-'))
              n.style.setProperty(s,newP.style[s])
            else
              n.style[s]=newP.style[s]
        }else
          n.style.removeProperty(s)
  if(!Object.is(oldP.value,newP.value))
    n.value='value'in newP?newP.value:''
  let s=new Set(Object.keys(newP))
    .union(new Set(Object.keys(oldP)))
    .difference(specialProp)
  for(let e of[...s].map(
    a=>a.match(/^[Oo]n(.*)/)
  ).filter(a=>a).map(a=>a[1])){
    if(!arrayIs(
      [
        oldP['on'+e],
        oldP['On'+e]
      ],
      [
        newP['on'+e],
        newP['On'+e]
      ],
    )){
      n.removeAttribute('on'+e)
      n['on'+e]=null
      if('on'+e in newP)
        n['on'+e]=newP['on'+e]
      if('On'+e in newP)
        n.setAttribute('on'+e,newP['On'+e])
    }
    s.delete('on'+e)
    s.delete('On'+e)
  }
  for(let k of s)
    if(k in newP)
      n.setAttribute(k,newP[k])
    else
      n.removeAttribute(k)
  return proof
}
let ElementConcept=class extends NodeConcept{
  constructor(tagName,prop,child){
    super(prop)
    this._tagName=tagName
    this._child=child
  }
  _doEffect(proof){
    if(proof._ended)
      return
    super._doEffect(proof)
    new FragmentConcept({},this._child)._doEffect(proof._child[0])
  }
  _make(root){
    let a=document.createElement(this._tagName)
    let proof=new Proof(root,[a],[
      new FragmentConcept({},this._child)._make(root)
    ])
    for(let n of proof._child[0]._node)
      a.appendChild(n)
    proof=propertySub(this._prop,{})(proof)
    if(this._prop._ref)
      this._prop._ref.current=a
    return proof
  }
  _sub(c,p){
    if(c==this)
      return p
    if(!(
      c instanceof ElementConcept&&
      this._tagName==c._tagName
    ))
      return super._sub(c,p)
    p._root._changeProof(
      new FragmentConcept({},c._child),
      p._child[0],
      new FragmentConcept({},this._child)
    )
    return propertySub(this._prop,c._prop)(p)
  }
  _undoEffect(proof){
    if(proof._ended)
      return
    new FragmentConcept({},this._child)._undoEffect(proof._child[0])
    super._undoEffect(proof)
  }
}
export default ElementConcept

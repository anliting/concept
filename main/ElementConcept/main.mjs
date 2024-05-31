import{arrayIs}from             '../base/main.mjs'
import FragmentConcept from     '../FragmentConcept/main.mjs'
import NodeConcept from         '../NodeConcept/main.mjs'
import Prove from               '../Prove/main.mjs'
let propertySub=(newP,oldP)=>prove=>{
  let n=prove.node[0]
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
  return prove
}
let ElementConcept=class extends NodeConcept{
  constructor(tagName,prop,child){
    super(prop)
    this.t=tagName
    this.c=child
  }
  doEffect(prove){
    if(prove.ended)
      return
    super.doEffect(prove)
    new FragmentConcept({},this.c).doEffect(prove.child[0])
  }
  make(root){
    let a=document.createElement(this.t)
    let prove=new Prove(root,[a],[new FragmentConcept({},this.c).make(root)])
    for(let n of prove.child[0].node)
      a.appendChild(n)
    prove=propertySub(this.p,{})(prove)
    if(this.p.ref)
      this.p.ref.current=a
    return prove
  }
  sub(c){
    if(c==this)
      return p=>p
    if(!(
      c instanceof ElementConcept&&
      this.t==c.t
    ))
      return super.sub(c)
    return prove=>{
      ;(new FragmentConcept({},this.c)).sub(
        new FragmentConcept({},c.c)
      )(prove.child[0])
      return propertySub(this.p,c.p)(prove)
    }
  }
  undoEffect(prove){
    if(prove.ended)
      return
    new FragmentConcept({},this.c).undoEffect(prove.child[0])
    super.undoEffect(prove)
  }
}
export default ElementConcept

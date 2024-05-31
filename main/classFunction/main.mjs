import toConcept from           '../toConcept/main.mjs'
export let classFunction=A=>(...a)=>{
  let[prop,child]=
    typeof a[0]=='object'&&
    a[0]!=null&&
    Object.getPrototypeOf(a[0])==Object.prototype?
      [a[0],a.slice(1)]
    :
      [{},a]
  return new A(prop,child.map(toConcept))
}

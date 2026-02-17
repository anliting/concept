export let classFunction=A=>(...a)=>
  typeof a[0]=='object'&&
  a[0]!=null&&
  Object.getPrototypeOf(a[0])==Object.prototype?
    new A(a[0],a.slice(1))
  :
    new A({},a)

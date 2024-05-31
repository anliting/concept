import{ChildLazyArray,RootLazyArray}from'../main.mjs'
let
    a=new RootLazyArray([2,3,5,7]),
    b=new ChildLazyArray(a,{3:8,4:13}),
    c=new ChildLazyArray(a,{length:3})
console.log(a.slice(),b.slice(),c.slice())

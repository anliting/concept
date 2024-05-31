export let
  arrayEqual=(a,b)=>a.length==b.length&&a.every((e,i)=>e==b[i]),
  arrayIs=(a,b)=>a.length==b.length&&a.every((e,i)=>Object.is(e,b[i])),
  objectContentIs=(a,b)=>{
    let aKey=Reflect.ownKeys(a),bKey=Reflect.ownKeys(b)
    return aKey.length==bKey.length&&aKey.every(k=>
      k in b&&Object.is(a[k],b[k])
    )
  }

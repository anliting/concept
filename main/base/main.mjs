export let
    arrayEqual=(a,b)=>a.length==b.length&&a.every((e,i)=>e==b[i]),
    arrayStrictEqual=(a,b)=>a.length==b.length&&a.every((e,i)=>e===b[i])

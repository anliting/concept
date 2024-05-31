let
  currentEffect,
  useEffect=(cb,dep)=>{
    currentEffect.push([cb,dep])
  },
  withEffect=(e,f)=>{
    let previousEffect=currentEffect
    currentEffect=e
    try{
      return f()
    }finally{
      currentEffect=previousEffect
    }
  }
export{useEffect,withEffect}

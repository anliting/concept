import{arrayIs}from             '../base/main.mjs'
let
  currentProve,
  currentMemoryBlock,
  useCallback=(cb,dep)=>{
    let cbDepRef=useRef([cb,dep])
    if(!arrayIs(cbDepRef.current[1],dep))
      cbDepRef.current=[cb,dep]
    return cbDepRef.current[0]
  },
  useMemo=(cb,dep)=>{
    let ref=useRef(null)
    if(!(ref.current&&arrayIs(ref.current[1],dep)))
      ref.current=[cb(),dep]
    return ref.current[0]
  },
  useRef=v=>currentMemoryBlock in currentProve.ref?
    currentProve.ref[currentMemoryBlock++]
  :
    (currentProve.ref[currentMemoryBlock++]={current:v}),
  useState=v=>{
    let
      m=currentProve,
      a=[v,v=>{
        m.root.push(()=>{
          a[0]=v
          m.clean=0
          m.concept.sub(m.concept)(m)
        })
      }]
    return useRef(a).current
  },
  withMemory=(m,f)=>{
    let
      previousMemory=currentProve,
      previousMemoryBlock=currentMemoryBlock
    currentProve=m
    currentMemoryBlock=0
    try{
      return f()
    }finally{
      currentProve=previousMemory
      currentMemoryBlock=previousMemoryBlock
    }
  }
export{useCallback,useMemo,useRef,useState,withMemory}

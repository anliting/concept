import{arrayIs}from             '../base/main.mjs'
let
  currentProof,
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
  useRef=v=>currentMemoryBlock in currentProof._ref?
    currentProof._ref[currentMemoryBlock++]
  :
    (currentProof._ref[currentMemoryBlock++]={current:v}),
  useState=v=>{
    let
      m=currentProof,
      a=[v,v=>{
        m._root._push(()=>{
          a[0]=typeof v=='function'?v(a[0]):v
          m._clean=0
          m._concept._sub(m._concept,m)
        })
      }]
    return useRef(a).current
  },
  withMemory=(m,f)=>{
    let
      previousMemory=currentProof,
      previousMemoryBlock=currentMemoryBlock
    currentProof=m
    currentMemoryBlock=0
    try{
      return f()
    }finally{
      currentProof=previousMemory
      currentMemoryBlock=previousMemoryBlock
    }
  }
export{useCallback,useMemo,useRef,useState,withMemory}

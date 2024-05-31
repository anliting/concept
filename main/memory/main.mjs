import{arrayIs}from             '../base/main.mjs'
import{useAsyncCommit}from      '../commit/main.mjs'
let
    currentMemory,
    currentMemoryBlock,
    useCallback=(cb,dep)=>{
        let cbDepRef=useRef([cb,dep])
        if(!arrayIs(cbDepRef.current[1],dep))
            cbDepRef.current=[cb,dep]
        return cbDepRef.current[0]
    },
    useRef=v=>currentMemoryBlock in currentMemory.ref?
        currentMemory.ref[currentMemoryBlock++]
    :
        (currentMemory.ref[currentMemoryBlock++]={current:v}),
    useState=v=>{
        let
            m=currentMemory,
            a=[v,v=>{
                m.root.push(()=>{
                    a[0]=v
                    m.concept.sub(m.concept)(m)
                })
            }],
            asyncCommit=useAsyncCommit()
        return useRef(a).current
    },
    withMemory=(m,f)=>{
        let
            previousMemory=currentMemory,
            previousMemoryBlock=currentMemoryBlock
        currentMemory=m
        currentMemoryBlock=0
        try{
            return f()
        }finally{
            currentMemory=previousMemory
            currentMemoryBlock=previousMemoryBlock
        }
    }
export{useCallback,useEffect,useRef,useState,withMemory}

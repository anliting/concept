import ElementConcept from                  '../ElementConcept/main.mjs'
import{classFunction}from                   '../classFunction/main.mjs'
import{memDomFunction}from                  '../env/main.mjs'
let domMem={}
export let
  dom=new Proxy({},{get:(_,tagName)=>{
    let c=class extends ElementConcept{
      constructor(prop={},child){
        super(tagName,prop,child)
      }
    }
    return memDomFunction?
      domMem[tagName]=domMem[tagName]||classFunction(c)
    :
      classFunction(c)
  }})

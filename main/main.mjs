import FragmentConcept from                 './FragmentConcept/main.mjs'
import TextConcept from                     './TextConcept/main.mjs'
import{classFunction}from                   './classFunction/main.mjs'
export{default as Concept}from              './Concept/main.mjs'
export{Root}from                            './Root/main.mjs'
export{component}from                       './component/main.mjs'
export{useEffect}from                       './effect/main.mjs'
export{
  useCallback,useMemo,useRef,useState,
}from                                       './memory/main.mjs'
export{dom}from                             './dom/main.mjs'
export let
  $fragment=classFunction(FragmentConcept),
  $tn=(p,t)=>new TextConcept(p,t)

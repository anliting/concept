import FragmentConcept from     './FragmentConcept/main.mjs'
import TextConcept from         './TextConcept/main.mjs'
import ElementConcept from      './ElementConcept/main.mjs'
import{memDomFunction}from      './env/main.mjs'
let classFunction=A=>(...a)=>new A(...a)
let domMem={}
export let
    $fragment=classFunction(FragmentConcept),
    $tn=classFunction(TextConcept),
    Mount=class{
        constructor(mountFunction,c){
            if(c instanceof Function)
                c=(this.conceptMaker=c)()
            let makeRes=c.make(),f=new DocumentFragment
            f.append(...makeRes)
            mountFunction(f)
            this.concept=c
            this.cursor=makeRes[0]
        }
        adv(newConcept=this.conceptMaker(),oldConcept=this.concept){
            this.concept=newConcept
            this.cursor=newConcept.sub(oldConcept)(this.cursor)[0]
        }
    },
    dom=new Proxy({},{get:(_,tagName)=>
        memDomFunction?
            domMem[tagName]=domMem[tagName]||classFunction(class extends ElementConcept{
                constructor(prop={},...child){
                    super(tagName,prop,child)
                }
            })
        :
            classFunction(class extends ElementConcept{
                constructor(prop={},...child){
                    super(tagName,prop,child)
                }
            })
    })

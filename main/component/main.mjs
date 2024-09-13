import Concept from                     '../Concept/main.mjs'
import Prove from                       '../Prove/main.mjs'
import{arrayIs,objectContentIs}from     '../base/main.mjs'
import{withEffect}from                  '../effect/main.mjs'
import{withMemory}from                  '../memory/main.mjs'
let ComponentConcept=class extends Concept{
    constructor(prop,fun,child){
        super(prop)
        this.f=fun
        this.c=child
    }
    make(root){
        let prove=new Prove(root)
        prove.functionConcept=withEffect(prove.effect,()=>
            withMemory(prove,()=>this.f(this.p,...this.c))
        )
        prove.child=[prove.functionConcept.make(root)]
        prove.concept=this
        prove.effect.map(e=>e[0]=e[0]())
        prove.node=prove.child[0].node
        return prove
    }
    sub(c){
        if(!(
            c instanceof ComponentConcept&&
            this.f==c.f
        ))
            return super.sub(c)
        return prove=>{
            if(
                objectContentIs(c.p,this.p)&&
                arrayIs(c.c,this.c)&&
                prove.clean
            )
                return prove
            let oldCon=prove.functionConcept,oldEff=prove.effect,effect=[]
            let concept=withEffect(effect,()=>
                withMemory(prove,()=>this.f(this.p,...this.c))
            )
            let f=concept.sub(oldCon)
            let dif=oldEff.map((e,i)=>i).filter(i=>{
                let e=oldEff[i]
                return !(e[1]&&arrayIs(e[1],effect[i][1]))
            })
            dif.map(i=>oldEff[i][0]?.())
            prove.child[0]=f(prove.child[0])
            prove.functionConcept=concept
            dif.map(i=>{
                let e=effect[i]
                e[0]=e[0]()
            })
            prove.clean=1
            prove.concept=this
            prove.effect=effect
            prove.node=prove.child[0].node
            return prove
        }
    }
    undoEffect(prove){
        prove.effect.map(a=>a[0]?.())
        prove.effect=[]
        prove.functionConcept.undoEffect(prove.child[0])
    }
}
export let component=f=>(p,...a)=>new ComponentConcept(p,f,a)

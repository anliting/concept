import Concept from                     '../Concept/main.mjs'
import Prove from                       '../Prove/main.mjs'
import{arrayIs,objectContentIs}from     '../base/main.mjs'
import{withEffect}from                  '../effect/main.mjs'
import{withMemory}from                  '../memory/main.mjs'
let GeneratorFunction=function*(){}.constructor
let ComponentConcept=class extends Concept{
  constructor(prop,fun,child){
    super(prop)
    this.f=fun
    this.c=child
  }
  doEffect(prove){
    if(prove.ended)
      return
    super.doEffect(prove)
    prove.effect.map(e=>{
      if(e[0] instanceof GeneratorFunction){
        let a=e[0]()
        a.next()
        e[0]=a.next.bind(a)
      }else
        e[0]=e[0]()
    })
    prove.functionConcept.doEffect(prove.child[0])
  }
  make(root){
    let prove=new Prove(root)
    prove.functionConcept=withEffect(prove.effect,()=>
      withMemory(prove,()=>this.f(this.p,...this.c))
    )
    prove.child=[prove.functionConcept.make(root)]
    prove.concept=this
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
        ||
          prove.ended
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
      effect=effect.map((e,i)=>{
        if(arrayIs(e[1],oldEff[i][1]))
          return oldEff[i]
        if(e[0] instanceof GeneratorFunction){
          let a=e[0]()
          a.next()
          e[0]=a.next.bind(a)
        }else
          e[0]=e[0]()
        return e
      })
      prove.clean=1
      prove.concept=this
      prove.effect=effect
      prove.node=prove.child[0].node
      return prove
    }
  }
  undoEffect(prove){
    if(prove.ended)
      return
    prove.effect.map(a=>a[0]?.())
    prove.effect=[]
    prove.functionConcept.undoEffect(prove.child[0])
    super.undoEffect(prove)
  }
}
export let component=f=>(p,...a)=>new ComponentConcept(p,f,a)

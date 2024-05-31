import TextConcept from                 '../TextConcept/main.mjs'
import{withCommit}from                  '../commit/main.mjs'
export let Root=class{
    #afr
    #commit
    #prove
    #queue=[]
    adv(newConcept=this.concept){
        withCommit(this.#commit,()=>{
            this.#prove=newConcept.sub(this.concept)(this.#prove)
            this.concept=newConcept
        })
    }
    constructor(c){
        this.#commit={
            a:()=>{
                this.#afr=this.#afr||requestAnimationFrame(()=>{
                    this.#afr=0
                    this.adv()
                })
            },
            s:()=>this.adv(),
        }
        this.concept=new TextConcept({})
        this.#prove=this.concept.make(this)
        this.node.append(...this.#prove.node)
        c&&this.adv(c)
    }
    flush(){
        withCommit(this.#commit,()=>{
            this.#queue.map(f=>f())
        })
        this.#queue=[]
    }
    node=new DocumentFragment
    push(f){
        this.#queue.push(f)
        this.#afr=this.#afr||requestAnimationFrame(()=>{
            this.#afr=0
            this.flush()
        })
    }
    unmount(){
        this.node.append(...this.#prove.node)
    }
}

import TextConcept from                 '../TextConcept/main.mjs'
import Queue from                       '../Queue/main.mjs'
export let Root=class{
  #afr
  #prove
  #queue=new Queue
  render(newConcept=this.concept){
    this.#prove=newConcept.sub(this.concept)(this.#prove)
    this.concept=newConcept
  }
  constructor(c){
    this.concept=new TextConcept({})
    this.#prove=this.concept.make(this)
    this.node.append(...this.#prove.node)
    c&&this.render(c)
  }
  flush(){
    for(let f of this.#queue)
      f()
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

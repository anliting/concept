import FragmentConcept from             '../FragmentConcept/main.mjs'
import TextConcept from                 '../TextConcept/main.mjs'
import Queue from                       '../Queue/main.mjs'
import toConcept from                   '../toConcept/main.mjs'
export let Root=class{
  #afr
  #concept
  #proof
  #queue=new Queue
  _push(f){
    this.#queue.push(f)
    this.#afr=this.#afr||requestAnimationFrame(()=>{
      this.#afr=0
      this.flush()
    })
  }
  constructor(c){
    this.#concept=new TextConcept({})
    this.#proof=this.#concept._make(this)
    this.node.append(...this.#proof._node)
    c&&this.render(c)
  }
  flush(){
    for(let f of this.#queue)
      f()
  }
  node=new DocumentFragment
  render(newConcept=this.#concept){
    newConcept=toConcept(newConcept)
    this.#proof=newConcept._sub(this.#concept,this.#proof)
    this.#concept=newConcept
  }
  unmount(){
    this.node.append(...this.#proof._node)
  }
}

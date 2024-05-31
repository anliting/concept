export default class{
  #array=[]
  #head=0
  pop(){
    let value=this.#array[this.#head]
    this.#array[this.#head++]=undefined
    if(this.#head>64&&this.#head*2>this.#array.length){
      this.#array=this.#array.slice(this.#head)
      this.#head=0
    }
    return value
  }
  push(value){
    this.#array.push(value)
  }
  get size(){
    return this.#array.length-this.#head
  }
  [Symbol.iterator](){
    return{
      next:()=>
        this.size?{value:this.pop(),done:false}:{done:true}
    }
  }
}

import Concept from'../Concept/main.mjs'
let NodeInstanceConcept=class extends Concept{
    constructor(n){
        super()
        this.n=n
        this.p={}
    }
    getNode(n){
        return[n]
    }
    make(){
        return[this.n]
    }
    sub(c){
        if(!(
            c instanceof NodeInstanceConcept&&
            this.n==c.n
        ))
            return super.sub(c)
        return n=>[n,n]
    }
}
export default NodeInstanceConcept

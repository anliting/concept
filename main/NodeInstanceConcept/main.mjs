import Concept from'../Concept/main.mjs'
let NodeInstanceConcept=class extends Concept{
    constructor(n){
        super()
        this.n=n
        this.p={}
    }
    getNode(n){
        return n.nextSibling==this.n?[n,n.nextSibling]:[n]
    }
    make(){
        return[new Text,this.n]
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

import Concept from'../Concept/main.mjs'
import Prove from'../Prove/main.mjs'
let NodeInstanceConcept=class extends Concept{
    constructor(n){
        super({})
        this.n=n
    }
    getNode(p){
        let n=p.node[0]
        return n.nextSibling==this.n?[n,n.nextSibling]:[n]
    }
    make(root){
        return new Prove(root,[new Text,this.n])
    }
    sub(c){
        if(!(
            c instanceof NodeInstanceConcept&&
            this.n==c.n
        ))
            return super.sub(c)
        return prove=>prove
    }
}
export default NodeInstanceConcept

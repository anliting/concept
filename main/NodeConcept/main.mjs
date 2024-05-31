import Concept from'../Concept/main.mjs'
let NodeConcept=class extends Concept{
    getNode(n){
        return[n]
    }
    sub(c){
        if(!(c instanceof NodeConcept))
            return super.sub(c)
        return n=>{
            let res=this.make()
            n.parentNode.replaceChild(res[0],n)
            return[res[0],res[0]]
        }
    }
}
export default NodeConcept

export default class{
    constructor(root,node,child=[]){
        this.child=child
        this.concept=null
        this.effect=[]
        this.functionConcept=null
        this.node=node
        this.ref={}
        this.root=root
    }
}

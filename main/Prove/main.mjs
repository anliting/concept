export default class{
    constructor(root,node,child=[]){
        this.child=child
        this.clean=1
        this.concept=null
        this.effect=[]
        this.functionConcept=null
        this.node=node
        this.ref={}
        this.root=root
    }
}

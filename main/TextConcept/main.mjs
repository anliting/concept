import NodeConcept from'../NodeConcept/main.mjs'
let TextConcept=class extends NodeConcept{
    constructor(prop,wholeText){
        super()
        this.p=prop
        this.t=wholeText
    }
    make(){
        return[new Text(this.t)]
    }
    sub(c){
        if(!(c instanceof TextConcept))
            return super.sub(c)
        if(this.t==c.t)
            return n=>[n,n]
        return n=>{
            n.nodeValue=this.t
            return[n,n]
        }
    }
}
export default TextConcept

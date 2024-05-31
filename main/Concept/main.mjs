let sentinel=new Text
export default class{
    sub(c){
        return n=>{
            let
                res=this.make(),
                a=c.getNode(n),
                parentNode=n.parentNode
            parentNode.insertBefore(sentinel,n)
            let f=new DocumentFragment
            f.append(...res)
            parentNode.insertBefore(f,sentinel)
            parentNode.removeChild(sentinel)
            for(let o of new Set(a).difference(new Set(res)))
                parentNode.removeChild(o)
            return[res[0],res.at(-1)]
        }
    }
}

import{arrayStrictEqual}from    '../base/main.mjs'
import FragmentConcept from     '../FragmentConcept/main.mjs'
import NodeConcept from         '../NodeConcept/main.mjs'
let ElementConcept=class extends NodeConcept{
    constructor(tagName,prop,child){
        super()
        this.t=tagName
        this.p=prop
        this.c=child
    }
    make(){
        let a=document.createElement(this.t)
        a.appendChild(new Text)
        this.sub(new ElementConcept(this.t,{},[]))(a)
        return[a]
    }
    sub(c){
        if(!(
            c instanceof ElementConcept&&
            this.t==c.t
        ))
            return super.sub(c)
        return n=>{
            let specialProp=new Set([
                'key',
                'style','$style',
                '$textContent',
            ])
            if(!arrayStrictEqual(
                [c.p.style,c.p.$style],
                [this.p.style,this.p.$style],
            ))
                if('style'in c.p||'style'in this.p){
                    n.removeAttribute('style')
                    if('style'in this.p)
                        n.setAttribute('style',this.p.style)
                    if('$style'in this.p)
                        Object.assign(n.style,this.p.$style)
                }else
                    for(let s of
                        new Set(Object.keys(this.p.$style||{}))
                        .union(new Set(Object.keys(c.p.$style||{})))
                    )
                        if(this.p.$style&&s in this.p.$style){
                            if(c.p.$style?.[s]!=this.p.$style[s])
                                if(s.includes('-'))
                                    n.style.setProperty(s,this.p.$style[s])
                                else
                                    n.style[s]=this.p.$style[s]
                        }else
                            n.style.removeProperty(s)
            if(!arrayStrictEqual(
                [c.p.$textContent],
                [this.p.$textContent],
            ))
                n.textContent=this.p.$textContent||''
            let s=new Set(Object.keys(this.p))
                .union(new Set(Object.keys(c.p)))
                .difference(specialProp)
            for(let e of[...s].map(
                a=>a.match(/^\$?on(.*)/)
            ).filter(a=>a).map(a=>a[1])){
                if(!arrayStrictEqual(
                    [
                        c.p['on'+e],
                        c.p['$on'+e]
                    ],
                    [
                        this.p['on'+e],
                        this.p['$on'+e]
                    ],
                )){
                    n.removeAttribute('on'+e)
                    n['on'+e]=null
                    if('on'+e in this.p)
                        n.setAttribute('on'+e,this.p['on'+e])
                    if('$on'+e in this.p)
                        n['on'+e]=this.p['$on'+e]
                }
                s.delete('on'+e)
                s.delete('$on'+e)
            }
            for(let k of s)
                if(k in this.p)
                    n.setAttribute(k,this.p[k])
                else
                    n.removeAttribute(k)
            ;(new FragmentConcept({},...this.c)).sub(
                new FragmentConcept({},...c.c)
            )(n.childNodes[0])
            return[n,n]
        }
    }
}
export default ElementConcept

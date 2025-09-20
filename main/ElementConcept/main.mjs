import{arrayIs}from             '../base/main.mjs'
import FragmentConcept from     '../FragmentConcept/main.mjs'
import NodeConcept from         '../NodeConcept/main.mjs'
import Prove from               '../Prove/main.mjs'
let ElementConcept=class extends NodeConcept{
    constructor(tagName,prop,child){
        super(prop)
        this.t=tagName
        this.c=child
    }
    make(root){
        let a=document.createElement(this.t)
        a.appendChild(new Text)
        let prove=new Prove(root,[a],[new Prove(root,[a.firstChild])])
        prove=this.sub(new ElementConcept(this.t,{},[]))(prove)
        if(this.p.ref)
            this.p.ref.current=a
        return prove
    }
    sub(c){
        if(c==this)
            return p=>p
        if(!(
            c instanceof ElementConcept&&
            this.t==c.t
        ))
            return super.sub(c)
        return prove=>{
            ;(new FragmentConcept({},this.c)).sub(
                new FragmentConcept({},c.c)
            )(prove.child[0])
            let n=prove.node[0]
            let specialProp=new Set([
                'key','ref',
                'checked',
                'innerHTML',
                'style','Style',
                'value',
            ])
            if(c.p.ref)
                delete c.p.ref.current
            if(this.p.ref)
                this.p.ref.current=n
            if(!Object.is(c.p.checked,this.p.checked))
                n.checked=this.p.checked
            if(!Object.is(c.p.innerHTML,this.p.innerHTML))
                n.innerHTML=this.p.innerHTML
            if(!arrayIs(
                [c.p.style,c.p.Style],
                [this.p.style,this.p.Style],
            ))
                if('Style'in c.p||'Style'in this.p){
                    n.removeAttribute('style')
                    if('Style'in this.p)
                        n.setAttribute('style',this.p.Style)
                    if('style'in this.p)
                        Object.assign(n.style,this.p.style)
                    for(let s of Object.keys(this.p.style||{}))
                        if(s.includes('-'))
                            n.style.setProperty(s,this.p.style[s])
                        else
                            n.style[s]=this.p.style[s]
                }else
                    for(let s of
                        new Set(Object.keys(this.p.style||{}))
                        .union(new Set(Object.keys(c.p.style||{})))
                    )
                        if(this.p.style&&s in this.p.style){
                            if(c.p.style?.[s]!=this.p.style[s])
                                if(s.includes('-'))
                                    n.style.setProperty(s,this.p.style[s])
                                else
                                    n.style[s]=this.p.style[s]
                        }else
                            n.style.removeProperty(s)
            if(!Object.is(c.p.value,this.p.value))
                n.value='value'in this.p?this.p.value:''
            let s=new Set(Object.keys(this.p))
                .union(new Set(Object.keys(c.p)))
                .difference(specialProp)
            for(let e of[...s].map(
                a=>a.match(/^[Oo]n(.*)/)
            ).filter(a=>a).map(a=>a[1])){
                if(!arrayIs(
                    [
                        c.p['on'+e],
                        c.p['On'+e]
                    ],
                    [
                        this.p['on'+e],
                        this.p['On'+e]
                    ],
                )){
                    n.removeAttribute('on'+e)
                    n['on'+e]=null
                    if('on'+e in this.p)
                        n['on'+e]=this.p['on'+e]
                    if('On'+e in this.p)
                        n.setAttribute('on'+e,this.p['On'+e])
                }
                s.delete('on'+e)
                s.delete('On'+e)
            }
            for(let k of s)
                if(k in this.p)
                    n.setAttribute(k,this.p[k])
                else
                    n.removeAttribute(k)
            return prove
        }
    }
}
export default ElementConcept

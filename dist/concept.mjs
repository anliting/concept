/*© An-Li Ting (anliting.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/let e=new Text;class t{constructor(e){this.p=e}sub(t){return n=>{let s=n.node[0];t.undoEffect(n);let i=this.make(n.root),r=i.node,o=n.node,c=s.parentNode;c.insertBefore(e,s);let l=new DocumentFragment;l.append(...r),c.insertBefore(l,e),c.removeChild(e);for(let e of new Set(o).difference(new Set(r)))c.removeChild(e);return i}}undoEffect(){}}class n{constructor(e,t,n=[]){this.child=n,this.clean=1,this.concept=null,this.effect=[],this.functionConcept=null,this.node=t,this.ref={},this.root=e}}let s,i,r,o=class extends t{sub(e){return e instanceof o?e=>{let t=this.make(e.root);return e.node[0].parentNode.replaceChild(t.node[0],e.node[0]),e.child=t.child,e.node=t.node,e}:super.sub(e)}},c=class extends o{constructor(e,t){super(e),this.t=t}make(e){return new n(e,[new Text(this.t)])}sub(e){return e instanceof c?this.t==e.t?e=>e:e=>(e.node[0].nodeValue=this.t,e):super.sub(e)}},l=(e,t)=>{for(let n of e)t.parentNode.insertBefore(n,t.nextSibling),t=n},h=class extends t{constructor(e={},t){super(e),this.c=t.map((e=>"string"==typeof e?new c({},e):Symbol.iterator in e?new h({},e):e))}make(e){let t=this.c.map(((t,n)=>t.make(e)));return new n(e,[new Text,...t.flatMap((e=>e.node))],t)}sub(e){return e instanceof h?t=>{let n=t.node[0],s=[],i={};for(let[n,r]of e.c.entries()){let e=t.child[n].node;"_key"in r.p?i[r.p._key]={i:n,node:e}:s.push({i:n,node:e}),e.at(-1)}let r={};{let e=0;for(let[t,n]of this.c.entries())"_key"in n.p?n.p._key in i&&(r[t]=i[n.p._key],delete i[n.p._key]):(e in s&&(r[t]=s[e],delete s[e]),e++)}for(let r of function*(){for(let e in s)yield s[e];for(let e of Reflect.ownKeys(i))yield i[e]}()){e.c[r.i].undoEffect(t.child[r.i]);for(let e of r.node)n.parentNode.removeChild(e)}let o=[],c=n;for(let[n,s]of this.c.entries()){let i;r[n]?(c.nextSibling!=r[n].node[0]&&l(r[n].node,c),i=s.sub(e.c[r[n].i])(t.child[r[n].i])):(i=s.make(t.root),l(i.node,c)),o.push(i),c=i.node.at(-1)}return t.child=o,t.node=[n,...o.flatMap((e=>e.node))],t}:super.sub(e)}undoEffect(e){this.c.map(((t,n)=>t.undoEffect(e.child[n])))}},p=e=>(t,...n)=>new e(t,n),u=class{#e;#t;#n=[];render(e=this.concept){this.#t=e.sub(this.concept)(this.#t),this.concept=e}constructor(e){this.concept=new c({}),this.#t=this.concept.make(this),this.node.append(...this.#t.node),e&&this.render(e)}flush(){this.#n.map((e=>e())),this.#n=[]}node=new DocumentFragment;push(e){this.#n.push(e),this.#e=this.#e||requestAnimationFrame((()=>{this.#e=0,this.flush()}))}unmount(){this.node.append(...this.#t.node)}},f=(e,t)=>e.length==t.length&&e.every(((e,n)=>Object.is(e,t[n]))),d=(e,t)=>{s.push([e,t])},a=(e,t)=>{let n=s;s=e;try{return t()}finally{s=n}},y=(e,t)=>{let n=m([e,t]);return f(n.current[1],t)||(n.current=[e,t]),n.current[0]},m=e=>r in i.ref?i.ref[r++]:i.ref[r++]={current:e},b=e=>{let t=i,n=[e,e=>{t.root.push((()=>{n[0]=e,t.clean=0,t.concept.sub(t.concept)(t)}))}];return m(n).current},w=(e,t)=>{let n=i,s=r;i=e,r=0;try{return t()}finally{i=n,r=s}},k=class extends t{constructor(e,t,n){super(e),this.f=t,this.c=n}make(e){let t=new n(e);return t.functionConcept=a(t.effect,(()=>w(t,(()=>this.f(this.p,...this.c))))),t.child=[t.functionConcept.make(e)],t.concept=this,t.effect.map((e=>e[0]=e[0]())),t.node=t.child[0].node,t}sub(e){return e instanceof k&&this.f==e.f?t=>{if(((e,t)=>{let n=Reflect.ownKeys(e),s=Reflect.ownKeys(t);return n.length==s.length&&n.every((n=>n in t&&Object.is(e[n],t[n])))})(e.p,this.p)&&f(e.c,this.c)&&t.clean)return t;let n=t.functionConcept,s=t.effect,i=[],r=a(i,(()=>w(t,(()=>this.f(this.p,...this.c))))),o=r.sub(n),c=s.map(((e,t)=>t)).filter((e=>{let t=s[e];return!(t[1]&&f(t[1],i[e][1]))}));return c.map((e=>s[e][0]?.())),t.child[0]=o(t.child[0]),t.functionConcept=r,c.map((e=>{let t=i[e];t[0]=t[0]()})),t.clean=1,t.concept=this,t.effect=i,t.node=t.child[0].node,t}:super.sub(e)}undoEffect(e){e.effect.map((e=>e[0]?.())),e.effect=[],e.functionConcept.undoEffect(e.child[0])}},v=e=>(t,...n)=>new k(t,e,n),$=class extends o{constructor(e,t,n){super(t),this.t=e,this.c=n}make(e){let t=document.createElement(this.t);t.appendChild(new Text);let s=new n(e,[t],[new n(e,[t.firstChild])]);return s=this.sub(new $(this.t,{},[]))(s),this.p._ref&&(this.p._ref.current=t),s}sub(e){return e==this?e=>e:e instanceof $&&this.t==e.t?t=>{let n=t.node[0],s=new Set(["_key","_ref","style","$style","checked","value"]);if(e.p._ref&&delete e.p._ref.current,this.p._ref&&(this.p._ref.current=n),!f([e.p.style,e.p.$style],[this.p.style,this.p.$style]))if("style"in e.p||"style"in this.p)n.removeAttribute("style"),"style"in this.p&&n.setAttribute("style",this.p.style),"$style"in this.p&&Object.assign(n.style,this.p.$style);else for(let t of new Set(Object.keys(this.p.$style||{})).union(new Set(Object.keys(e.p.$style||{}))))this.p.$style&&t in this.p.$style?e.p.$style?.[t]!=this.p.$style[t]&&(t.includes("-")?n.style.setProperty(t,this.p.$style[t]):n.style[t]=this.p.$style[t]):n.style.removeProperty(t);Object.is(e.p.checked,this.p.checked)||(n.checked=this.p.checked),Object.is(e.p.value,this.p.value)||(n.value="value"in this.p?this.p.value:"");let i=new Set(Object.keys(this.p)).union(new Set(Object.keys(e.p))).difference(s);for(let t of[...i].map((e=>e.match(/^\$?on(.*)/))).filter((e=>e)).map((e=>e[1])))f([e.p["on"+t],e.p["$on"+t]],[this.p["on"+t],this.p["$on"+t]])||(n.removeAttribute("on"+t),n["on"+t]=null,"on"+t in this.p&&n.setAttribute("on"+t,this.p["on"+t]),"$on"+t in this.p&&(n["on"+t]=this.p["$on"+t])),i.delete("on"+t),i.delete("$on"+t);for(let e of i)e in this.p?n.setAttribute(e,this.p[e]):n.removeAttribute(e);return new h({},this.c).sub(new h({},e.c))(t.child[0]),t}:super.sub(e)}},x={},_=new Proxy({},{get:(e,t)=>x[t]=x[t]||p(class extends ${constructor(e={},n){super(t,e,n)}})}),C=p(h),g=(e,t)=>new c(e,t);export{C as $fragment,g as $tn,t as Concept,u as Root,v as component,_ as dom,y as useCallback,d as useEffect,m as useRef,b as useState};
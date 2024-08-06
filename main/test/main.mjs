import{$fragment,$tn,Mount,dom}from'concept'
let{a,button,div}=dom
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),$tn({},'a'))
        yield m.childNodes[0].wholeText=='a'
        mount.adv($tn({},'b'))
        yield m.childNodes[0].wholeText=='b'
    }()].every(a=>a),
    'Change text to text.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),$tn({},'a'))
        yield m.childNodes[0].wholeText=='a'
        mount.adv(div())
        yield m.childNodes[0].tagName=='DIV'
    }()].every(a=>a),
    'Change text to DIV element.',
)
console.log(
    [...function*(){
        let
            container=document.createElement('a'),
            mount=new Mount(n=>container.appendChild(n),a())
        yield container.childNodes.length==1&&
            container.childNodes[0].tagName=='A'
        mount.adv($fragment())
        yield container.childNodes.length==1&&
            container.childNodes[0]instanceof Text
    }()].every(a=>a),
    'Change A element to fragment.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),$fragment({},div()))
        yield m.childNodes.length==2&&
            m.childNodes[0]instanceof Text&&
            m.childNodes[1].tagName=='DIV'
        mount.adv(div())
        yield m.childNodes.length==1&&
            m.childNodes[0].tagName=='DIV'
    }()].every(a=>a),
    'Change fragment to DIV element.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),div())
        yield m.childNodes[0].tagName=='DIV'
        mount.adv(div({
            id:'a',
            class:'b',
            hidden:'',
        }))
        yield m.childNodes[0].tagName=='DIV'&&
            m.childNodes[0].id=='a'&&
            m.childNodes[0].className=='b'&&
            m.childNodes[0].hidden
    }()].every(a=>a),
    'Set attribute of a DIV element.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),div())
        yield m.childNodes[0].tagName=='DIV'
        mount.adv(div({
            style:'width:100px',
        }))
        yield m.childNodes[0].style.width=='100px'
    }()].every(a=>a),
    'Set style of a DIV element.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),div())
        yield m.childNodes[0].tagName=='DIV'
        mount.adv(div({
            $style:{
                width:'200px',
            }
        }))
        yield m.childNodes[0].style.width=='200px'
    }()].every(a=>a),
    'Set $style of a DIV element.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),div({},
                div(),
                button(),
            ))
        yield m.childNodes[0].tagName=='DIV'
        mount.adv(div(
            {},
            div({id:'a'}),
            button({id:'b'}),
        ))
        yield m.childNodes[0].childNodes[1].id=='a'&&
            m.childNodes[0].childNodes[2].id=='b'
    }()].every(a=>a),
    'Change child ID.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),div({},
                div(),
                button(),
                div(),
            ))
        yield m.childNodes[0].tagName=='DIV'
        mount.adv(div(
            {},
            div(),
            button(),
        ))
        yield m.childNodes[0].childNodes.length==3&&
            m.childNodes[0].childNodes[1].tagName=='DIV'&&
            m.childNodes[0].childNodes[2].tagName=='BUTTON'
    }()].every(a=>a),
    'Change large fragment to small fragment.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),$tn({},'a'),),
            oldNode=m.childNodes[0]
        mount.adv($tn({},'a'))
        yield oldNode==m.childNodes[0]
    }()].every(a=>a),
    'Text should remains the same if concept is not changed.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),div({},
                div({_key:0}),
                button({_key:1}),
            )),
            oldDiv=m.childNodes[1],
            oldButton=m.childNodes[2]
        mount.adv(div(
            {},
            button({_key:1}),
            div({_key:0}),
        ))
        yield m.childNodes[1]==oldButton&&
            m.childNodes[2]==oldDiv
    }()].every(a=>a),
    'Re-order fragment by key.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),div({},
                div({_key:0}),
                div({_key:1}),
                div({_key:2}),
            ),)
        let div1=m.firstChild.childNodes[2],div2=m.firstChild.childNodes[3]
        mount.adv(div({},
            div({_key:1}),
            div({_key:2}),
        ))
        yield m.firstChild.childNodes[1]==div1&&m.firstChild.childNodes[2]==div2
        mount.adv(div({},
            div({_key:2}),
        ))
    }()].every(a=>a),
    'Remove the first node of a fragment.',
)
console.log(
    [...function*(){
        let
            container=document.createElement('a'),
            mount=new Mount(n=>container.appendChild(n),$fragment({},
                a({_key:0}),
                a({_key:1}),
                a({_key:2}),
            ),)
        yield container.childNodes.length==4&&
            container.childNodes[1].tagName=='A'&&
            container.childNodes[2].tagName=='A'&&
            container.childNodes[3].tagName=='A'
        mount.adv($fragment({}))
        yield container.childNodes.length==1&&
            container.childNodes[0] instanceof Text
    }()].every(a=>a),
    'Change non-empty fragment to empty fragment.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),$fragment({},
                '',
            ),)
        yield m.childNodes[1]instanceof Text
    }()].every(a=>a),
    'Feature: Treat string in fragment as text.',
)
console.log(
    [...function*(){
        let
            m=document.createElement('div'),
            mount=new Mount(n=>m.appendChild(n),div({},
                [
                    div({_key:0}),
                    div({_key:1}),
                    div({_key:2}),
                ],
            ),)
        let div1=m.firstChild.childNodes[3],div2=m.firstChild.childNodes[4]
        mount.adv(div({},
            [
                div({_key:1}),
                div({_key:2}),
            ],
        ))
        yield m.firstChild.childNodes[2]==div1&&m.firstChild.childNodes[3]==div2
    }()].every(a=>a),
    'Feature: Treat non-string iterable item in fragment as fragment.',
)
console.log(
    [...function*(){
        let
            a=document.createElement('div'),
            b=new Text,
            mount=new Mount(n=>a.appendChild(n),$fragment({},
                b,
            ),)
        yield a.childNodes.length==3&&a.childNodes[2]==b
    }()].every(a=>a),
    'Feature: Treat Node in fragment as NodeInstanceConcept.',
)
console.log(
    [...function*(){
        let
            a=document.createElement('a'),
            b=document.createElement('a'),
            mount=new Mount(n=>a.appendChild(n),$fragment({},
                b
            ),)
        yield a.childNodes.length==3&&a.childNodes[2]==b
        mount.adv($fragment({},
            b
        ))
        yield a.childNodes.length==3&&a.childNodes[2]==b
    }()].every(a=>a),
    'Correctness: Change NodeInstanceConcept to itself. If it is treated as two different nodes, and it is inserted and then removed, it is likely to fail this test.',
)
console.log(
    [...function*(){
        let
            a=document.createElement('a'),
            b=document.createElement('a'),
            mount=new Mount(n=>a.appendChild(n),$fragment({},
                [b],
            ),)
        yield a.childNodes.length==4&&a.childNodes[3]==b
        mount.adv($fragment({},
            b,
        ))
        yield a.childNodes.length==3&&a.childNodes[2]==b
    }()].every(a=>a),
    'Correctness: Change Fragment of NodeInstanceConcept to NodeInstanceConcept itself.',
)
console.log(
    [...function*(){
        let
            container=document.createElement('a'),
            mount=new Mount(n=>container.appendChild(n),$fragment({},
                a({_key:'a'}),
            ),)
        yield container.childNodes.length==2&&container.childNodes[1].tagName=='A'
        mount.adv($fragment({},
            a({_key:'b'}),
        ))
        yield container.childNodes.length==2&&container.childNodes[1].tagName=='A'
    }()].every(a=>a),
    'Correctness: Special case 0.',
)
console.log(
    [...function*(){
        let
            container=document.createElement('a'),
            b=document.createElement('a'),
            mount=new Mount(n=>container.appendChild(n),$fragment({},
                a({}),
                b,
            ),)
        yield container.childNodes.length==4&&container.childNodes[3]==b
        mount.adv($fragment({},
            a({},b),
            '',
        ))
        yield container.childNodes.length==3&&
            container.childNodes[1].childNodes.length==3&&
            container.childNodes[1].childNodes[2]==b
    }()].every(a=>a),
    'Correctness: Special case 1.',
)
if(0){
    let g=function*(){
        let mount=new Mount(n=>document.body.appendChild(n),div({},
            div({_key:0}),
            div({_key:1}),
            div({_key:2}),
        ),)
        yield
        mount.adv(div({},
            div({_key:1}),
            div({_key:2}),
        ))
        yield
        mount.adv(div({},
            div({_key:2}),
        ))
    }()
    new Mount(n=>document.body.appendChild(n),
        button({
            $onclick(){
                g.next()
            },
            $textContent:'Next',
        }),
    )
}
if(0){
    let n=1000
    let a=[...Array(n)].map(()=>0)
    let m=new Mount(
        n=>document.body.appendChild(n),
        ()=>div({
                $style:{
                    display:'flex',
                    flexWrap:'wrap',
                    gap:'1px',
                },
            },
            a.map(a=>
                div({$style:{
                    width:'10px',
                    height:'10px',
                    backgroundColor:a?'#8080ff':'#808080',
                }})
            )
        ),
    )
    let start=document.timeline.currentTime,amount=0
    setInterval(()=>{
        while(document.timeline.currentTime-start>=1e3){
            console.log(amount/1e3)
            start+=1e3
            amount=0
        }
        let i=~~(n*Math.random())
        a[i]=!a[i]
        let s=performance.now()
        m.adv()
        amount+=performance.now()-s
    },1e2)
}
if(0){
    let n=1000
    let a=[...Array(n)].map(()=>0)
    let blockMount=a.map((_,i)=>
        new Mount(n=>n,()=>div({$style:{
            width:'10px',
            height:'10px',
            backgroundColor:a[i]?'#8080ff':'#808080',
        }}))
    )
    let m=new Mount(
        n=>document.body.appendChild(n),
        ()=>div({
                $style:{
                    display:'flex',
                    flexWrap:'wrap',
                    gap:'1px',
                },
            },
            blockMount.map(a=>a.cursor),
        ),
    )
    let start=document.timeline.currentTime,amount=0
    setInterval(()=>{
        while(document.timeline.currentTime-start>=1e3){
            console.log(amount/1e3)
            start+=1e3
            amount=0
        }
        let i=~~(n*Math.random())
        a[i]=!a[i]
        let s=performance.now()
        blockMount[i].adv()
        amount+=performance.now()-s
    },1e1)
}

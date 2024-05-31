import{
    $fragment,$tn,Root,dom,
    component,useEffect,useMemo,useRef,useState
}from'concept'
let{a,b,button,div,input,option,select}=dom
console.log(
    [...function*(){
        let root=new Root
        root.render($tn({},'a'))
        yield root.node.childNodes[0].wholeText=='a'
        root.render($tn({},'b'))
        yield root.node.childNodes[0].wholeText=='b'
    }()].every(a=>a),
    'Change text to text.',
)
console.log(
    [...function*(){
        let root=new Root($tn({},'a'))
        yield root.node.childNodes[0].wholeText=='a'
        root.render(div())
        yield root.node.childNodes[0].tagName=='DIV'
    }()].every(a=>a),
    'Change text to DIV element.',
)
console.log(
    [...function*(){
        let root=new Root(a())
        yield root.node.childNodes.length==1&&
            root.node.childNodes[0].tagName=='A'
        root.render($fragment())
        yield root.node.childNodes.length==1&&
            root.node.childNodes[0]instanceof Text
    }()].every(a=>a),
    'Change A element to fragment.',
)
console.log(
    [...function*(){
        let root=new Root($fragment({},div()))
        yield root.node.childNodes.length==2&&
            root.node.childNodes[0]instanceof Text&&
            root.node.childNodes[1].tagName=='DIV'
        root.render(div())
        yield root.node.childNodes.length==1&&
            root.node.childNodes[0].tagName=='DIV'
    }()].every(a=>a),
    'Change fragment to DIV element.',
)
console.log(
    [...function*(){
        let root=new Root(div())
        yield root.node.childNodes[0].tagName=='DIV'
        root.render(div({
            id:'a',
            class:'b',
            hidden:'',
        }))
        yield root.node.childNodes[0].tagName=='DIV'&&
            root.node.childNodes[0].id=='a'&&
            root.node.childNodes[0].className=='b'&&
            root.node.childNodes[0].hidden
    }()].every(a=>a),
    'Set attribute of a DIV element.',
)
console.log(
    [...function*(){
        let root=new Root(div())
        yield root.node.childNodes[0].tagName=='DIV'
        root.render(div({
            Style:'width:100px',
        }))
        yield root.node.childNodes[0].style.width=='100px'
    }()].every(a=>a),
    'Set Style of a DIV element.',
)
console.log(
    [...function*(){
        let root=new Root(div())
        yield root.node.childNodes[0].tagName=='DIV'
        root.render(div({
            style:{
                width:'200px',
            }
        }))
        yield root.node.childNodes[0].style.width=='200px'
    }()].every(a=>a),
    'Set style of a DIV element.',
)
console.log(
    [...function*(){
        let root=new Root(div({},
            div(),
            button(),
        ))
        yield root.node.childNodes[0].tagName=='DIV'
        root.render(div(
            {},
            div({id:'a'}),
            button({id:'b'}),
        ))
        yield root.node.childNodes[0].childNodes[1].id=='a'&&
            root.node.childNodes[0].childNodes[2].id=='b'
    }()].every(a=>a),
    'Change child ID.',
)
console.log(
    [...function*(){
        let root=new Root(div({},
            div(),
            button(),
            div(),
        ))
        yield root.node.childNodes[0].tagName=='DIV'
        root.render(div(
            {},
            div(),
            button(),
        ))
        yield root.node.childNodes[0].childNodes.length==3&&
            root.node.childNodes[0].childNodes[1].tagName=='DIV'&&
            root.node.childNodes[0].childNodes[2].tagName=='BUTTON'
    }()].every(a=>a),
    'Change large fragment to small fragment.',
)
console.log(
    [...function*(){
        let
            root=new Root($tn({},'a'),),
            oldNode=root.node.childNodes[0]
        root.render($tn({},'a'))
        yield oldNode==root.node.childNodes[0]
    }()].every(a=>a),
    'Text should remains the same if concept is not changed.',
)
console.log(
    [...function*(){
        let
            root=new Root(div({},
                div({key:0}),
                button({key:1}),
            )),
            oldDiv=root.node.childNodes[1],
            oldButton=root.node.childNodes[2]
        root.render(div(
            {},
            button({key:1}),
            div({key:0}),
        ))
        yield root.node.childNodes[1]==oldButton&&
            root.node.childNodes[2]==oldDiv
    }()].every(a=>a),
    'Re-order fragment by key.',
)
console.log(
    [...function*(){
        let
            root=new Root(div({},
                div({key:0}),
                div({key:1}),
                div({key:2}),
            )),
            div1=root.node.firstChild.childNodes[2],
            div2=root.node.firstChild.childNodes[3]
        root.render(div({},
            div({key:1}),
            div({key:2}),
        ))
        yield root.node.firstChild.childNodes[1]==div1&&root.node.firstChild.childNodes[2]==div2
        root.render(div({},
            div({key:2}),
        ))
    }()].every(a=>a),
    'Remove the first node of a fragment.',
)
console.log(
    [...function*(){
        let root=new Root($fragment({},
            a({key:0}),
            a({key:1}),
            a({key:2}),
        ))
        yield root.node.childNodes.length==4&&
            root.node.childNodes[1].tagName=='A'&&
            root.node.childNodes[2].tagName=='A'&&
            root.node.childNodes[3].tagName=='A'
        root.render($fragment({}))
        yield root.node.childNodes.length==1&&
            root.node.childNodes[0] instanceof Text
    }()].every(a=>a),
    'Change non-empty fragment to empty fragment.',
)
console.log(
    [...function*(){
        let root=new Root($fragment({},
            '',
        ))
        yield root.node.childNodes[1]instanceof Text
    }()].every(a=>a),
    'Feature: Treat string in fragment as text.',
)
console.log(
    [...function*(){
        let
            root=new Root(div({},
                [
                    div({key:0}),
                    div({key:1}),
                    div({key:2}),
                ],
            )),
            div1=root.node.firstChild.childNodes[3],
            div2=root.node.firstChild.childNodes[4]
        root.render(div({},
            [
                div({key:1}),
                div({key:2}),
            ],
        ))
        yield root.node.firstChild.childNodes[2]==div1&&
            root.node.firstChild.childNodes[3]==div2
    }()].every(a=>a),
    'Feature: Treat non-string iterable item in fragment as fragment.',
)
0&&console.log(
    [...function*(){
        let
            b=new Text,
            root=new Root($fragment({},
                b,
            ),)
        yield root.node.childNodes.length==3&&
            root.node.childNodes[2]==b
    }()].every(a=>a),
    'Feature: Treat Node in fragment as NodeInstanceConcept.',
)
console.log(
    [...function*(){
        let
            a=document.createElement('a'),
            root=new Root
        a.appendChild(root.node)
        root.unmount()
        yield a.childNodes.length==0
    }()].every(a=>a),
    'Feature: Root.prototype.unmount.',
)
console.log(
    [...function*(){
        let a=0
        let C=component(()=>{
            a++
            return $fragment({})
        })
        let root=new Root(C({a:1}))
        root.render(C({a:1}))
        yield a==1
    }()].every(a=>a),
    'Feature: Component is pure: If two components have the same function, property content, and children array, changing between them does nothing.',
)
console.log(
    [...function*(){
        let oldA,a
        let A=component(({m})=>{
            a=useMemo(()=>[m+1],[m])
            return $fragment({})
        })
        let root=new Root(A({m:0,t:0}))
        root.flush()
        yield a[0]==1
        oldA=a
        root.render(A({m:0,t:1}))
        root.flush()
        yield oldA==a&&a[0]==1
        root.render(A({m:1,t:2}))
        root.flush()
        yield oldA!=a&&a[0]==2
    }()].every(a=>a),
    'Feature: useMemo.',
)
console.log(
    [...function*(){
        let root=new Root
        root.render(input({value:'a'}))
        root.node.firstChild.value='b'
        root.render(input({value:'c'}))
        root.flush()
        yield root.node.firstChild.value=='c'
    }()].every(a=>a),
    'Feature: input.value.',
)
console.log(
    [...function*(){
        let root=new Root
        root.render(input({type:'checkbox',checked:false}))
        root.node.firstChild.checked=false
        root.render(input({type:'checkbox',checked:true}))
        root.flush()
        yield root.node.firstChild.checked
    }()].every(a=>a),
    'Feature: input.checked.',
)
console.log(
    [...function*(){
        let root=new Root(select({value:'b'},
          option({value:'a'}),
          option({value:'b'}),
        ))
        yield root.node.firstChild.value=='b'
    }()].every(a=>a),
    'Feature: select.value.',
)
console.log(
    [...function*(){
        let root=new Root(div({
          style:{
            '--a':'1',
          },
        }))
        yield root.node.firstChild.style.getPropertyValue('--a')=='1'
    }()].every(a=>a),
    'Feature: style[\'--a\'].',
)
0&&console.log(
    [...function*(){
        let
            b=document.createElement('a'),
            root=new Root($fragment({},
                b
            ))
        yield root.node.childNodes.length==3&&
            root.node.childNodes[2]==b
        root.render($fragment({},
            b
        ))
        yield root.node.childNodes.length==3&&
            root.node.childNodes[2]==b
    }()].every(a=>a),
    'Correctness: Change NodeInstanceConcept to itself. If it is treated as two different nodes, and it is inserted and then removed, it is likely to fail this test.',
)
0&&console.log(
    [...function*(){
        let
            b=document.createElement('a'),
            root=new Root($fragment({},
                [b],
            ),)
        yield root.node.childNodes.length==4&&
            root.node.childNodes[3]==b
        root.render($fragment({},
            b,
        ))
        yield root.node.childNodes.length==3&&
            root.node.childNodes[2]==b
    }()].every(a=>a),
    'Correctness: Change Fragment of NodeInstanceConcept to NodeInstanceConcept itself.',
)
console.log(
    [...function*(){
        let a=0
        let root=new Root(component(()=>{
            useEffect(()=>()=>a=1,[])
            return $fragment({})
        })({}))
        root.render($fragment({}))
        yield a
    }()].every(a=>a),
    'Correctness: Effects of component should be cleared when it is changed to fragment.',
)
console.log(
    [...function*(){
        let a=0
        let root=new Root($fragment({},
            component(()=>{
                useEffect(()=>()=>a=1,[])
                return $fragment({})
            })({}),
        ))
        root.render($fragment({}))
        yield!!a
    }()].every(a=>a),
    'Correctness: Effects of component should be cleared when it is removed from a fragment.',
)
console.log(
    [...function*(){
        let a=0
        let root=new Root($fragment({},
            component(()=>{
                useEffect(()=>()=>a=1,[])
                return $fragment({})
            })({}),
        ))
        root.render($tn({},''))
        yield!!a
    }()].every(a=>a),
    'Correctness: Effects of component in fragment should be cleared when the fragment is removed.',
)
console.log(
    [...function*(){
        let a=0
        let root=new Root(component(()=>{
            useEffect(()=>()=>a++,[])
            return component(()=>{
                useEffect(()=>()=>a++,[])
                return $fragment({})
            })({})
        })({}))
        root.render($fragment({}))
        yield a==2
    }()].every(a=>a),
    'Correctness: Effects of nested component should be cleared when it is changed to fragment.',
)
console.log(
    [...function*(){
        let root=new Root(div({
          Style:'',
        }))
        root.render(div({
          style:{
            '--a':'1',
          },
        }))
        yield root.node.firstChild.style.getPropertyValue('--a')=='1'
    }()].every(a=>a),
    'Correctness: Style:\'\' to style:{\'--a\':\'1\'}.',
)
console.log(
    [...function*(){
        let
            root=new Root($fragment({},
                a({key:'a'}),
            ),)
        yield root.node.childNodes.length==2&&
            root.node.childNodes[1].tagName=='A'
        root.render($fragment({},
            a({key:'b'}),
        ))
        yield root.node.childNodes.length==2&&
            root.node.childNodes[1].tagName=='A'
    }()].every(a=>a),
    'Correctness: Special case 0.',
)
0&&console.log(
    [...function*(){
        let
            b=document.createElement('a'),
            root=new Root($fragment({},
                a({}),
                b,
            ),)
        yield root.node.childNodes.length==4&&
            root.node.childNodes[3]==b
        root.render($fragment({},
            a({},b),
            '',
        ))
        yield root.node.childNodes.length==3&&
            root.node.childNodes[1].childNodes.length==3&&
            root.node.childNodes[1].childNodes[2]==b
    }()].every(a=>a),
    'Correctness: Special case 1.',
)
console.log(
    [...function*(){
        let outerSetState,outerPropA
        let cmpA=component(({propA})=>{
            let[state,setState]=useState()
            outerSetState=setState
            outerPropA=propA
            return a({})
        })
        let root=new Root(cmpA({propA:0}))
        root.render(cmpA({propA:1}))
        outerSetState()
        root.flush()
        yield outerPropA
    }()].every(a=>a),
    'Correctness: Special case 2.',
)
console.log(
    [...function*(){
        let root=new Root(component(()=>{
            let ref=useRef()
            useEffect(()=>{
                let root=new Root(div({}))
                ref.current.appendChild(root.node)
                return()=>{root.unmount()}
            },[])
            return div({ref:ref})
        })({}))
        yield root.node.firstChild.childNodes[1].tagName=='DIV'
    }()].every(a=>a),
    'Prove: Externally controlled fragment.',
)
console.log(
  [...function*(){
    let a=0,b=0
    let root=new Root(component(()=>{
      useEffect(function(){
        a=1
        return()=>{
          b=1
        }
      },[])
      return $fragment({})
    })({}))
    yield a==1&&b==0
    root.render($fragment({}))
    yield a==1&&b==1
  }()].every(a=>a),
  'Non-generator function effect works.',
)
console.log(
  [...function*(){
    let a=0,b=0
    let root=new Root(component(()=>{
      useEffect(function*(){
        a=1
        yield
        b=1
      },[])
      return $fragment({})
    })({}))
    yield a==1&&b==0
    root.render($fragment({}))
    yield a==1&&b==1
  }()].every(a=>a),
  'Generator function effect works.',
)
console.log(
  [...function*(){
    let root=new Root($tn({},''))
    let divNode=document.createElement('div')
    divNode.appendChild(root.node)
    let a
    root.render(component(()=>{
      let ref=useRef()
      useEffect(()=>{
        a=ref.current.parentNode
      },[])
      return div({ref},'')
    })({}))
    yield a==divNode
  }()].every(a=>a),
  'Effect is run after mount.',
)
console.log(
  [...function*(){
    let a
    let root=new Root(component(()=>{
      useEffect(()=>{
        a=1
      },[])
      return $tn({},'')
    })({}))
    yield a==1
  }()].every(a=>a),
  'Root effect is run.',
)
if(0){
  console.log(
    [...function*(){
      let a=0,b=0,setC,setD
      let root=new Root(component(()=>{
        let c
        ;[c,setC]=useState(0)
        let d
        ;[d,setD]=useState(0)
        useEffect(function(){
          console.log('a')
          a=1
          return()=>{
            console.log('b')
            b=1
          }
        },[c])
        return $fragment({})
      })({}))
      setD(0)
      setC(1)
    }()].every(a=>a),
    '',
  )
}
if(0){
    let n=1000
    let a=[...Array(n)].map(()=>0)
    let root=new Root(
        component(()=>div({
                style:{
                    display:'flex',
                    flexWrap:'wrap',
                    gap:'1px',
                },
            },
            a.map(a=>
                div({style:{
                    width:'10px',
                    height:'10px',
                    backgroundColor:a?'#8080ff':'#808080',
                }})
            )
        ))({}),
    )
    document.body.appendChild(root.node)
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
        root.render()
        amount+=performance.now()-s
    },1e1)
}
if(0){
    let n=1000
    let a=[...Array(n)].map(()=>0)
    let blockRoot=a.map((_,i)=>
        new Root(component(()=>div({style:{
            width:'10px',
            height:'10px',
            backgroundColor:a[i]?'#8080ff':'#808080',
        }}))({}))
    )
    let root=new Root(component(()=>div({
        style:{
            display:'flex',
            flexWrap:'wrap',
            gap:'1px',
        },
    },
        blockRoot.map(a=>a.node.firstChild),
    ))({}))
    document.body.appendChild(root.node)
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
        blockRoot[i].render()
        amount+=performance.now()-s
    },1e1)
}
if(0){
    let root=new Root($fragment({},div({id:'a'}),div({id:'b'})))
    root.render($fragment({},div({id:'b'}),div({id:'a'})))
    document.body.appendChild(root.node)
    root.unmount()
    document.body.appendChild(root.node)
}
// increasing button
if(0){
    let root=new Root(
        component(()=>{
            let[counter,setCounter]=useState(0)
            return button({
                onclick(){
                    setCounter(counter+1)
                },
            },''+counter)
        })({})
    )
    document.body.appendChild(root.node)
}
if(0){
    let{form,input}=dom
    let makeConcept=()=>form({
        style:{backgroundColor:'red'}
    },
        input({type:'text'}),
        input({type:'submit'}),
    )
    let root=new Root(makeConcept())
    document.body.appendChild(root.node)
}
// External ref.
if(0){
    let{button,input}=dom,inputRef={}
    let root=new Root(component(()=>$fragment({},
        input({ref:inputRef,type:'text'}),
        button({
            type:'submit',
            onclick:()=>{
                inputRef.current.focus()
            },
        }),
    ))({}))
    document.body.appendChild(root.node)
}
// Internal ref.
if(0){
    let{button,input}=dom
    let root=new Root(component(()=>{
        let[counter,setCounter]=useState(0)
        let inputRef=useRef()
        return $fragment({},
            input({ref:inputRef,type:'text'}),
            button({
                type:'submit',
                onclick:()=>{
                    setCounter(counter+1)
                    inputRef.current.focus()
                },
            },''+counter),
        )
    })({}))
    document.body.appendChild(root.node)
}
// useEffect
if(0){
    let root=new Root(
        component(()=>{
            let[counter,setCounter]=useState(0)
            useEffect(()=>{
                console.log(counter)
            },[counter])
            return button({
                onclick(){
                    setCounter(counter+1)
                },
            },''+counter)
        })({})
    )
    document.body.appendChild(root.node)
}
// effect should be run after sub-concept is rendered.
if(0){
    let value=0
    let root=new Root(component(()=>{
        let aRef=useRef()
        useEffect(()=>{
            value=aRef.current
        })
        return a({ref:aRef})
    })())
    console.log(!!value)
}
// partial render should use the latest concept
if(0){
    let outerSetState,outerPropA
    let cmpA=component(({propA})=>{
        let[state,setState]=useState()
        outerSetState=setState
        outerPropA=propA
        return a({})
    })
    let root=new Root(cmpA({propA:0}))
    root.render(cmpA({propA:1}))
    outerSetState()
    root.flush()
    console.log(!!outerPropA)
}
/*
  Call setter function in setter invoked effect change. If you clear the queue
  after comsuming the "snapshot" of the queue, you fall into this trap, because
  the queue might grow during comsuming.
*/
if(0){
  await new Promise(rs=>setTimeout(rs,1e3))
  let root=new Root(component(()=>{
    let[a,setA]=useState(0)
    useEffect(()=>{
      console.log(a)
      if(a<10)
        setA(a+1)
    },[a])
    return $fragment({})
  })({}))
}

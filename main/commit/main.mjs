let currentCommit
export let
    useAsyncCommit=()=>currentCommit.a,
    useCommit=()=>currentCommit.s,
    withCommit=(m,f)=>{
        let previousCommit=currentCommit
        currentCommit=m
        try{
            return f()
        }finally{
            currentCommit=previousCommit
        }
    }

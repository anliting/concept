export let LazyArray=class{}
export let RootLazyArray=class extends LazyArray{
    constructor(array){
        super()
        this.array=array
    }
    slice(){
        return this.array.slice()
    }
}
export let ChildLazyArray=class extends LazyArray{
    constructor(parent,diff){
        super()
        this.parent=parent
        this.diff=diff
    }
    slice(){
        return Object.assign(this.parent.slice(),this.diff)
    }
}

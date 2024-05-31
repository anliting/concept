import FragmentConcept from             '../FragmentConcept/main.mjs'
import TextConcept from                 '../TextConcept/main.mjs'
let toConcept=a=>{
  switch(typeof a){
    case'boolean':
    case'undefined':
      return new TextConcept({},'')
    case'bigint':
    case'number':
      return new TextConcept({},''+a)
    case'string':
      return new TextConcept({},a)
    case'object':
      if(a===null)
        return new TextConcept({},'')
      if(Symbol.iterator in a)
        return new FragmentConcept({},[...a].map(toConcept))
  }
  return a
}
export default toConcept

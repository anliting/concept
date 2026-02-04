"Concept" is a library handling declarative programming for fragment modifying in DOM.

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/anliting/concept)

# Tutorial

Let's explain this by first introducing a problem:

We want to create a form like this:

```
<form>
  <input type=text>
  <input type=submit>
</form>
```

And we want that:

- if the text input consists only numbers:
    - the form have a green background
    - the submit input is not disabled
- otherwise:
    - the form have a red background
    - the submit input is disabled

To implement this with only JavaScript and DOM API:

```
let form=document.createElement('form')
let textInput=document.createElement('input')
textInput.type='text'
textInput.oninput=()=>{
  if(/^\d*$/.test(textInput.value)){
    form.style.backgroundColor='green'
    submitInput.disabled=false
  }else{
    form.style.backgroundColor='red'
    submitInput.disabled=true
  }
}
form.appendChild(textInput)
let submitInput=document.createElement('input')
submitInput.type='submit'
form.appendChild(submitInput)
```

However, sometimes we do not think in this way. Rather than think with names like

> I want three elements: The first is a form element named 'form', and the second is an input element named 'textInput'...

, we want to express their relation implicitly, like

> I want a form. There are two input element inside. When the first input consists only...

.

So we are introducing a new concept, that is the concept of "the concept of a document fragment".

With Concept, we create a concept with concept functions, like:

```
form({},
  input({type:'text'}),
  input({type:'submit'}),
)
```

The concept can then be instantiate with the `Root` class:

```
let root=new Root
root.render(form({},
  input({type:'text'}),
  input({type:'submit'}),
))
```

A Root object would have a `node` property, for you to mount it to the document tree:

```
document.body.appendChild(root.node)
```

To change its background color from green to red, we create a similar concept with red background color, use the `render` method of `root` to "render" it to the new concept:

```
root.render(form({
  style:{backgroundColor:'red'}
},
  input({type:'text'}),
  input({type:'submit'}),
))
```

We can assign the value of the text input to a variable on every time its value changes:

```
let text
let root=new Root
root.render(form({},
  input({
    type:'text',
    oninput:e=>{text=e.target.value}
  }),
  input({type:'submit'}),
))
```

# Reference

## Fragment Concept

A fragment concept is represented as a text node of empty string and its children's content.

In a fragment concept, the concepts with keys, and those without, are aligned independently.

Strings in fragment concepts are treated as text node concepts.

Instance of `Node` in fragment concepts are treated as node instance concepts.

Non-string iterable items in fragment concepts are treated as fragment concepts.

## Hook

### useCallback

### useEffect

### useMemo

### useRef

### useState

# Design

A fragment concept is represented as a text node of empty string and its children's content. The text node is used as an anchor, to locate a gap on the document.

In a fragment concept, because we seldom do substraction between a concept without key and a concept with key, the concepts with keys, and those without, are aligned independently.

## Should root.render be synchronous or asynchronous?

我覺得最重要的問題是「各個 render 的順序應該交給 Root 管理，還是 Root 的使用者？」。

It rarely needs to be synchronous, so it should be asynchronous by default. If it needs, it is not hard to call root.flush. In the case that it is more appropriate to be synchronous by default, we can simply add a switch to flush after every call to root.render.

Isn't synchronous simpler? It is not simpler than "the user needs not care about the synchronicity".

# React

Many concept in this library are learned from React. I am grateful for that.

# To-Do

Add generator function effect to documentation.


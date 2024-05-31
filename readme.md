"Concept" is a library handling declarative programming for fragment modifying in DOM.

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

The concept can then be instantiate with the <code>make</code> method.

```
form({},
    input({type:'text'}),
    input({type:'submit'}),
).make()
```

The <code>make</code> method return an array of 3 items, the first item is a DOM node to be inserted into the document, the last two are not explain here.

```
let formNode=form({
    $style:{backgroundColor:'green'}
},
    input({type:'text'}),
    input({type:'submit'}),
).make()
```

We can then insert it into the document, like:

```
document.body.append(...formNode)
```

To change its background color from green to red, we create a similar concept with red background color, use the <code>sub</code> method to calculate its difference between the previous concept, and apply the resulting function to the <code>formNode</code>:

```
form({
    $style:{backgroundColor:'red'}
},
    input({type:'text'}),
    input({type:'submit'}),
).sub(
    form({
        $style:{backgroundColor:'green'}
    },
        input({type:'text'}),
        input({type:'submit'}),
    )
)(formNode[0])
```

# Feature

## Fragment Concept

A fragment concept is represented as a text node of empty string and its children's content.

In a fragment concept, the concepts with keys, and those without, are aligned independently.

Strings in fragment concepts are treated as text node concepts.

Instance of `Node` in fragment concepts are treated as node instance concepts.

Non-string iterable items in fragment concepts are treated as fragment concepts.

# Design

A fragment concept is represented as a text node of empty string and its children's content. The text node is used as an anchor, to locate a gap on the document.

In a fragment concept, because we seldom do substraction between a concept without key and a concept with key, the concepts with keys, and those without, are aligned independently.


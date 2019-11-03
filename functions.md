# Functions

## What is a function?
* A chunks of logic
* A small program

## Why using functions?
**Less repetitive code** - which makes easier to read and debug
**Increased reusability** - which makes easier to maintain

## How to use function in code?

>**1st** - declare the function - description of what the function should do.

>**2nd** - call or invoke the function - the logic will only run at this state.

### Function declaration

Functions have three main parts:

![function declaration](https://user-images.githubusercontent.com/3531085/35194737-10b8670a-feb0-11e7-9ab5-25a0eb4edd01.png)

### Call / Invoke a Function

When the function is declared it means the it has been loaded into memory and is ready to be used. In order to use it we need to call/invoke it.

```js
add(2, 6) // => 8
```

## Different ways of declaring a function

Functions can be declared in several different ways in JS.

### Named Functions

```js
function add(a, b) {
  return a + b
}
add(10, 8) // => 18
```
### Anonymous Functions stored in a variable
```js
const add = function(a, b) {
  return a + b
}
add(4, 5) // => 9
```
### Arrow Functions stored in a variable
```js
const add = (a, b) => {
  return a + b
}
add() // => "Hello"
```
Using a named function is generally better because named functions make debugging easier. You will find that the error will include the function name.

## Important notes

* If you don't use the return keyword at in the function it will return undefined.
```js
function add(a, b) {
  return a + b
}
add(3) // => NaN
```

* If you omit an argument when you call a function it will become undefined, which can cause unexpected results.
```js
function add(a, b) {
  return a + b
}
add(3) // => NaN
```

* We can prevent thing from happening by using default arguments:
```js
function add(a=0, b=0) {
  return a + b
}
add(10) // => 10
```

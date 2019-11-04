# Functions
Functions are one of the most essential parts of computer programing. You'll be using them a lot!

## What is a function?
* A chunks of logic
* A block of code
* A small program
* A first-class object - it means there are no restrictions on the object's use.

## Why using functions?
**It will make your code less repetitive** - therefore making it easier to read and debug,

**It also increases its reusability** - which makes your code easier for you and others to maintain.

## How to use function in code?

>**1st** - declare the function - description of what the function should do.

>**2nd** - call or invoke the function - the logic will only run at this state.

### Function declaration

Functions have three main parts:

![function declaration](https://i.imgur.com/XNBuuIC.png)

>**Does it matters what names we give parameters?** No

>**How many parameters can a function have?** As many as you would like but remember that a function should have one job and do it well! It's better to have different functions rather than functions inside functions.  

### Call / Invoke a Function

When the function is declared it means the it has been loaded into memory and is ready to be used. In order to use it we need to call/invoke it.

```js
add(2, 6) // => 8
```
>**Can we pass a function as an argument?** Yes, we call those callback functions.

>**What does callback means?** It's a piece of executable code passed as an argument to other code, and it's used when you need it to - synchronously or asynchronously.

>**What is the difference between an argument and a parameter?** A parameter is a variable in a function definition and a variable within the scope of the function. An argument is the values you pass into the function when you call it.

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

* If you **don't use the return** keyword at in the function it will return **undefined**.

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

>**Does the order of the arguments matter?** Yes! Named parameters are not native to JS. Some languages such as Python will have this functionality.

>**What does NaN mean?** Not a Number - This happens when a number we were supposed to get isn't a number. Example when trying to subtract a 'cucumber' from 10.

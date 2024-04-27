![Logo-nav](https://s3.ap-south-1.amazonaws.com/kalvi-education.github.io/front-end-web-development/Kalvium-Logo.png)

# Kalvium Lab | Create a functionality

## Task:

Your task is to create a functionality which can identify whether a number is present in the given array or not.
If it is present, then it should return the index of the array of that number, if not then return -1000000.

## Starter code

Inside `src/app.js` file -> `arrayOfNumbers` and `itemToSearch` will be already given to you.

### Progression 1:

create a global scoped constant `NEG_INF` with -1000000 value, and a function `createPop`

### Progression 2:

add 2 variables to `createPop()` : currIndex, check

1. currIndex -> assign `NEG_INF` to this variable
2. check -> assign `false` to this variable

### Progression 3:

create a function `searchForElement`.
Inside this function -> check whether the given item is present in the array or not, if it is present then assign currIndex to the index at which the item is present, and give `check` a `true` value, else, if the item is not present -> keep the value of `currIndex` as `NEG_INF` and the value for `check` as false.

### Progression 4:

In `createPop()`, return a function - which uses the updated values of `currIndex` and `check` (from `searchForElement`), in order eturn the following :

1. If the element is present in the given array -> then display -> `The item is present and is at index ${currIndex}`
2. Else, display --> `The item is not present and is at index ${currIndex}`

Happy Coding Kalvium ❤️

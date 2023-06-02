# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

For this task I've choose to start getting a hundred percent test coverage even knowing that it isn't a qualitative way to measure my tests. After that I started to change the dpk code I've choose to maintain the var names and the type of module (commonJs module instead to change it to a ES6 module) just to be easier to compare. I've made a few choices to make the code cleaner and readable:
 - Reduced the cyclomatic complexity by reducing the nested comparisons;
 - Exited the function if a empty param given right at the begin, to avoid of process information without need;
 - Using ternary operators to make the code cleaner and more readable;
 - Moved the repeated code to an aux function to make it maintainable.
 - Removed a constant that had no interaction with the rest of the code, were created just to be returned;
I also added an optional param to change the max partition keyt length if needed (I changed it in on test to make the test more readable);
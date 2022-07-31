# Hello, thank you for reviewing! 🌊🌊

### 🎉`Final Solution`🎉

I will spare you the details of my first approach, which can be found in the git branch "first-solution".
My much more elegant, secure, and robust second approach as been merged with the main branch, which in a
nutshell, functions by converting the incoming array of strings `unformattedCode` into a single string,
uses regex to identify string literals(and fragments in cases where template literals are present), splits
the string back into an array, then uses a series of loops to identify and split the remaining targeted items
(eg reserved keywords, variables) into separated items in the array, so appropriately styled JSX objects can
be inserted around each item. The rendered result is a single array called `finalCodeArray` which contains
JSX objects and strings.

### 🎁 `Bonus Feature`🎁

My bonus feature is a Dialog component, that allows you to change the inputted code! This will take
a string from the textarea and convert it to an array of strings like the initial example. For
performance I have separated this logic into to two mouse events, onMouseEnter (of the dialog footer)
the inputted code is converted to an array, and onClick the state is updated at the root of the app.

Thank you again, and I look forward to your feedback! 🌊

-Justin Weisberg

# Hello, thank you for reviewing! 🌊🌊

I had an excellent time with this coding challenge, and look forward to the review!

🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊

### 🐿🐿 `Approach in a nutshell` 🐿🐿

This assignment began in where most of my work begins, [Excalidraw](https://excalidraw.com/) where I map out a game plan.
My approach was simple, compile everything into one string retaining white spaces,
then use a series of regular expressions to locate and replace() items in the string with appropriately styled span tags

### 🎉`The Solution`🎉

The plan was to end up with an array of both strings and JSX.Elements to render, however this proved to be difficult
without being allowed to install dependencies. Not given that restraint I would have used something like [This](https://www.npmjs.com/package/react-html-parser)
My final solution was to use React's dangerouslySetInnerHTML to render the html within the string, not the most secure, but
acceptable for this application.

### 🎁 `Bonus Feature`🎁

My bonus feature is a Dialog component, that allows you to change the inputted code!! This will take
a string from the textarea and convert it to an array of strings like the initial example. I also added
some light styling, and responsiveness for my own brains sake.

Thank you again, and I look forward to your feedback! 🌊

-Justin Weisberg

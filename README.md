# Hello, thank you for reviewing! 🌊🌊

I had an excellent time with this coding challenge despite regex not behaving
the way they should. But it wouldn't be fun if everything worked
all the time am I right??

🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊

### 🐿🐿 `Approach in a nutshell` 🐿🐿

This assignment began in where most of my work begins, [Excalidraw](https://excalidraw.com/)
My approach was simple, compile everything into one string retaining white spaces,
then use a series of Regex to locate and replace() items in the string with "<span>, <strong>, <br/>"
tags.

### 🎉`The Solution`🎉

The plan was to end up with an array of both strings and JSX.Elements to render,
however this proved to be difficult without being allowed to install dependencies.
Not given that restraint I would have used something like [This](https://www.npmjs.com/package/react-html-parser)

My final solution was to use React's dangerouslySetInnerHTML to render the html within the string.

### 🎁 `Bonus Feature`🎁

My bonus feature is a Dialog Box, that allows you to change the inputted code!! This will take
a string from the textarea and convert it to an array of strings like the initial example.

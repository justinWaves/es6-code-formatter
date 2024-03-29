import { useState, useMemo } from "react";
import "./App.css";
import Dialog from "./components/Dialog";

const lines = [
  "for (let i = 1; i <= 10; i++) {",
  "    console.log(`Pass number ${i}`);",
  "}",
];

const reservedKeywordList = [
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "super",
  "switch",
  "static",
  "this",
  "throw",
  "try",
  "True",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
];

const renderFormattedCode = (unformattedCode: String[]) => {
  // First the incoming array of strings is converted to single string, retaining line breaks and spaces.
  const preserveSpacesAndLineBreaks = unformattedCode.map((line) => {
    const output = line.replace(/\s/g, "\u00a0") + "<br/>";
    return output;
  });

  const compiledCodeToString = preserveSpacesAndLineBreaks.flat().join("");

  // Then the string literals, and <br/> tags are selected with regex and a unique key is placed on either side
  //to be used by the .split()
  const codeWithInsertedKeysForSplit = compiledCodeToString
    .replace(/['"`](.*?)['"`]/g, (match) => {
      return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
    })
    .replace(/(<br\/>)/gi, (match) => {
      return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
    });

  // List of all string literals is stored a variable
  const identifiedStringLiterals: any =
    compiledCodeToString.match(/['"`](.*?)['"`]/g) ?? [];

  // String is split using keys that were inserted
  const codeArraySeparatedByStringLiterals: any =
    codeWithInsertedKeysForSplit.split("123456789!@#$%^&*");

  // Now we loop through the code array to find and cut out template literals within the string literals.
  let codeArrayWithSeparatedTemplateLiterals = [];

  for (let item of codeArraySeparatedByStringLiterals) {
    if (identifiedStringLiterals.includes(item)) {
      item = item
        .replace(/(?<=\${).*(?=})/g, (match: string) => {
          return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
        })
        .split("123456789!@#$%^&*");

      codeArrayWithSeparatedTemplateLiterals.push(item);
    } else {
      codeArrayWithSeparatedTemplateLiterals.push(item);
    }
  }

  // The below code creates a new list of string literals, and fragments of string literals
  //in cases where template literals are present within string.
  let listOfStringLiteralsAndFragments: [][] | string[] = [];

  for (let item of identifiedStringLiterals) {
    if (item.match(/(?<=\${).*(?=})/g)) {
      item = item.split(/(?<=\${).*(?=})/g);
      listOfStringLiteralsAndFragments.push(item);
    } else {
      listOfStringLiteralsAndFragments.push(item);
    }
  }

  listOfStringLiteralsAndFragments = listOfStringLiteralsAndFragments.flat();

  codeArrayWithSeparatedTemplateLiterals =
    codeArrayWithSeparatedTemplateLiterals.flat();

  // New array is created to be populated with both chunks of the code (strings)
  //and JSX elements (objects)
  let codeArrayWithStyledStringLiterals: (string | object)[] = [];

  codeArrayWithSeparatedTemplateLiterals.forEach((item, index) => {
    if (listOfStringLiteralsAndFragments.includes(item)) {
      codeArrayWithStyledStringLiterals.push(
        <span key={index} style={{ color: "green" }}>
          {item}
        </span>
      );
    } else {
      codeArrayWithStyledStringLiterals.push(item);
    }
    if (item === "<br/>") {
      codeArrayWithStyledStringLiterals.splice(
        index,
        1,
        <br key={index * 1111} />
      );
    }
  });

  // Next the array is iterated (skipping string literals and JSX objects) to identify the
  //variables which get separated in the array. They also get stored in a list for later use.
  let codeArrayWithIdentifiedVariables: (string | object)[] = [];
  let listOfIdentifiedVariables = [];

  for (let item of codeArrayWithStyledStringLiterals) {
    if (typeof item !== "string") {
      codeArrayWithIdentifiedVariables.push(item);
      continue;
    }
    if (listOfStringLiteralsAndFragments.includes(item)) {
      codeArrayWithIdentifiedVariables.push(item);
      continue;
    }
    let variablesFound = item.match(
      /(?<=let\s+|var\s+|const\s+)(.*?)(?=\s|:|=)/g
    );

    if (variablesFound !== null) listOfIdentifiedVariables.push(variablesFound);

    item = item
      .replace(/(?<=let\s+|var\s+|const\s+)(.*?)(?=\s|:|=)/g, (match) => {
        return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
      })
      .split("123456789!@#$%^&*");
    codeArrayWithIdentifiedVariables.push(item);
  }
  codeArrayWithIdentifiedVariables = codeArrayWithIdentifiedVariables.flat();

  // Now a similar loop will run through that array this time identifying and removing reserved
  //keywords from the code array. This will ensure no interference with variable search in the next step.
  const regexForKeywordSearch = new RegExp(
    "\\b(" + reservedKeywordList.join("|") + ")\\b",
    "g"
  );

  let codeArrayWithSeparatedReservedKeywords: (string | object)[] = [];

  for (let item of codeArrayWithIdentifiedVariables) {
    if (typeof item !== "string") {
      codeArrayWithSeparatedReservedKeywords.push(item);
      continue;
    }
    if (listOfStringLiteralsAndFragments.includes(item)) {
      codeArrayWithSeparatedReservedKeywords.push(item);
      continue;
    }

    item = item
      .replace(regexForKeywordSearch, (match) => {
        return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
      })
      .split("123456789!@#$%^&*");
    codeArrayWithSeparatedReservedKeywords.push(item);
  }

  codeArrayWithSeparatedReservedKeywords =
    codeArrayWithSeparatedReservedKeywords.flat();

  listOfIdentifiedVariables = listOfIdentifiedVariables.flat();

  // The code Array will now be looped to separate repeated instances of variables from the array
  const regexForVariableSearch = new RegExp(
    "\\b(" + listOfIdentifiedVariables.join("|") + ")\\b",
    "g"
  );

  let codeArrayWithAllVariablesSeparated: (string | object)[] = [];

  for (let item of codeArrayWithSeparatedReservedKeywords) {
    if (typeof item !== "string") {
      codeArrayWithAllVariablesSeparated.push(item);
      continue;
    }
    if (listOfStringLiteralsAndFragments.includes(item)) {
      codeArrayWithAllVariablesSeparated.push(item);
      continue;
    }

    item = item
      .replace(regexForVariableSearch, (match) => {
        return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
      })
      .split("123456789!@#$%^&*");
    codeArrayWithAllVariablesSeparated.push(item);
  }

  codeArrayWithAllVariablesSeparated =
    codeArrayWithAllVariablesSeparated.flat();

  // The code Array will now be looped to identify and separate numbers
  let codeArrayWithAllItemsSeparated: (string | object)[] = [];

  for (let item of codeArrayWithAllVariablesSeparated) {
    if (typeof item !== "string") {
      codeArrayWithAllItemsSeparated.push(item);
      continue;
    }
    if (listOfStringLiteralsAndFragments.includes(item)) {
      codeArrayWithAllItemsSeparated.push(item);
      continue;
    }
    if (listOfIdentifiedVariables.includes(item)) {
      codeArrayWithAllItemsSeparated.push(item);
      continue;
    }

    item = item
      .replace(/[0-9]+/g, (match) => {
        return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
      })
      .split("123456789!@#$%^&*");
    codeArrayWithAllItemsSeparated.push(item);
  }
  codeArrayWithAllItemsSeparated = codeArrayWithAllItemsSeparated.flat();

  // Finally, the separated items are identified and appropriate JSX tags are inserted into the final Array
  let finalCodeArray: (string | object)[] = [];

  const finalArrayLength = codeArrayWithAllItemsSeparated.length;
  for (let i = 0; i < finalArrayLength; i++) {
    let item = codeArrayWithAllItemsSeparated[i];

    if (typeof item !== "string") {
      finalCodeArray.push(item);
      continue;
    }
    if (listOfStringLiteralsAndFragments.includes(item)) {
      finalCodeArray.push(item);
      continue;
    }

    if (listOfIdentifiedVariables.includes(item)) {
      finalCodeArray.push(
        <span key={i * 22222} style={{ color: "blue" }}>
          {item}
        </span>
      );
      continue;
    }

    if (/\d+/.test(item) && !listOfIdentifiedVariables.includes(item)) {
      finalCodeArray.push(
        <span key={i * 10} style={{ color: "red" }}>
          {item}
        </span>
      );
      continue;
    }

    if (reservedKeywordList.includes(item)) {
      finalCodeArray.push(<strong key={i * 10000}>{item}</strong>);
    } else {
      finalCodeArray.push(item);
    }
  }
  return finalCodeArray;
};

const renderUnformattedCode = (unformattedCode: String[]) => {
  let codeWithPreservedLineBreaksAndSpaces = unformattedCode.map((line, i) => {
    const output = line.replace(/\s/g, "\u00a0") + "<br/>";
    return output;
  });

  let outputCodeArray: (string | object)[] = [];

  codeWithPreservedLineBreaksAndSpaces.forEach((item: any) => {
    item = item
      .replace(/(<br\/>)/gi, (match: string) => {
        return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
      })
      .split("123456789!@#$%^&*");
    outputCodeArray.push(item);
  });

  outputCodeArray = outputCodeArray.flat();

  outputCodeArray.forEach((item, index) => {
    if (item === "<br/>") {
      outputCodeArray.splice(index, 1, <br key={index} />);
    }
  });
  return <>{outputCodeArray}</>;
};

function App() {
  const [showFormatted, setShowFormatted] = useState(false);
  const [unformattedCode, setUnformattedCode] = useState<string[]>(lines);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formatCode = () => {
    setShowFormatted((prev) => !prev);
  };

  const openDialogOnClick = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (newFormData: string[]) => {
    setUnformattedCode(newFormData);
    setIsDialogOpen(false);
  };

  const finalRender = useMemo(() => {
    return renderFormattedCode(unformattedCode);
  }, [unformattedCode]);

  return (
    <div className="App">
      <Dialog
        isOpen={isDialogOpen}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        inputCodeState={unformattedCode}
      />
      <div className="code-wrap">
        <div className="code__container">
          <h1>Code</h1>
          {renderUnformattedCode(unformattedCode)}
        </div>
        <div className="button__container">
          <button onClick={formatCode}>
            {showFormatted ? "Remove Formatting" : "Format Code"}
          </button>
          <hr />
          <button onClick={openDialogOnClick}>Change Input Code</button>
        </div>
        <div className="code__container">
          <h1>{showFormatted ? "Formatted" : "Unformatted"}</h1>
          {showFormatted ? finalRender : renderUnformattedCode(unformattedCode)}
        </div>
      </div>
    </div>
  );
}

export default App;

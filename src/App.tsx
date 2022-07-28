import { useState, useMemo } from "react";
import "./App.css";
import Dialog from "./Dialog";

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

const lines = [
  "for (let i = 1; i <= 10; i++) {",
  "    console.log(`Pass number ${i}`);",
  "}",
];

const renderFormattedCode = (unformattedCode: String[]) => {
  //First the incoming array of strings is converted to single string, retaining line breaks and spaces.

  const preserveSpacesAndLineBreaks = unformattedCode.map((line) => {
    const output = line.replace(/\s/g, "\u00a0") + "<br/>";
    return output;
  });

  const compiledCodeToString = preserveSpacesAndLineBreaks.flat().join("");

  //Then the string literals, and <br/> tags are selected with regex and a unique key is placed on either side
  //to be used by the .split()

  const codeWithInsertedKeysForSplit = compiledCodeToString
    .replace(/['"`](.*?)['"`]/g, (match) => {
      return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
    })
    .replace(/(<br\/>)/gi, (match) => {
      return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
    });

  //List of all string literals is stored a variable

  const identifiedStringLiterals =
    compiledCodeToString.match(/['"`](.*?)['"`]/g) ?? [];

  //String is split using keys that were inserted

  const codeArraySeparatedByStringLiterals =
    codeWithInsertedKeysForSplit.split("123456789!@#$%^&*");

  //New array is created to be populated with both chunks of the code (strings)
  //and JSX elements (objects)

  let codeArrayWithStyledStringLiterals: (string | object)[] = [];

  codeArraySeparatedByStringLiterals.forEach((element, index) => {
    if (identifiedStringLiterals.includes(element)) {
      codeArrayWithStyledStringLiterals.push(
        <span key={index} style={{ color: "green" }}>
          {element}
        </span>
      );
    } else {
      codeArrayWithStyledStringLiterals.push(element);
    }
    if (element === "<br/>") {
      codeArrayWithStyledStringLiterals.splice(index, 1, <br key={index} />);
    }
  });

  const regexForKeywordSearch = new RegExp(
    "\\b(" + reservedKeywordList.join("|") + ")\\b" + "(?![^{{]*}})",
    "g"
  );

  //This does not work

  const arrayLength = codeArrayWithStyledStringLiterals.length;
  for (let i = 0; i < arrayLength; i++) {
    let str = codeArrayWithStyledStringLiterals[i] as string;
    if (identifiedStringLiterals.includes(str)) {
      continue;
    }
    if (typeof codeArrayWithStyledStringLiterals[i] === "string") {
      str = str.replace(regexForKeywordSearch, (match) => {
        return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
      });
    } else {
      continue;
    }
  }

  let arr = codeArrayWithStyledStringLiterals.filter(
    (v) => typeof v === "string"
  ) as string[];

  //Loop through the incoming array and if (is a string literal...skip)
  //search each incoming array items for numbers, reserved keywords, and variable names

  // const codeWithFormattedStringAndReservedKeywords = () => {
  //   let arr = [...codeArrayWithStyledStringLiterals];

  //   const arrayLength = arr.length;
  //   for (let i = 0; i < arrayLength; i++) {
  //
  //     let str = arr[i] as string;
  //     if (typeof str === "string") {
  //       str = str.replace(regexForKeywordSearch, (match) => {
  //         return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
  //       });
  //       // str = str.split("123456789!@#$%^&*");
  //     } else {
  //       continue;
  //     }
  //   }
  //   return arr;
  // };

  console.log(codeArrayWithStyledStringLiterals);

  // const codeWithFormattedStringAndReservedKeywords = () => {
  //   for (const item of codeArrayWithStyledStringLiterals) {
  //     if (typeof item !== "string") {
  //       continue;
  //     }
  //     if (identifiedStringLiterals.includes(item)) {
  //       continue;
  //     }

  //     item.replace(regexForKeywordSearch, (match) => {
  //       return "123456789!@#$%^&*" + match + "123456789!@#$%^&*";
  //     });

  //     item.split("123456789!@#$%^&*");
  //   }
  //   let flatArray = codeArrayWithStyledStringLiterals.flat();

  //   flatArray.forEach((e, i) => {
  //     if (reservedKeywordList.includes(e)) {
  //       codeArrayWithStyledStringLiterals.splice(i, 1, <strong>{e}</strong>);
  //     }
  //   });
  //   return flatArray;
  // };

  // const identifiedVariables = codeWithStyledStringLiterals.match(
  //   /(?<=let\s+|var\s+|const\s+)(.*?)(?==)/g
  // );

  // const variablesWithoutSpaces = identifiedVariables?.map((item) =>
  //   item.trim()
  // );

  // const regexForVariableSearch = () => {
  //   if (variablesWithoutSpaces) {
  //     return new RegExp(variablesWithoutSpaces.join("|"), "g");
  //   } else {
  //     return "";
  //   }
  // };

  // const styledVariables = codeWithStyledStringLiterals.replace(
  //   regexForVariableSearch(),
  //   (match) => {
  //     return (
  //       "<span style={{color:blue; font-weight:bold;}}>" + match + "</span>"
  //     );
  //   }
  // );

  // const styledNumbers = styleReservedKeywords.replace(/\b\d+\b/g, (match) => {
  //   return "<span style={{color:red}}>" + match + "</span>";
  // });

  // const finalFormattedCode = styledNumbers.split(/(<([^>]+)>)/gi);

  return codeArrayWithStyledStringLiterals;
};

const renderUnformattedCode = (unformattedCode: String[]) => {
  return unformattedCode.map((line, i) => {
    const codeWithSpace = line.replace(/\s/g, "\u00a0");
    return <div key={i}>{codeWithSpace}</div>;
  });
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

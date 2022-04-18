import { captureRejectionSymbol } from "events";
import React, { useState, useMemo } from "react";
import { isString } from "util";
import "./App.css";

function App() {
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
    // "import",
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

  const [showFormatted, setShowFormatted] = useState(false);
  const [unformattedCode, setUnformattedCode] = useState<string[]>(lines);
  const [formattedCode, setFormattedCode] = useState<(JSX.Element | string)[]>(
    []
  );

  const formatCode = () => {
    setShowFormatted((prev) => !prev);
  };

  const renderUnformattedCode = () => {
    return unformattedCode.map((line, i) => {
      const codeWithSpace = line.replace(/\s/g, "\u00a0");

      return <div key={i}>{codeWithSpace}</div>;
    });
  };

  const renderFormattedCode = () => {
    const preserveSpaceAndLineBreaks = unformattedCode.map((line) => {
      const codeWithSpaces = line.replace(/\s/g, "\u00a0") + "<br/>";
      return codeWithSpaces;
    });
    const inputArrayToString = preserveSpaceAndLineBreaks.flat().join("");

    const styledStringLiterals = inputArrayToString.replace(
      /(?=['"`]).*(?<=['"`])/g,
      (match) => {
        return '<span style="color:green">' + match + "</span>";
      }
    );

    const identifiedVariables = styledStringLiterals.match(
      /(?<=let\s|var\s|const\s).*(?=\s=)/g
    );

    const regexForVariableSearch = () => {
      if (identifiedVariables) {
        return new RegExp(identifiedVariables.join("|") + "(?![^{{]*}})", "gi");
      } else {
        return "";
      }
    };

    const styledVariables = styledStringLiterals.replace(
      regexForVariableSearch(),
      (match) => {
        return '<span style="color:blue">' + match + "</span>";
      }
    );

    const regexForKeywordSearch = new RegExp(
      reservedKeywordList.join("|") + "(?![^{{]*}})",
      "gi"
    );

    const styleReservedKeywords = styledVariables.replace(
      regexForKeywordSearch,
      (match) => {
        return "<strong>" + match + "</strong>";
      }
    );

    const styledNumbers = styleReservedKeywords.replace(/\b\d+\b/g, (match) => {
      return '<span style="color:red">' + match + "</span>";
    });

    console.log(styledNumbers);

    return <div dangerouslySetInnerHTML={{ __html: styledNumbers }}></div>;
  };

  return (
    <div className="App">
      <div className="code-wrap">
        <div className="code__container">
          <h1 style={{ color: "red" }}>Code</h1>
          {renderUnformattedCode()}
        </div>
        <div className="button__container">
          <button onClick={formatCode}>
            {showFormatted ? "Remove Formatting" : "Format Code"}
          </button>
        </div>
        <div className="code__container">
          <h1>{showFormatted ? "Formatted" : "Unformatted"}</h1>
          {showFormatted ? renderFormattedCode() : renderUnformattedCode()}
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useMemo } from "react";
import "./App.css";
import Dialog from "./Dialog";

const renderFormattedCode = (unformattedCode: String[]) => {
  const preserveSpacesAndLineBreaks = unformattedCode.map((line) => {
    const output = line.replace(/\s/g, "\u00a0") + "<br/>";
    return output;
  });

  const compiledCodeToString = preserveSpacesAndLineBreaks.flat().join("");

  const styledStringLiterals = compiledCodeToString.replace(
    /['"`](.*?)['"`]/g,
    (match) => {
      return "<span style={{color:green}}>" + match + "</span>";
    }
  );

  const identifiedVariables = styledStringLiterals.match(
    /(?<=let\s+|var\s+|const\s+)(.*?)(?==)/g
  );

  const variablesWithoutSpaces = identifiedVariables?.map((item) =>
    item.trim()
  );

  const regexForVariableSearch = () => {
    if (variablesWithoutSpaces) {
      return new RegExp(variablesWithoutSpaces.join("|"), "g");
    } else {
      return "";
    }
  };

  const styledVariables = styledStringLiterals.replace(
    regexForVariableSearch(),
    (match) => {
      return (
        "<span style={{color:blue; font-weight:bold;}}>" + match + "</span>"
      );
    }
  );

  const regexForKeywordSearch = new RegExp(
    "\\b(" + reservedKeywordList.join("|") + ")\\b" + "(?![^{{]*}})",
    "g"
  );

  const styleReservedKeywords = styledVariables.replace(
    regexForKeywordSearch,
    (match) => {
      return "<strong>" + match + "</strong>";
    }
  );

  const styledNumbers = styleReservedKeywords.replace(/\b\d+\b/g, (match) => {
    return "<span style={{color:red}}>" + match + "</span>";
  });

  return <div>{styledNumbers}</div>;
};

const renderUnformattedCode = (unformattedCode: String[]) => {
  return unformattedCode.map((line, i) => {
    const codeWithSpace = line.replace(/\s/g, "\u00a0");
    return <div key={i}>{codeWithSpace}</div>;
  });
};
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

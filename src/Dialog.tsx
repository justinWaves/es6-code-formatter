import { useState } from "react";
import "./Dialog.css";
interface DialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (tempFormData: string[]) => void;
  inputCodeState: string[];
}

export default function Dialog({
  isOpen,
  onCancel,
  onSubmit,
  inputCodeState,
}: DialogProps) {
  const [tempFormData, setTempFormData] = useState(inputCodeState);
  const [inputString, setInputString] = useState("");

  const handleFormSubmit = () => {
    onSubmit(tempFormData);
  };

  const handleTextChange = ({ target }: any) => {
    setInputString(target.value);
  };
  const convertStringToArray = () => {
    let stringToArray = inputString.split("\n");
    setTempFormData(stringToArray);
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className="dialog__overlay">
      <div className="dialog__container">
        <textarea
          placeholder="Input new code here"
          className="dialog__textarea"
          name="input"
          autoFocus
          value={inputString}
          onChange={handleTextChange}
        ></textarea>
        <div className="dialog__footer" onMouseEnter={convertStringToArray}>
          <button className="dialog__cancelButton" onClick={onCancel}>
            Never Mind
          </button>
          <hr /> <hr /> <hr />
          <button onClick={handleFormSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

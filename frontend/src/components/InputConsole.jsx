import "./css/input-template.css";
import { useLanguage } from "./LanguageContext";

export const InputConsole = () => {
  const { code, setCode, output, error, errorText } = useLanguage();
  return (
    <>
      <div className="codeInput">
        <div className="editor">
          <div className="input">
            <textarea
              className="codeEditor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="output-error">
            <h3>Output</h3>
            <textarea
              style={{ height: error == 1 ? "34vh" : "70vh" }}
              className="codeEditor output"
              value={output}
              readOnly={true}
            />

            {error == 1 && (
              <>
                <h3 style={{ color: "red" }}>Error</h3>
                <textarea
                  style={{ height: error == 1 ? "25vh" : "80vh", color: "red" }}
                  className="codeEditor output"
                  value={errorText}
                  readOnly={true}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

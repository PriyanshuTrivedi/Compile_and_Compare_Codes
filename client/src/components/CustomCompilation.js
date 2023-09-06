import React from "react";
import { useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";

const CustomCompilation = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("monokai");
  const [lang, setLang] = useState("cpp");

  const handleSubmit = async () => {
    const payload = {
      lang,
      code,
      input,
    };
    try {
      const res = await axios.post("http://localhost:5000/run", payload);
      console.log(res);
      if(res.data.success===true){
        setOutput(JSON.parse(res.data.result));
      }
      else{
        console.log(res.data.error);
        setOutput(JSON.parse(res.data.error));
      }
    } catch (err) {
      console.log(err.response.data.error);
      setOutput(err.response.data.error);
    }
  };

  return (
    <div className="compile">
      <br />
      <div className="compileArea">
        <div className="codeArea">
          <div className="topEditor">
            <div className="languageSelector">
              <label>Language: </label>
              <select
                name="lang"
                id="lang"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="cpp">cpp</option>
                <option value="py">python</option>
                <option value="java">java</option>
              </select>
            </div>
            <div className="themeSelector">
              <label>Theme: </label>
              <select
                name="theme"
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="monokai">monokai</option>
                <option value="tomorrow_night">tomorrow night</option>
                <option value="pastel_on_dark">pastel on dark</option>
                <option value="nord_dark">nord dark</option>
                <option value="solarized_dark">solarized dark</option>
                <option value="gruvbox_dark_hard">gruvbox dark hard</option>
                <option value="dracula">dracula</option>
                <option value="cloud9_night_low_color">
                  cloud9 night low color
                </option>
              </select>
            </div>
          </div>
          <div className="code" style={{ fontFamily: "'Times New Roman', Times, serif"}}>
            <CodeEditor
              height="500px"
              width="700px"
              language={lang}
              value={code}
              theme={theme}
              setState={setCode}
              lineNumbers={true}
          />
          </div>
          <div className="btnDiv">
            <div className="btn" onClick={handleSubmit}>
              Run Code
            </div>
          </div>
        </div>
        <div className="inputOutputArea">
          <div className="inp">
            <h3>Input</h3>
            <CodeEditor
              height="225px"
              width="390px"
              language='text'
              value={input}
              theme={theme}
              setState={setInput}
              lineNumbers={true}
            />
          </div>
          <div className="outp">
            <h3>Output</h3>
            <CodeEditor
              height="225px"
              width="390px"
              language='text'
              value={output}
              theme={theme}
              setState={setOutput}
              lineNumbers={true}
              style={{whiteSpace: "pre-line"}}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomCompilation;

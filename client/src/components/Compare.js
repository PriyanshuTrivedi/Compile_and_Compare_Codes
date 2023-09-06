import React from "react";
import { ChangeEvent,useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";

const Compare = () => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [output, setOutput] = useState("");
  const [inpType,setInpType]=useState("number");
  const [theme, setTheme] = useState("monokai");
  const [lang, setLang] = useState("cpp");
  const [tcases,setTcases]=useState();
  const [n_lowerLimit,setN_lowerLimit]=useState();
  const [n_upperLimit,setN_upperLimit]=useState();
  const [arri_lowerLimit,setArri_lowerLimit]=useState();
  const [arri_upperLimit,setArri_upperLimit]=useState();
  const [file, setFile] = useState(null);
  


  const handleSubmit = async () => {
    const payload = {
      lang,
      code1,
      code2,
      genInp:{
        inpType,
        tcases,
        inpData:{
          n_lowerLimit,
          n_upperLimit,
          arri_lowerLimit,
          arri_upperLimit
        }
      }
    };
    try {
      const res = await axios.post("http://localhost:5000/compare", payload);
      console.log(res);
      setOutput((res.data.msg));
      document.getElementById('downloadBtn').style.visibility='visible';
    } catch (err) {
      console.log(err.data);
      setOutput(err.data.err);
    }
  };


  const setInputGenerator=(e)=>{
    let currInpType=e.target.value;
    setInpType(currInpType);
    if(currInpType==="custom"){
      document.getElementById("inputArea").style.display="none";
      document.getElementById("customInputArea").style.display="block";
    }
    else{
      document.getElementById("inputArea").style.display="block";
      document.getElementById("customInputArea").style.display="none";
    }
    if(currInpType==="array"){
      document.getElementById("arriRange").style.display="block";
    }
    else{
      document.getElementById("arriRange").style.display="none";
    }
  };

  const handleFileChange=(e)=>{
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleUpload=async()=>{
    const formData = new FormData();
    formData.append('fileInput', file);
    try{
      const res=await axios.post("http://localhost:5000/upload",formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      console.log(res.data);
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="compare">
      <br />
      <div className="compareArea">
        <div className="comparecodeArea">
          <div className="comparetopEditor">
            <div className="comparelanguageGenSelector">
              <div>
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
          <div className="twoCodes">
            <CodeEditor
              height="450px"
              width="530px"
              language={lang}
              value={code1}
              theme={theme}
              setState={setCode1}
              lineNumbers={true}
            />
            <CodeEditor
              height="450px"
              width="530px"
              language={lang}
              value={code2}
              theme={theme}
              setState={setCode2}
              lineNumbers={true}
            />
          </div>
          <div className="btnDiv">
            <div className="btn" onClick={handleSubmit}>
              Run Code
            </div>
          </div>

        </div>

        <div className="generatingInputArea">
          <div className="tcasesSelector">
            <label>TestCase Generator: </label>
            <select
              name="tcasegen"
              id="tcasegen"
              value={inpType}
              onChange={setInputGenerator}
            >
              <option value="number">Single number</option>
              <option value="array">Array</option>
              <option value="permutation">Permutation</option>
              <option value="string">String</option>
              <option value="custom">Custom input</option>
            </select>
          </div>

          <div id="customInputArea">
            <div className="customInp">
                <input type="file" id="fileInput" name="fileInput" accept=".txt" onChange={handleFileChange}/> 
                <div className="uploadBtn" onClick={handleUpload}>Upload</div>
            </div>
          </div>

          <div id="inputArea">
            <div>
              <h3 id='constraints'>Constraints</h3>
            </div>
            <div className="tcasesInfo">
              <div id="testcaseNo">
                <label>TestCases: </label>
                <input type="number" placeholder="Enter a value" name="tcaseNo" id="tcaseNo" value={tcases} onChange={(e)=>setTcases(e.target.value)}/>
              </div>
              <div id="nRange">
                <input type="number" placeholder="Enter a value" name="nLowerLimit" id="nLowerLimit" value={n_lowerLimit} onChange={(e)=>setN_lowerLimit(e.target.value)}/>
                &lt;=n&lt;=
                <input type="number" placeholder="Enter a value" name="nUpperLimit" id="nUpperLimit" value={n_upperLimit} onChange={(e)=>setN_upperLimit(e.target.value)}/>
              </div>
              <div id="arriRange">
                <input type="number" placeholder="Enter a value" name="arriLowerLimit" id="arriLowerLimit" value={arri_lowerLimit} onChange={(e)=>setArri_lowerLimit(e.target.value)}/>
                &lt;=arri&lt;=
                <input type="number" placeholder="Enter a value" name="arriUpperLimit" id="arriUpperLimit" value={arri_upperLimit} onChange={(e)=>setArri_upperLimit(e.target.value)}/>
              </div>
            </div>
          </div>

          <div className="resultArea">
            <h3>Results</h3>
            <div className="outputMsg">
              <h4>Checker's Log:</h4>
              <CodeEditor
                height="120px"
                width="300px"
                language={'text'}
                value={output}
                theme={theme}
                setState={setOutput}
                lineNumbers={false}
              />
            </div>
            <div className="btnDiv" id="downloadBtn">
              <a href="http://localhost:5000/downloadTestcase">
                <div className="downloadBtn">
                  Download Testcase
                </div>
              </a>
            </div>
          </div>

          

        </div>
             
      </div>
    </div>
  );
};

export default Compare;

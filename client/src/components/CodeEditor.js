import React from 'react';
import AceEditor from 'react-ace';
// importing themes 
import 'ace-builds/src-noconflict/theme-monokai'; 
import 'ace-builds/src-noconflict/theme-tomorrow_night'; 
import 'ace-builds/src-noconflict/theme-pastel_on_dark'; 
import 'ace-builds/src-noconflict/theme-nord_dark'; 
import 'ace-builds/src-noconflict/theme-solarized_dark'; 
import 'ace-builds/src-noconflict/theme-gruvbox_dark_hard'; 
import 'ace-builds/src-noconflict/theme-dracula'; 
import 'ace-builds/src-noconflict/theme-cloud9_night_low_color'; 
// importing languages 
import 'ace-builds/src-noconflict/mode-c_cpp'; // C++ mode
import 'ace-builds/src-noconflict/mode-java'; // Java mode
import 'ace-builds/src-noconflict/mode-python'; // Python mode

function CodeEditor({ value,language,height,width,theme,setState,lineNumbers }) {

  let mode = 'text'; // Default mode

  if (language === 'cpp') {
    mode = 'c_cpp';
  } else if (language === 'java') {
    mode = 'java';
  } else if (language === 'py') {
    mode = 'python';
  }

  return (
    <AceEditor
      value={value}
      onChange={newCode => {
        setState(newCode);
      }}
      wrapEnabled={true}
      showGutter={lineNumbers}
      theme={theme}
      mode={mode}
      name="code-editor"
      editorProps={{ $blockScrolling: true }}
      showPrintMargin={false}
      height={height}
      width={width}
    />
  );
}

export default CodeEditor;
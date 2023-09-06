import React from 'react';
import CodeEditor from './CodeEditor';

function Editor() {
  return (
    <div className="App">
      <h1>Code Editor Example</h1>
      <h2>C++</h2>
      <CodeEditor language="c++" />
      <h2>Java</h2>
      <CodeEditor language="java" />
      <h2>Python</h2>
      <CodeEditor language="python" />
    </div>
  );
}

export default Editor;
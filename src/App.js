// src/App.js

import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import './App.css'; // Import the App CSS for styling

const initialCode = `// Write your code here
function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('World'));`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Simple Code Editor</h1>
      <CodeEditor initialCode={initialCode} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default App;

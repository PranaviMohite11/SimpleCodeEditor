// src/CodeEditor.js

import React, { useState, useEffect, useRef } from 'react';
import { Highlight, Prism, themes } from 'prism-react-renderer';
import './prism.css'; // Import Prism CSS for syntax highlighting

// Optional: Add additional languages to Prism
(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-css');
require('prismjs/components/prism-jsx');

const CodeEditor = ({ initialCode, isDarkMode, toggleDarkMode }) => {
  const [code, setCode] = useState(initialCode);
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (preRef.current && textareaRef.current) {
        preRef.current.scrollTop = textareaRef.current.scrollTop;
        preRef.current.scrollLeft = textareaRef.current.scrollLeft;
      }
    };

    if (textareaRef.current) {
      textareaRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current && preRef.current) {
      textareaRef.current.style.height = `${preRef.current.clientHeight}px`;
    }
  }, [code]);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div className={`code-editor ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="toolbar">
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="editor-container">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '200px', // This will be dynamically adjusted
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            border: 'none',
            outline: 'none',
            resize: 'none',
            padding: '10px',
            color: 'transparent',
            backgroundColor: 'transparent',
            caretColor: isDarkMode ? 'white' : 'black',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            overflow: 'auto',
          }}
        />
        <Highlight Prism={Prism} theme={isDarkMode ? themes.dracula : themes.github} code={code} language="javascript">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              ref={preRef}
              className={className}
              style={{
                ...style,
                margin: 0,
                position: 'relative',
                pointerEvents: 'none',
                padding: '10px',
                zIndex: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflow: 'auto',
                background: isDarkMode ? '#282a36' : '#f5f2f0',
              }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeEditor;

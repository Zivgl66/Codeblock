import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import { useLocation } from "react-router-dom";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../../Actions";

const CodeEditor = ({ socketRef, codeblock, onCodeChange }) => {
  const editorRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.querySelector(".editor-text"),
        {
          mode: { name: "javascript", json: true },
          theme: "material-darker",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          readOnly: true,
        }
      );
      editorRef.current.setValue(codeblock.code);

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);

        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            codeblockId: codeblock.id,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.JOINED, ({ clients }) => {
        if (location.state?.username !== clients[0].username) {
          editorRef.current.setOption("readOnly", false);
        }
      });

      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
  }, [socketRef.current]);

  return <textarea className="editor-text"></textarea>;
};

export default CodeEditor;

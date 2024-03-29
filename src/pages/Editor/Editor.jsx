import React, { useEffect, useRef, useState } from "react";
import "./Editor.css";
import {
  useParams,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { initSocket } from "../../socket";
import ACTIONS from "../../Actions";
import codeblocks from "../../utils/codeblocks";

const Editor = () => {
  const { codeblockId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const codeblock = codeblocks[codeblockId];
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error ", e);
        navigate("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        codeblockId: codeblock.id,
        username: location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            socketId,
            code: codeRef.current,
          });
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    setLoading(false);

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return loading ? (
    <div className="preloader">
      <div className="preloader-wrapper">
        <div className="loading">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="editor-wrapper">
      <div className="editor-title">
        <h1>
          #{codeblock.id + 1} {codeblock.name}
        </h1>
      </div>
      <div className="editor-question">
        <h3>{codeblock.question}</h3>
      </div>
      <div className="editor-code">
        <CodeEditor
          socketRef={socketRef}
          codeblock={codeblock}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default Editor;

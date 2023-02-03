import React, { useState } from "react";
import "./Lobby.css";
import { useNavigate } from "react-router-dom";
import codeblocks from "../../utils/codeblocks";
import { v4 as uuidv4 } from "uuid";

const Lobby = () => {
  const navigate = useNavigate();

  const codeblockRoom = (codeblockId) => {
    navigate(`/editor/${codeblockId}`, {
      state: {
        username: uuidv4(),
      },
    });
  };

  return (
    <div className="lobby-wrapper">
      <div className="lobby">
        <div className="lobby-title">
          <h1 className="lobby-title-logo">&lt;/&gt;</h1>
          <h1 className="lobby-title-text">Choose code block</h1>
        </div>
        <div className="lobby-codeblocks">
          {codeblocks.map((codeblock, i) => {
            return (
              <button
                className="lobby-codeblock-btn"
                onClick={() => codeblockRoom(codeblock.id)}
                key={"codeblock" + codeblock.name}
              >
                #{++i} {codeblock.name}
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

export default Lobby;

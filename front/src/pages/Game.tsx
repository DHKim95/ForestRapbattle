import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Unity, { UnityContext } from "react-unity-webgl";
import Navbar from "../components/Navbar";
import "../styles/Game.scss";
import { Container } from "@mui/material";

const unityContext = new UnityContext({
  loaderUrl: "Build/Builds.loader.js",
  dataUrl: "Build/Builds.data",
  frameworkUrl: "Build/Builds.framework.js",
  codeUrl: "Build/Builds.wasm",
});


function Game() {
  const profileId = localStorage.getItem("profileId") || "";
  const nickname = useSelector((state: any) => state.account.nickname);
  const user_id = useSelector((state: any) => state.account.userId);
  const win_point = useSelector((state: any) => state.account.win_point);
  console.log(win_point, '들어오나~~~~')
  function spawnEnemies() {
    unityContext.send("ReactController", "FromReact", `${nickname},${user_id},${profileId},${win_point}`);
  }
  useEffect(() => {
    unityContext.on("GameStart", function () {
        spawnEnemies();
      })
  }, []);
  
  return (
    <div className="game">
      <Navbar />
      <div className="mytitle">Game</div>
      {/* <button onClick={spawnEnemies}>button</button> */}
      <Container>
        <Unity
          unityContext={unityContext}
          style={{
            height: "550px",
            width: "900px",
          }}
          />
      </Container>
    </div>
  );
}

export default Game
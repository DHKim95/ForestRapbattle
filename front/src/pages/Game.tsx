import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Unity, { UnityContext } from "react-unity-webgl";
import Navbar from "../components/Navbar";
import "../styles/Game.scss";
import { Container } from "@mui/material";
import { width } from '@mui/system';
import { useNavigate } from "react-router-dom";

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
  const token = localStorage.getItem("accessToken") || "";
  const navigate = useNavigate();
  console.log(win_point, '들어오나~~~~')
  function spawnEnemies() {
    unityContext.send("ReactController", "FromReact", `${nickname},${user_id},${profileId},${win_point},${token}`);
  }
  function goToHome() {
    navigate("/")
  }
  useEffect(() => {
    unityContext.on("GameStart", function () {
        spawnEnemies();
      })
    unityContext.on("ExitUnity", function () {
        goToHome();
      })
  }, []);

  function handleOnClickFullscreen() {
    unityContext.setFullscreen(true);
  }
  return (
    <div className="game" style={{width:"85%"}}>
      {/* <button onClick={handleOnClickFullscreen}>Fullscreen</button> */}
        <Unity
          unityContext={unityContext}
        style={{
            width: "100%",
            height:"100%",
            justifySelf: "center",
            alignSelf: "center"
          }}
        />
    </div>
  );
}

export default Game
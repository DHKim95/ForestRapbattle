import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Unity, { UnityContext } from "react-unity-webgl";
import "../styles/Game.scss";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setProfileImg } from "../redux/account/actions";
import { customAxios } from "../customAxios";

const unityContext = new UnityContext({
  loaderUrl: "Build/Builds.loader.js",
  dataUrl: "Build/Builds.data",
  frameworkUrl: "Build/Builds.framework.js",
  codeUrl: "Build/Builds.wasm",
});

function Game({ setProfileImg }: Props) {
  const profileId = localStorage.getItem("profileId") || "";
  const nickname = useSelector((state: any) => state.account.nickname);
  const user_id = useSelector((state: any) => state.account.userId);
  const win_point = useSelector((state: any) => state.account.win_point);
  const token = localStorage.getItem("accessToken") || "";
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  function setNewProfile(profileId: number, userId: number) {
    const ChangeNewProfile = async () => {
      const changeRes = await customAxios({
        method: "put",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${userId}/${profileId}/editProfile`,
      });
      localStorage.setItem("profileId", changeRes.data.profile.profile_id);
      setProfileImg(changeRes.data.profile.profile_img);
    };
    ChangeNewProfile();
  }
  function spawnEnemies() {
    unityContext.send("ReactController", "FromReact", `${nickname},${user_id},${profileId},${win_point},${token}`);
  }
  function goToHome() {
    navigate("/");
  }
  useEffect(() => {
    unityContext.on("Loading", function() {
      console.log('1111111111111111111111')
      setLoading(false)
    });
    unityContext.on("GameStart", function() {
      spawnEnemies();
    });
    unityContext.on("ExitUnity", function() {
      goToHome();
    });
    unityContext.on("ChangeChar", function(charInt) {
      setNewProfile(charInt, user_id);
    });
  }, []);

  return (
    <div className="game">
      <div className="unity">
        <Unity
          unityContext={unityContext}
          className="myUnity"
        />
      </div>
      {!loading || (<div className="loading-container">
        <div className="loading" />
        <div id="loading-text">loading</div>
      </div>)}
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setProfileImg: (profileImg: string) => dispatch(setProfileImg(profileImg)),
  };
};
type Props = ReturnType<typeof mapDispatchToProps>;

export default connect(
  null,
  mapDispatchToProps
)(Game);

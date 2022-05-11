import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import "../styles/Profile.scss";
import { Container, styled, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import LoopIcon from "@mui/icons-material/Loop";
import { grey } from "@mui/material/colors";
import { customAxios } from "../customAxios";
import { useNavigate } from "react-router-dom";


function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const nickname = params["nickname"];
  const userId = Number(params["userId"]);
  const profileImg = useSelector((state: any) => state.account.profileImg);
  // const [profileImages, setProfileImages] = useState<ProfileImage[]>([{ profile_id: 0, profile_img: "" }]);  
  type Gameresult = {
    date: string;
    loser_info: any;
    loser_user_id: number;
    match_id: number;
    winner_info: any;
    winner_user_id: number;
  }
  const [gameresults, setGameresults] = useState<Gameresult[]>([
    // {
    //   date: "",
    //   loser_info: {
    //     user_id: 0,
    //     email: "",
    //     profile: {
    //       profile_id: 0,
    //       profile_img: "",
    //     },
    //   },
    //   loser_user_id: 0,
    //   match_id: 0,
    //   winner_info: {
    //     user_id: 0,
    //     email: "",
    //     profile: {
    //       profile_id: 0,
    //       profile_img: "",
    //     },
    //   },
    //   winner_user_id: 0,
    // },
  ]);
  
  function History() {
    const historyList = [];
    for (let index = 0; index < gameresults.length; index++) {
      let historyItem = gameresults[index];
      let win = (userId === historyItem.winner_user_id) ? true : false;
      console.log(win)
      historyList.push(
        <div className="history" style={win ? { border: "1px solid blue" } : {border: "1px solid red"}}>
          <div>{historyItem.date}</div>
          <div>{win ? historyItem.loser_info.nickname : historyItem.winner_info.nickname}</div>
          <img src={win ? historyItem.loser_info.profile.profile_img : historyItem.winner_info.profile.profile_img} alt="" onClick={() => {
            navigate(win ? `/profile/${historyItem.loser_info.nickname}/${historyItem.loser_user_id}` : `/profile/${historyItem.winner_info.nickname}/${historyItem.winner_user_id}`);
          }} />
          <hr />
        </div>
      )
    }
    return <div>{historyList}</div>;
  }

  useEffect(() => {
    const getGameResults = async () => {
      const gameRes = await customAxios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${userId}/profile`,
      });
      console.log(gameRes.data.match);
      setGameresults(gameRes.data.match);
    };
    getGameResults();
  }, []);

  return (
    <div className="profile">
      <Navbar color="rgb(125, 174, 136)" />
      <Container maxWidth="xl">
        <div className="title">
          <div className="myavatar">
            <Avatar sx={{ width: 100, height: 100 }} className="fdfd">
              <img src={profileImg} alt="profileImg" style={{ width: "100%" }} />
              <button className="btn">
                <LoopIcon sx={{ color: grey[900], fontSize: 30 }} />
              </button>
            </Avatar>
          </div>
          <div>
            {nickname} {userId}
          </div>
        </div>
        <hr className="horizion" />
        {/* <div>{gameresults[0]?.date}</div>
        <div>{gameresults[0]?.winner_user_id}</div>
        <div>{gameresults[0]?.loser_info.profile.profile_img}</div>
        <div>{gameresults[0]?.winner_info.profile.profile_id}</div> */}
        <History></History>
      </Container>
    </div>
  );
}

export default Profile
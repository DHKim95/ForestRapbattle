import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import "../styles/Profile.scss";
import { Container, styled, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import LoopIcon from "@mui/icons-material/Loop";
import { grey } from "@mui/material/colors";
import { customAxios } from "../customAxios";

function Profile() {
  const params = useParams();
  const nickname = params["nickname"];
  const profileImg = useSelector((state: any) => state.account.profileImg);
  const userId = useSelector((state: any) => state.account.userId);
  // const [profileImages, setProfileImages] = useState<ProfileImage[]>([{ profile_id: 0, profile_img: "" }]);
  const [gameresults, setGameresults] = useState<[]>([]);

  useEffect(() => {
    const getGameResults = async () => {
      const gameRes = await customAxios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${userId}/profile`,
      });
      console.log(gameRes.data);
      setGameresults(gameRes.data);
    };
    getGameResults();
  }, []);

  return (
    <div className="profile">
      <Navbar />
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
          <div>{nickname} {userId}</div>
        </div>
        <hr className='horizion' />
      </Container>
    </div>
  );
}

export default Profile
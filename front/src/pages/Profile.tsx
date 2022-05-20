import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import "../styles/Profile.scss";
import { Container, Avatar, Modal, Typography, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { customAxios } from "../customAxios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setProfileImg } from "../redux/account/actions";
import Footer from '../components/Footer'
import settings from "../assets/settings.png"

interface svgProps {
  color ?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  tier?: string;
}

function Versus({color = '#cdcdcd', width = 20, height = 25, className=""}: svgProps) {
  return (
    <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 71 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
      <path d="M57.6875 2.3125H13.3125C7.18542 2.3125 2.21875 7.48903 2.21875 13.875V60.125C2.21875 66.511 7.18542 71.6875 13.3125 71.6875H57.6875C63.8146 71.6875 68.7812 66.511 68.7812 60.125V13.875C68.7812 7.48903 63.8146 2.3125 57.6875 2.3125ZM25.7708 51.297H20.3604L11.0938 22.8012H17.2108L23.1604 44.4347L29.1644 22.8012H35.1139L25.7708 51.297ZM57.003 49.4528C55.0683 51.1722 52.3337 52.0312 48.7992 52.0312C45.1915 52.0312 42.3548 51.1849 40.2881 49.491C38.2213 47.7948 37.1874 45.4661 37.1874 42.5014H42.6544C42.8296 43.8022 43.1791 44.7758 43.6961 45.4198C44.6446 46.5946 46.272 47.1785 48.5751 47.1785C49.9529 47.1785 51.0734 47.0235 51.9354 46.7148C53.5673 46.1228 54.3838 45.0209 54.3838 43.4091C54.3838 42.4691 53.9833 41.7406 53.1834 41.2249C52.3836 40.7208 51.1145 40.2768 49.3783 39.8906L46.4118 39.2154C43.4953 38.5436 41.4928 37.8152 40.4012 37.0289C38.5552 35.7154 37.6322 33.6584 37.6322 30.8615C37.6322 28.3096 38.5341 26.1902 40.3402 24.5009C42.1474 22.8128 44.801 21.9688 48.3033 21.9688C51.2265 21.9688 53.7204 22.7642 55.7827 24.3564C57.8473 25.9474 58.9289 28.2588 59.031 31.287H53.5273C53.4253 29.5734 52.6887 28.3547 51.3153 27.6332C50.4011 27.1568 49.2629 26.9163 47.905 26.9163C46.393 26.9163 45.186 27.2274 44.2818 27.846C43.3799 28.4646 42.9295 29.3294 42.9295 30.436C42.9295 31.4546 43.3732 32.2154 44.2641 32.7196C44.8365 33.0537 46.049 33.4468 47.9039 33.8978L52.7142 35.0783C54.8198 35.594 56.4017 36.2831 57.4523 37.1468C59.0897 38.4858 59.9062 40.4248 59.9062 42.9651C59.9062 45.569 58.94 47.73 57.003 49.4528Z"
        fill={color}/>
  </svg >
  );
}
function Tier({color = '#cdcdcd', width = 20, height = 25, className="", tier="iron"}: svgProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 40 40" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M34.8386 13.3933C35.8231 11.9829 36.4562 10.1509 36.5573 8.24072L36.5852 7.71429H36.058H32.8527H32.3515L32.3527 8.21547C32.3571 10.0978 32.3571 12.2302 32.3571 14.2304V14.7304H32.8571C33.281 14.7304 33.677 14.5259 33.9908 14.2893C34.3141 14.0455 34.6082 13.7242 34.8386 13.3933ZM34.8386 13.3933L34.4286 13.1071L34.839 13.3927C34.8388 13.3929 34.8387 13.3931 34.8386 13.3933ZM32.3482 4.28571V4.78571H32.8482H39.5V7.67857C39.5 10.4403 38.6795 13.0845 37.2058 15.1182L37.2058 15.1183C36.0911 16.657 34.3286 17.7379 32.7316 18.2586L32.4492 18.3506L32.395 18.6426C31.9307 21.1428 30.6769 23.5158 28.1037 25.4629L28.1036 25.4629C26.192 26.9098 23.8982 27.9656 21.861 28.3956L21.4643 28.4793V28.8848V36.0714V36.5714H21.9643H28.0714V39.5H11.9286V36.5714H18.0357H18.5357V36.0714V28.8848V28.4792L18.1388 28.3956C16.1018 27.9665 13.8072 26.9099 11.8965 25.463L11.8964 25.4629C9.32399 23.5158 8.06933 21.1427 7.60499 18.6426L7.55075 18.3506L7.26838 18.2586C5.67136 17.7379 3.90894 16.657 2.7942 15.1183L2.79417 15.1182C1.32054 13.0845 0.5 10.4403 0.5 7.67857V4.78571H7.14286H7.64286V4.28571V0.5H32.3482V4.28571ZM3.94286 7.71429H3.41594L3.44354 8.24048C3.54337 10.1438 4.14846 12.0009 5.16674 13.4008C5.42366 13.7549 5.78158 14.0489 6.10642 14.2633C6.4283 14.4759 6.76339 14.6402 7.00389 14.7098L7.64286 14.8946V14.2295V8.21429V7.71429H7.14286H3.94286Z"
        fill={color}
        stroke="black"
      />
      <path d="M20 2L22.4697 9.25532H30.4616L23.996 13.7394L26.4656 20.9947L20 16.5106L13.5344 20.9947L16.004 13.7394L9.53838 9.25532H17.5303L20 2Z" fill={tier==="Diamond" ? "#FFE600": "none"} />
    </svg>
  );
}

function scoreToTier(win_point:number) {
  if (win_point<700) {
   return { tier: "Iron", color: "#777777" };
  } else if (win_point >= 700 && win_point < 900) {
    return { tier: "Bronze", color: "#784100" };
  }
  else if (win_point >= 900 && win_point < 1100) {
    return { tier: "Silver", color: "#CAC8D3" };
  }
  else if (win_point >= 1100 && win_point < 1300) {
    return { tier: "Gold", color: "#F1B457" };
  }
  else if (win_point >= 1300 && win_point < 1600) {
    return { tier: "Platinum", color: "#83E2D1" };
  }
  else if (win_point >= 1600) {
    return { tier: "Diamond", color: "#A07DE9" };
  }
}

function humanize(date: string) {

  let ReplynewTime = Number(new Date(date));
  var ReplynowTime = Number(new Date());
  const milliSeconds = ReplynowTime - ReplynewTime;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `몇 초전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}

function Profile({ setProfileImg }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const userId = Number(params["userId"]);
  const myUserId = useSelector((state: any) => state.account.userId);
  const [nickname, setNickname] = useState<string>("");
  const [myProfileImage, setMyProfileImage] = useState<string>("");
  const [winpoint, setWinpoint] = useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  type Gameresult = {
    date: string;
    loser_info: any;
    loser_user_id: number;
    match_id: number;
    winner_info: any;
    winner_user_id: number;
  };
  const [gameresults, setGameresults] = useState<Gameresult[]>([]);

  function History() {
    const historyList = [];
    for (let index = 0; index < gameresults.length; index++) {
      let historyItem = gameresults[index];
      let win = userId === historyItem.winner_user_id ? true : false;
      const tier = scoreToTier(win ? historyItem.loser_info.win_point : historyItem.winner_info.win_point)
      historyList.push(
        <div className="historyItem" style={win ? { backgroundColor: "#CFCEF1" } : { backgroundColor: "#EBCCCC" }} key={historyItem.match_id}>
          <div className={win ? "resultW" : "resultL"}>
          </div>
          <span className="Win">{win ? "승" : "패"}</span>
          {/* <div className="resultW"></div> */}
          <div className="three">
            <Versus color={win ? "#5A4BB9" : "#B94B4B"} width="75px" height="75px" className="versus"/>
            <img
              className="profileImg"
              src={win ? historyItem.loser_info.profile.profile_img : historyItem.winner_info.profile.profile_img}
              alt=""
              onClick={() => {
                navigate(win ? `/profile/${historyItem.loser_user_id}` : `/profile/${historyItem.winner_user_id}`);
              }}
            />
            <div className="info">
              <div className="infoNickname cookie"
                onClick={() => {
                  navigate(win ? `/profile/${historyItem.loser_user_id}` : `/profile/${historyItem.winner_user_id}`);
                }} 
              >{win ? historyItem.loser_info.nickname : historyItem.winner_info.nickname}</div>
              <div className="infoTier">
                <Tier color={tier?.color} width="30px" height="30px" className="tier" tier={tier?.tier}/>
                <div className="infoPoint">{tier?.tier} {win ? historyItem.loser_info.win_point : historyItem.winner_info.win_point} points</div>
              </div>
            </div>
          </div>
          <div className="one">
            {/* <div className="result"> {win ? "Win" : "Lose"}</div> */}
            <div className="date">{humanize(historyItem.date)}</div>
          </div>
        </div>
      );
    }
    return <div className="history">{historyList}</div>;
  }
  type ProfileImage = {
    profile_id: number;
    profile_img: string;
  };
  const [profileImages, setProfileImages] = useState<ProfileImage[]>([{ profile_id: 0, profile_img: "" }]);
  const originId = localStorage.getItem("profileId");
  const [selectedImage, setSelectedImage] = useState<ProfileImage>({ profile_id: Number(originId), profile_img: myProfileImage });
  function ProfileSelector() {
    function Selected(ccc: number, ddd: string): void {
      setSelectedImage({ profile_id: ccc, profile_img: ddd });
    }
    const aaa = [];
    for (let index = 0; index < profileImages.length; index++) {
      let bbb = profileImages[index];
      aaa.push(
        <div className="profileItem">
          <Avatar key={bbb.profile_id} className={bbb.profile_id === selectedImage.profile_id ? "selectedMyavatar" : "myavatar"}>
            <img
              className="profileImage"
              src={bbb.profile_img}
              alt="profile"
              onClick={(event) => {
                Selected(bbb.profile_id, bbb.profile_img);
              }}
            />
          </Avatar>
        </div>
      );
    }
    return <div className="profileContainer">{aaa}</div>;
  }
  function setNewProfile(profileImg: string, profileId: number) {
    const ChangeNewProfile = async () => {
      const changeRes = await customAxios({
        method: "put",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${userId}/${profileId}/editProfile`,
      });
      localStorage.setItem("profileId", changeRes.data.profile.profile_id);
    };
    ChangeNewProfile();
    setProfileImg(profileImg);
    setMyProfileImage(profileImg);
    handleClose();
  }
  useEffect(() => {
    const getGameResults = async () => {
      const gameRes = await customAxios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${userId}/profile`,
      });
      console.log(gameRes.data, '3333');
      setMyProfileImage(gameRes.data.user.profile.profile_img)
      setWinpoint(gameRes.data.user.win_point)
      setGameresults(gameRes.data.match);
      setNickname(gameRes.data.user.nickname);
    };
    getGameResults();
    const getProfileImage = async () => {
      const profileRes = await customAxios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/profileImages`,
      });
      setProfileImages(profileRes.data);
    };
    getProfileImage();
  }, [userId]);

  return (
    <div className="profile">
      <Navbar color="rgb(125, 174, 136)" />
      <Container maxWidth="xl">
        <div className="title">
          <div className="myavatar">
            <Avatar sx={{ width: 200, height: 200, border: `8px solid ${scoreToTier(winpoint)?.color}` }} className="fdfd" onClick={handleOpen}>
              <img src={myProfileImage} alt="profileImg" style={{ width: "100%" }} />
              {userId !== myUserId || (
                <button className="btn">
                  {/* <ColorizeIcon sx={{ color: grey[900], fontSize: 100 }} /> */}
                  <img src={settings} alt="setting" />
                </button>
              )}
            </Avatar>
          </div>
          <div className="userInfo">
            <div className="cookie">
              {nickname}
            </div>
            <div className="winPoint">
              <Tier width="60px" height="60px" color={scoreToTier(winpoint)?.color} tier={scoreToTier(winpoint)?.tier} className="myTier"></Tier>
              <div>
                <span>{scoreToTier(winpoint)?.tier}</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="horizion" />
        <Container maxWidth="md">
          <History />
        </Container>
      </Container>
      <Container>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" className="profileChange">
          <Box sx={style} className="myModal">
            <Typography id="modal-modal-title" className="modaltitle" variant="h6" component="h2">
              프로필 변경
            </Typography>
            <ProfileSelector />
            <div className="mybtn">
              <Button onClick={handleClose} variant="contained" color="error">뒤로가기</Button>
              <Button onClick={() => setNewProfile(selectedImage.profile_img, selectedImage.profile_id)} variant="contained" color="primary">변경하기</Button>
            </div>
          </Box>
        </Modal>
      </Container>
      <Footer bgcolor="#7DAE88" fontcolor="black"/>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setProfileImg: (profileImg: string) => dispatch(setProfileImg(profileImg)),
  };
};
type Props = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(Profile);

// export default Profile;
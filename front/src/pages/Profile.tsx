import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import "../styles/Profile.scss";
import { Container, styled, Avatar, Modal, Typography, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import LoopIcon from "@mui/icons-material/Loop";
import { grey } from "@mui/material/colors";
import { customAxios } from "../customAxios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setProfileImg } from "../redux/account/actions";

function Profile({ setProfileImg }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  // const nickname = params["nickname"];
  const userId = Number(params["userId"]);
  const profileImg = useSelector((state: any) => state.account.profileImg);
  const myUserId = useSelector((state: any) => state.account.userId);
  const [nickname, setNickname] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "50%",
    width: "400",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // const [profileImages, setProfileImages] = useState<ProfileImage[]>([{ profile_id: 0, profile_img: "" }]);
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
      historyList.push(
        <div className="history" style={win ? { border: "1px solid blue" } : { border: "1px solid red" }} key={historyItem.match_id}>
          <div>{historyItem.date}</div>
          <div>{win ? historyItem.loser_info.nickname : historyItem.winner_info.nickname}</div>
          <img
            src={win ? historyItem.loser_info.profile.profile_img : historyItem.winner_info.profile.profile_img}
            alt=""
            onClick={() => {
              navigate(win ? `/profile/${historyItem.loser_user_id}` : `/profile/${historyItem.winner_user_id}`);
            }}
          />
          <hr />
        </div>
      );
    }
    return <div>{historyList}</div>;
  }
  type ProfileImage = {
    profile_id: number;
    profile_img: string;
  };
  const [profileImages, setProfileImages] = useState<ProfileImage[]>([{ profile_id: 0, profile_img: "" }]);
  const originId = localStorage.getItem("profileId");
  const [selectedImage, setSelectedImage] = useState<ProfileImage>({ profile_id: Number(originId), profile_img: profileImg });
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
      console.log("2222222222");
      const changeRes = await customAxios({
        method: "put",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${userId}/${profileId}/editProfile`,
      });
      console.log(changeRes.data, "오나요 ?");
      localStorage.setItem("profileId", changeRes.data.profile.profile_id);
    };
    ChangeNewProfile();
    setProfileImg(profileImg);
    handleClose();
  }
  useEffect(() => {
    const getGameResults = async () => {
      const gameRes = await customAxios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${userId}/profile`,
      });
      console.log(gameRes.data);
      setGameresults(gameRes.data.match);
      setNickname(gameRes.data.user.nickname);
    };
    getGameResults();
    const getProfileImage = async () => {
      const profileRes = await customAxios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/profileImages`,
      });
      console.log(profileRes.data);
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
            <Avatar sx={{ width: 100, height: 100 }} className="fdfd">
              <img src={profileImg} alt="profileImg" style={{ width: "100%" }} />
              { userId !== myUserId || (
                <button className="btn" onClick={handleOpen}>
                  <LoopIcon sx={{ color: grey[900], fontSize: 30 }} />
                </button>
              )}
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
        <History />
      </Container>
      <Container>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" className="profileChange">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              프로필 변경
            </Typography>
            <ProfileSelector />
            <Button onClick={() => setNewProfile(selectedImage.profile_img, selectedImage.profile_id)}>확인</Button>
          </Box>
        </Modal>
      </Container>
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
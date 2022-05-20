import { useEffect, useState } from "react";
import axios from "axios";
import TextFieldWithButton from "./TextFieldWithButton";
import { Button, Container, TextField, Typography, Avatar} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { SignupUserInfo } from "../../types/account";
import { customAxios} from "../../customAxios";
import { errorControl, loadingControl } from "../../redux/baseInfo/actions";
import { connect } from "react-redux";
import { userLogin } from "../../redux/account/actions";
import { LoginUserInfo } from "../../types/account";
import { AccountReducer } from "../../redux/rootReducer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../styles/Signup.scss"



function SignupForm({ errorControl, loadingControl,userLogin, isLogin }: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);
  // 유저정보 기본값
  const initUserInfo: SignupUserInfo = {
    username: "",
    password: "",
    passwordConfirmation: "",
    nickname: "",
    agreement: false,
    profileId: 1,
  };

  // 유저정보 state
  const [userInfo, setUserInfo] = useState<SignupUserInfo>(initUserInfo);

  // 인증관련 state
  const [nicknameConfirmation, setNicknameConfirmation] = useState<boolean>(false);
  const [emailConfirmation, setEmailConfirmation] = useState<boolean>(false);
  const [sendCheckNickname, setSendCheckNickname] = useState<boolean>(false);
  const [sendCheckEmail, setSendCheckEmail] = useState<boolean>(false);

  // 유효성 검사 처리
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [nickNameMessage, setNickNameMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>("");

  // profile 페이지
  const [page, setPage] = useState<number>(1);

  // 프로필 이미지
  type ProfileImage = {
    profile_id: number;
    profile_img: string;
  };
  const [profileImages, setProfileImages] = useState<ProfileImage[]>([{ profile_id: 0, profile_img: "" }]);
  function ProfileSelector() {
    function Selected(ccc: number): void {
      const newUserInfo: SignupUserInfo = { ...userInfo };
      newUserInfo["profileId"] = ccc;
      setUserInfo(() => newUserInfo);
    }
    const aaa = [];
    for (let index = 0; index < profileImages.length; index++) {
      let bbb = profileImages[index];
      aaa.push(
        <div className="profileItem">
          <Avatar key={bbb.profile_id} className={bbb.profile_id === userInfo.profileId ? "selectedMyavatar" : "myavatar"}>
            <img
              className="profileImage"
              src={bbb.profile_img}
              alt="profile"
              onClick={(event) => {
                Selected(bbb.profile_id);
              }}
            />
          </Avatar>
        </div>
      );
    }
    return <div className="profileContainer">{aaa}</div>;
  }
  useEffect(() => {
    const getProfileImage = async () => {
      const profileRes = await customAxios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/profileImages`,
      });
      console.log(profileRes.data);
      setProfileImages(profileRes.data);
    };
    getProfileImage();
  }, []);

  // 회원가입 요청전송
  const requestSignup = async () => {
    loadingControl(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/signup`,
        {
          email: userInfo.username,
          password: userInfo.password,
          password2: userInfo.passwordConfirmation,
          nickname: userInfo.nickname,
          profile_id: userInfo.profileId,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "*/*",
          },
        }
      );
      if (res.status !== 200) {
        throw new Error("SinupFailed");
      }
    } catch (e: any) {
      if (e.message === "SinupFailed") {
        errorControl("회원가입에 실패했습니다.");
      } else {
        errorControl("알수없는 에러가 발생했습니다.");
      }
    }
    const loginData: LoginUserInfo = {
      username: userInfo.username,
      password: userInfo.password,
    };
    userLogin(loginData);
    console.log(loginData);
    console.log("성공");
    loadingControl(false);
  };
  // page 이동 함수
  function goToProfile(): void {
    if (page === 1) {
      setPage(2);
    } else if (page === 2) {
      setPage(1);
    }
  }

  // 닉네임 중복검사요청
  function requsetCheckEmail(): void {
    // 닉네임 재작성
    if (sendCheckEmail) {
      setSendCheckEmail(() => false);
      setEmailConfirmation(() => false);
    } else {
      // 닉네임 인증
      setSendCheckEmail(() => true);
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${userInfo.username}/email`,
        data: { email: userInfo.username },
      })
        .then((res) => {
          if (res.data.result === true) {
            setEmailConfirmation(() => true);
          } else {
            alert("이미 존재하는 닉네임 입니다.");
            setSendCheckEmail(() => false);
            setEmailMessage("");
          }
        })
        .catch((err) => {
          setSendCheckEmail(() => false);
        });
    }
  }
  function requsetCheckNickname(): void {
    // 닉네임 재작성
    if (sendCheckNickname) {
      setSendCheckNickname(() => false);
      setNicknameConfirmation(() => false);
    } else {
      // 닉네임 인증
      setSendCheckNickname(() => true);
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${userInfo.nickname}/nickname`,
        data: { nickname: userInfo.nickname },
      })
        .then((res) => {
          if (res.data.result === true) {
            setNicknameConfirmation(() => true);
          }
          else {
            alert("이미 존재하는 닉네임 입니다.")
            setSendCheckNickname(() => false)
            setNickNameMessage("")
          }
        })
        .catch((err) => {
          setSendCheckNickname(() => false);
        });
    }
  }

  // 회원가입폼 정보입력
  function changeUserInfo(event: React.ChangeEvent<HTMLInputElement>): void {
    const newUserInfo: SignupUserInfo = { ...userInfo };
    const targetId: string = event.target.id;
    newUserInfo[targetId] = event.target.value;
    setUserInfo(() => newUserInfo);
    // 유효성 검사
    switch (targetId) {
      case "username":
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!newUserInfo.username || emailRegex.test(newUserInfo.username)) {
          setEmailMessage("");
        } else {
          setEmailMessage("이메일 형식이 틀렸습니다.");
        }
        break;
      case "password":
        // 비밀번호 유효성 검사
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!newUserInfo.password || passwordRegex.test(newUserInfo.password)) {
          setPasswordMessage("");
        } else {
          setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리이상 입력하세요.");
        }
        // 비밀번호 확인 일치검사
        if (!newUserInfo.passwordConfirmation || newUserInfo.password === newUserInfo.passwordConfirmation) {
          setPasswordConfirmMessage("");
        } else {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        }

        break;
      case "passwordConfirmation":
        if (!newUserInfo.passwordConfirmation || newUserInfo.password === newUserInfo.passwordConfirmation) {
          setPasswordConfirmMessage("");
        } else {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        }
        break;
      case "nickname":
        if (newUserInfo.nickname.length < 2 || newUserInfo.nickname.length > 8) {
          setNickNameMessage("닉네임은 2글자 이상 8글자 이하로 입력해 주세요");
        } else {
          setNickNameMessage("");
        }

        break;

      default:
        return;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        alignItems: "center",
        height: "calc(100% - 80px)",
        width: "100%",
      }}
    >
      {page === 2 || (
        <Container component="main" maxWidth="sm" className="SignupContainer">
          <div>
            <Typography component="h1" variant="h5" className="mytitle">
              회원가입
            </Typography>
            <form noValidate>
              <TextFieldWithButton
                label="이메일"
                id="username"
                autoComplete="email"
                onChange={changeUserInfo}
                onClickButton={requsetCheckEmail}
                buttonText="이메일중복확인"
                disabled={sendCheckEmail}
                helperText={emailMessage}
              />
              <TextField
                className="mypassword"
                error={!!passwordMessage}
                helperText={passwordMessage}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changeUserInfo}
              />
              <TextField
                className="mypasswordc"
                error={!!passwordConfirmMessage}
                helperText={passwordConfirmMessage}
                variant="outlined"
                margin="normal"
                fullWidth
                name="passwordConfirmation"
                label="비밀번호 확인"
                type="password"
                id="passwordConfirmation"
                onChange={changeUserInfo}
              />
              <TextFieldWithButton
                label="닉네임"
                id="nickname"
                onChange={changeUserInfo}
                onClickButton={requsetCheckNickname}
                buttonText="닉네임중복확인"
                disabled={sendCheckNickname}
                helperText={nickNameMessage}
              />
              <Button
                className="mybutton"
                fullWidth
                variant="contained"
                color="primary"
                onClick={goToProfile}
                disabled={
                  userInfo.password !== userInfo.passwordConfirmation ||
                  userInfo.username === "" ||
                  userInfo.password === "" ||
                  userInfo.passwordConfirmation === "" ||
                  userInfo.nickname === "" ||
                  nicknameConfirmation === false ||
                  emailConfirmation === false
                }
              >
                회원가입
              </Button>
            </form>
          </div>
        </Container>
      )}
      {page === 1 || (
        <Container component="main" maxWidth="sm" className="Profile">
          <button className="back">
            <ArrowBackIcon onClick={goToProfile} />
          </button>
          <Typography component="h1" variant="h5" className="mytitle">
            프로필 선택
          </Typography>
          <ProfileSelector />
          <Button
            className="mybutton"
            fullWidth
            variant="contained"
            color="primary"
            onClick={requestSignup}
            disabled={
              userInfo.password !== userInfo.passwordConfirmation ||
              userInfo.username === "" ||
              userInfo.password === "" ||
              userInfo.passwordConfirmation === "" ||
              userInfo.nickname === "" ||
              nicknameConfirmation === false ||
              emailConfirmation === false
            }
          >
            회원가입
          </Button>
        </Container>
      )}
    </div>
  );
}

const mapStateToProps = ({ account }: AccountReducer) => {
  return {
    isLogin: account.isLogin,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    errorControl: (errorMessage: string) => {
      errorControl(dispatch, errorMessage);
    },
    loadingControl: (state: boolean) => {
      loadingControl(dispatch, state);
    },
    userLogin: (userInfo: LoginUserInfo) => dispatch(userLogin(userInfo)),
  };
};
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

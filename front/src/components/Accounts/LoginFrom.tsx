import React, { useState, useEffect, KeyboardEvent } from "react";

// import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Typography, Link, Container, TextField, Button, Box } from "@mui/material";
import { connect } from "react-redux";
import { userLogin } from "../../redux/account/actions";
import { LoginUserInfo } from "../../types/account";
import { AccountReducer } from "../../redux/rootReducer";
import "../../styles/Login.scss";

//footbar
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="/" style={{textDecoration:"none"}}>Forest Rap Battle</Link> {" | "}
      <Link color="inherit" href="/signup" style={{textDecoration:"none"}}> 회원이 아니신가요</Link>
    </Typography>
  );
}

//로그인
function LoginForm({ userLogin, isLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onKeyPress = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      login(); //enter누르면 작성
    }
  };
  const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const login = () => {
    const data: LoginUserInfo = {
      username: email,
      password: password,
    };
    userLogin(data)
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

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
      <Container component="main" maxWidth="xs" className="LoginContainer">
        <div>
          <Typography component="h1" variant="h5" className="mytitle">
            로그인
          </Typography>
          <div>
            <TextField
              value={email}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onEmailHandler}
              className="myemail"
            />
            <TextField
              className="mypassword"
              value={password}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onPasswordHandler}
              onKeyPress={onKeyPress}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" onClick={login} className="mybutton">
              로그인
            </Button>
          </div>
        </div>
        <Box mt={8} className="copyright">
          <Copyright />
        </Box>
      </Container>
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
    userLogin: (userInfo: LoginUserInfo) => dispatch(userLogin(userInfo)),
  };
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

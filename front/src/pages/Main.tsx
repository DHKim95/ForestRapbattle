import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Main.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Grid, Button, styled, createTheme, ThemeProvider } from "@mui/material";
import fight from "../assets/fight.png";
import idea from "../assets/idea.png";
import talk from "../assets/talk.png";
import { useSelector } from "react-redux";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#e6b555",
      contrastText: "#fff",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

const MyButton = styled(Button)({
  width: "200px",
  height: "50px",
  // backgroundColor: "orange",
  fontSize: "20px",
  fontWeight: "bolder",
  color: "black",
  marginTop: "50px",
});

function Main() {
  useEffect(() => {
    AOS.init();
  });
  const isLogin1 = useSelector((state: any) => state.account.isLogin)
  console.log(isLogin1)
  return (
    <div>
      <Navbar></Navbar>
      <div className="Main">
        <div className="title">
          <p>숲바람 랩배틀</p>
          <ThemeProvider theme={theme}>
            <MyButton color="neutral" variant="contained" size="large">
              게임 플레이하기
            </MyButton>
          </ThemeProvider>
        </div>
      </div>
      <div style={{ backgroundColor: "rgb(125, 174, 136)" }}>
        <Container maxWidth="xl">
          <h1 data-aos="fade-down" className="title2">
            Forest Rap Battle
          </h1>
          <Grid className="items" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6} data-aos="fade-up">
              <img src={fight} alt="fight" style={{ width: "45%" }} />
            </Grid>
            <Grid item xs={6} data-aos="fade-up">
              <div>
                <h1>승자가 되세요</h1>
                <p>상대방의 애완동물들을 물리치고 상대 진영으로 가</p>
                <p>적의 성벽을 무너뜨리고 승자가 되세요.</p>
              </div>
            </Grid>
          </Grid>
          <Grid className="items" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6} data-aos="fade-up">
              <div>
                <h1>신속하고</h1>
                <h1>정확하게 외쳐요!</h1>
                <p>소환하고 싶은 애완동물의 이름을 외쳐 소환하세요.</p>
                <p>수식어가 길고 어려운 애완동물일 수록 강합니다.</p>
              </div>
            </Grid>
            <Grid item className="rightPic" xs={6} data-aos="fade-up">
              <img src={talk} alt="talk" style={{ width: "45%" }} />
            </Grid>
          </Grid>
          <Grid className="items" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6} data-aos="fade-up">
              <img src={idea} alt="idea" style={{ width: "60%" }} />
            </Grid>
            <Grid item xs={6} data-aos="fade-up">
              <div>
                <h1>게임하며 발음교정까지!</h1>
                <p>음성인식 잰말놀이와 디펜스 게임을 동시에 즐기면서</p>
                <p>어느새 아나운서 못지않은 발음을 가져보세요.</p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Main;

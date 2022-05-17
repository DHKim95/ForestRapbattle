import React from "react";
import { styled, Avatar, Container } from "@mui/material";
import facebook from "../assets/facebook.png";
import youtube from "../assets/youtube.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";

interface FooterProps {
  bgcolor?: string,
  fontcolor?: string,
}

function Footer({ bgcolor, fontcolor }: FooterProps) {
  const RootStyle = styled("div")({
    height: "500px",
    backgroundColor: bgcolor ? bgcolor: "black",
    color: fontcolor ? fontcolor: "white",
  });
  const RowAlign = styled("div")({
    display: "flex",
    flexDirection: "row",
    padding: "50px 0px",
    justifyContent: "center",
  });
  const MyAvatar = styled(Avatar)({
    width: "70px",
    height: "70px",
    margin: "0px 20px",
  });
  const FooterTitle = styled("h1")({
    fontSize: "60px",
    fontWeight: "bolder",
    marginTop: "75px",
    fontFamily: "CookieRun",
  });

  return (
    <RootStyle>
      <Container>
        <RowAlign>
          <MyAvatar>
            <img src={facebook} alt="facebook" style={{ width: "115%" }} />
          </MyAvatar>
          <MyAvatar>
            <img src={youtube} alt="youtube" style={{ width: "110%" }} />
          </MyAvatar>
          <MyAvatar>
            <img src={twitter} alt="twitter" style={{ width: "130%" }} />
          </MyAvatar>
          <MyAvatar>
            <img src={instagram} alt="instagram" style={{ width: "105%" }} />
          </MyAvatar>
        </RowAlign>
        <div style={{ color: "white", textAlign: "center" }}>
          <div>부산광역시 강서구 녹산산업중로 333</div>
          {/* <div>전화: 02-2148-0750 팩스: 02-2148-0629</div> */}
          <br />
          <div>(현) 팀장 : 윤찬호 / (구) 팀장 : 최명재 / 팀원 : 김도훈 김태현 조성현 조은누리</div>
          <br />
          <div>© 2022 SSAFY 6th.부울경 E204. 부산 없는 부산 팀 All Rights Reserved.</div>
          <FooterTitle>Forest Rap Battle</FooterTitle>
        </div>
      </Container>
    </RootStyle>
  );
}

export default Footer;

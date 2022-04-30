import React from "react";
import { styled, Avatar, Container } from "@mui/material";
import facebook from "../assests/facebook.png";
import youtube from "../assests/youtube.png";
import twitter from "../assests/twitter.png";
import instagram from "../assests/instagram.png";

function Footer() {
  const RootStyle = styled("div")({
    height: "500px",
    backgroundColor: "black",
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
          <div>서울특별시 강남구 도산대로 327</div>
          <div>전화: 02-2148-0750 팩스: 02-2148-0629</div>
          <div>© 2022 Devsisters Corp. All Rights Reserved.</div>
          <FooterTitle>Forest Rap Battle</FooterTitle>
        </div>
      </Container>
    </RootStyle>
  );
}

export default Footer;

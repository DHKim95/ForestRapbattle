import React from 'react'
import back2 from '../assets/back2.jpg';
import { styled } from "@mui/material";

export function MainContainer() {
  const MainContainerStyle = styled("div")({
    width: "100%",
    height: "100%"
  });
  const ImgStyle = styled("img")({
    width: "100%",
    height: "100%"
  });
  return (
    <MainContainerStyle>
      <ImgStyle src={back2} alt="background" />
    </MainContainerStyle>
  );
}

function
  BackgroundImage() {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 0,
        width: "100%",
        height: "100%",
        filter: "brightness(60%)",
      }}
    >
      <MainContainer />
    </div>
  );
}

export default BackgroundImage
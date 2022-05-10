import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/Rank.scss'
import { Container, styled } from "@mui/material";
import Ranking from '../components/Ranking';

function Rank() {
  return (
    <div className="rank">
      <Navbar />
      <Container maxWidth="xl">
        <div className="mytitle">Ranking</div>
        <Ranking></Ranking>
      </Container>
    </div>
  );
}

export default Rank
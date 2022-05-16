import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import '../styles/Rank.scss'
import { Container, Stack, Typography, Pagination } from "@mui/material";
import { customAxios } from "../customAxios";

function Rank() {
  const [page,setPage] = useState<number>(1)
  const [rankingResults, setRankingresults] = useState<Rankingresult[]>([]);
  const [topRanker, setTopRanker] = useState<Rankingresult[]>([]);
  type Rankingresult = {
    rank: number;
    user_id: number;
    nickname: string;
    win_cnt: number;
    lose_cnt: number;
    win_point: number;
    profile: any;
  }
  const getRankingResults = async () => {
    const gameRes = await customAxios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/game/ranking`,
      params: {page:page}
    });
    if (page === 1) {
      setTopRanker(gameRes.data.slice(0,3))
      setRankingresults(gameRes.data.slice(3,gameRes.data.length))
    } else {
      setRankingresults(gameRes.data);
    }
    console.log(gameRes);
    console.log(rankingResults)
  };
  useEffect(() => {
    getRankingResults();
  }, []);

function Ranking() {
  const rankingList = [];
  for (let index = 0; index < rankingResults.length; index++) {
    let rankingItem = rankingResults[index];
    rankingList.push(
      // <div className="history" style={win ? { border: "1px solid blue" } : {border: "1px solid red"}}>
      <div key={rankingItem.rank}>
        <div>{rankingItem.rank}</div>
        <div>{rankingItem.nickname}</div>
        <div>{rankingItem.win_cnt}</div>
        <div>{rankingItem.lose_cnt}</div>
        <img src={rankingItem.profile.profile_img} alt="rankImage" style={{ width: "50px" }} />
      </div>
    )
  }
  return <div>{rankingList}</div>;
}
// function TopRank() {
//   const rankerList = [];
//   for (let index = 0; index < topRanker.length; index++) {
//     let rankerItem = topRanker[index];
//     rankerList.push(
//       <div key={rankerItem.rank} style={{border: "1px solid blue"}}>
//         <div>{rankerItem.rank}</div>
//         <div>{rankerItem.nickname}</div>
//         <div>{rankerItem.win_cnt}</div>
//         <div>{rankerItem.lose_cnt}</div>
//         <img src={rankerItem.profile.profile_img} alt="rankImage" style={{ width: "50px" }} />
//       </div>
//     )
//   }
//   return <div>{rankerList}</div>;
// }

  return (
    <div className="rank">
      <Navbar />
      <Container maxWidth="xl">
        <div className="mytitle">Ranking</div>
        <div>{rankingResults[0]?.rank}</div>
        <div>{topRanker[0]?.rank}</div>
        <div>
          <div>{topRanker[0]?.rank}</div>
          <div>{topRanker[0]?.nickname}</div>
          <div>{topRanker[0]?.win_cnt}</div>
          <div>{topRanker[0]?.lose_cnt}</div>
          <img src={topRanker[0]?.profile.profile_img} alt="rankImage" style={{ width: "50px" }} />
        </div>
        <div>
          <div>{topRanker[1]?.rank}</div>
          <div>{topRanker[1]?.nickname}</div>
          <div>{topRanker[1]?.win_cnt}</div>
          <div>{topRanker[1]?.lose_cnt}</div>
          <img src={topRanker[1]?.profile.profile_img} alt="rankImage" style={{ width: "50px" }} />
        </div>
        <div>
          <div>{topRanker[2]?.rank}</div>
          <div>{topRanker[2]?.nickname}</div>
          <div>{topRanker[2]?.win_cnt}</div>
          <div>{topRanker[2]?.lose_cnt}</div>
          <img src={topRanker[2]?.profile.profile_img} alt="rankImage" style={{ width: "50px" }} />
        </div>
        <Ranking />
      </Container>
      {/* <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack> */}
    </div>
  );
}

export default Rank
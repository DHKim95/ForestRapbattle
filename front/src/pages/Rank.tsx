import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar'
import '../styles/Rank.scss'
import { Container, Stack, Pagination, Table, TableBody, TableContainer, TableHead, TableRow, Paper   } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { customAxios } from "../customAxios";
import Footer from '../components/Footer'
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#7DAE88",
    color: theme.palette.common.white,
    fontFamily: "GmarketSansMedium",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface svgProps {
  color ?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  tier?: string;
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

function Rank() {
  const navigate = useNavigate();
  const [total, setTotal] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };  
  const [rankingResults, setRankingresults] = useState<Rankingresult[]>([
    {
      rank: 0,
      user_id: 0,
      nickname: "",
      win_cnt: 0,
      lose_cnt: 0,
      win_point: 0,
      profile: {},
    }
  ]);
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
    console.log(gameRes)
    setTotal(parseInt(String((gameRes.data.rank_total_cnt -4)/15))+1)
    if (page === 1) {
      setTopRanker(gameRes.data.data.slice(0,3))
      setRankingresults(gameRes.data.data.slice(3,gameRes.data.length))
    } else {
      setRankingresults(gameRes.data.data);
    }
    console.log(gameRes);
    console.log(rankingResults)
  };
  useEffect(() => {
    getRankingResults();
  }, [page]);

  return (
    <div className="rank">
      <Navbar color="rgb(125, 174, 136)"/>
      <Container maxWidth="lg">
        <div className="mytitle cookie">Ranking</div>
        <div className="top1">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg">
            <path d="M33.5449 26.6129C33.1097 26.5724 32.673 26.5501 32.2359 26.5459C23.5679 26.5459 16.5449 33.5819 16.5449 42.2639C16.5449 44.8539 17.1819 47.2889 18.2889 49.4419C17.7117 47.6897 17.417 45.8568 17.4159 44.0119C17.4159 34.8069 24.5269 27.2829 33.5449 26.6129ZM38.5329 55.1389C37.0006 56.1652 35.3178 56.9466 33.5449 57.4549C36.0212 57.1501 38.391 56.2669 40.4629 54.8769C47.6659 50.0349 49.6209 40.3769 44.8299 33.2989C44.5855 32.9455 44.3263 32.6025 44.0529 32.2709C48.4799 40.0039 46.1679 50.0059 38.5329 55.1389Z" fill="#F1B457"/>
            <path d="M44.656 26.519V17.821C44.656 17.457 44.457 17.151 44.176 16.961L54 2H35.164L32 6.746L28.836 2H10L19.822 16.96C19.541 17.15 19.342 17.457 19.342 17.821V26.519C14.861 30.187 12 35.758 12 42C12 53.045 20.955 62 32 62C32.682 62 33.354 61.965 34.018 61.898C44.115 60.887 52 52.365 52 42C52 35.758 49.137 30.187 44.656 26.519ZM40.826 3H47.154L38.328 16.239L35.164 11.493L40.826 3ZM41.492 20.985L42.465 19.527C42.518 19.652 42.547 19.788 42.547 19.931V24.15C42.5461 24.2805 42.5194 24.4095 42.4684 24.5297C42.4174 24.6498 42.3432 24.7587 42.25 24.85C39.25 23.052 35.752 22 32 22C28.387 22.0006 24.8426 22.9863 21.748 24.851C21.5604 24.6656 21.4537 24.4137 21.451 24.15V19.931C21.451 19.788 21.482 19.651 21.533 19.527L22.506 20.986H41.492V20.985ZM16.846 3H23.174L34.498 19.985H28.17L16.846 3ZM32 59C22.611 59 15 51.389 15 42C15 32.612 22.611 25 32 25C41.387 25 49 32.612 49 42C49 51.389 41.387 59 32 59Z" fill="#F1B457"/>
            <path d="M34.234 49.207V31H30.39C30.3901 31.3985 30.3117 31.7932 30.1593 32.1614C30.0069 32.5296 29.7834 32.8642 29.5017 33.146C29.2199 33.4278 28.8854 33.6514 28.5172 33.804C28.1491 33.9565 27.7545 34.035 27.356 34.035V37.828C27.63 37.828 29.701 37.672 30.39 37.396V49.207H27.356V53H37.268V49.207H34.234Z" fill="#F1B457"/>
          </svg>
          <img
            src={topRanker[0]?.profile.profile_img} alt="rankImage"
            onClick={() => {
              navigate(`/profile/${topRanker[0]?.user_id}`);
            }} 
          />
          <div className="nickname cookie">{topRanker[0]?.nickname}</div>
          <div className="tier">
            <Tier color={scoreToTier(topRanker[0]?.win_point)?.color} className="tierLogo" tier={scoreToTier(topRanker[0]?.win_point)?.tier}></Tier>
            <div>{scoreToTier(topRanker[0]?.win_point)?.tier} {topRanker[0]?.win_point} points </div>
          </div>
          <div className="progressbar">
            <progress id="progress" value={topRanker[0]?.win_cnt} max={topRanker[0]?.win_cnt + topRanker[0]?.lose_cnt}></progress>
            <div className="winrate">
              <span className="winp">{topRanker[0]?.win_cnt}승</span>
              <span className="losep">{topRanker[0]?.lose_cnt}패</span>
            </div>
            <span className="rate">{Math.floor((topRanker[0]?.win_cnt)/((topRanker[0]?.lose_cnt)+(topRanker[0]?.win_cnt))*100)}%</span>
          </div>
        </div>
        <div className="top23">
          <div className="top1">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg">
              <path d="M44.656 26.519V17.821C44.656 17.457 44.457 17.151 44.176 16.961L54 2H35.164L32 6.746L28.836 2H10L19.822 16.96C19.541 17.15 19.342 17.457 19.342 17.821V26.519C14.861 30.187 12 35.758 12 42C12 53.045 20.955 62 32 62C32.682 62 33.354 61.965 34.018 61.898C44.115 60.887 52 52.365 52 42C52 35.758 49.137 30.187 44.656 26.519ZM40.826 3H47.154L38.328 16.239L35.164 11.493L40.826 3ZM41.492 20.985L42.465 19.527C42.518 19.652 42.547 19.788 42.547 19.931V24.15C42.5461 24.2805 42.5194 24.4095 42.4684 24.5297C42.4174 24.6498 42.3432 24.7587 42.25 24.85C39.25 23.052 35.752 22 32 22C28.387 22.0006 24.8426 22.9863 21.748 24.851C21.5604 24.6656 21.4537 24.4137 21.451 24.15V19.931C21.451 19.788 21.482 19.651 21.533 19.527L22.506 20.986H41.492V20.985ZM16.846 3H23.174L34.498 19.985H28.17L16.846 3ZM32 59C22.611 59 15 51.389 15 42C15 32.612 22.611 25 32 25C41.387 25 49 32.612 49 42C49 51.389 41.387 59 32 59Z" fill="#5A4BB9"/>
              <path d="M32.2359 26.546C23.5699 26.546 16.5449 33.582 16.5449 42.264C16.5449 44.854 17.1819 47.289 18.2889 49.442C17.713 47.6888 17.419 45.8554 17.4179 44.01C17.4179 34.807 24.5269 27.285 33.5449 26.613C33.1097 26.5725 32.673 26.5501 32.2359 26.546ZM38.5329 55.139C37.0008 56.1657 35.3179 56.9471 33.5449 57.455C36.0212 57.1502 38.391 56.2671 40.4629 54.877C47.6659 50.035 49.6209 40.377 44.8299 33.301C44.5859 32.941 44.3219 32.603 44.0529 32.27C48.4799 40.006 46.1699 50.006 38.5329 55.139Z" fill="#5A4BB9"/>
              <path d="M38.4478 49.207H29.3438V46.932C29.344 46.1273 29.6638 45.3556 30.2327 44.7866C30.8015 44.2175 31.5731 43.8975 32.3778 43.897C33.1748 43.8972 33.964 43.7405 34.7004 43.4356C35.4367 43.1308 36.1058 42.6839 36.6694 42.1203C37.233 41.5568 37.6801 40.8878 37.9851 40.1515C38.29 39.4152 38.4469 38.626 38.4468 37.829C38.4468 34.872 36.9468 31.001 31.6198 31.001C28.0708 31.001 25.5508 33.696 25.5508 37.829H29.3438C29.3438 36.268 30.5208 34.827 32.0458 34.827C33.8618 34.827 34.6538 36.022 34.6538 37.071C34.6535 37.8755 34.3337 38.6469 33.7648 39.2157C33.1958 39.7845 32.4243 40.104 31.6198 40.104C30.8227 40.104 30.0334 40.261 29.297 40.566C28.5607 40.8711 27.8916 41.3182 27.328 41.8819C26.7644 42.4456 26.3174 43.1147 26.0125 43.8512C25.7075 44.5876 25.5506 45.3769 25.5508 46.174V53H38.4468V49.207H38.4478Z" fill="#5A4BB9"/>
            </svg>
            <img
              src={topRanker[1]?.profile.profile_img} alt="rankImage"
              onClick={() => {
                navigate(`/profile/${topRanker[1]?.user_id}`);
              }} 
            />
            <div className="nickname cookie">{topRanker[1]?.nickname}</div>
            <div className="tier">
              <Tier color={scoreToTier(topRanker[1]?.win_point)?.color} className="tierLogo" tier={scoreToTier(topRanker[1]?.win_point)?.tier}></Tier>
              <div>{scoreToTier(topRanker[1]?.win_point)?.tier} {topRanker[1]?.win_point} points </div>
            </div>
            <div className="progressbar">
              <progress id="progress" value={topRanker[1]?.win_cnt} max={topRanker[1]?.win_cnt + topRanker[1]?.lose_cnt}></progress>
              <div className="winrate">
                <span className="winp">{topRanker[1]?.win_cnt}승</span>
                <span className="losep">{topRanker[1]?.lose_cnt}패</span>
              </div>
              <span className="rate">{Math.floor((topRanker[1]?.win_cnt)/((topRanker[1]?.lose_cnt)+(topRanker[1]?.win_cnt))*100)}%</span>
            </div>
          </div>
          <div className="top1">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg">
              <path d="M44.656 26.521V17.824C44.6534 17.652 44.6083 17.4833 44.5245 17.333C44.4407 17.1828 44.321 17.0556 44.176 16.963L54 2H35.164L32 6.747L28.836 2H10L19.822 16.961C19.677 17.0536 19.5573 17.1808 19.4735 17.331C19.3897 17.4813 19.3446 17.65 19.342 17.822V26.519C14.861 30.188 12 35.759 12 42.001C12 53.046 20.955 62 32 62C32.682 62 33.354 61.965 34.018 61.898C44.115 60.888 52 52.366 52 42.001C52 35.759 49.137 30.188 44.656 26.521ZM40.826 3H47.154L38.328 16.24L35.164 11.494L40.826 3ZM41.492 20.987L42.465 19.528C42.518 19.653 42.547 19.788 42.547 19.932V24.151C42.5463 24.2814 42.5196 24.4103 42.4687 24.5303C42.4177 24.6503 42.3433 24.759 42.25 24.85C39.25 23.053 35.752 22 32 22C28.3869 22.0004 24.8423 22.9865 21.748 24.852C21.5606 24.6665 21.4539 24.4146 21.451 24.151V19.932C21.451 19.787 21.482 19.651 21.533 19.528L22.506 20.987H41.492ZM16.846 3H23.174L34.498 19.987H28.17L16.846 3ZM32 59.001C22.611 59.001 15 51.39 15 42.001C15 32.612 22.611 25.001 32 25.001C41.387 25.001 49 32.612 49 42.001C49 51.39 41.387 59.001 32 59.001Z" fill="#654141"/>
              <path d="M32.2359 26.548C23.5699 26.548 16.5449 33.585 16.5449 42.265C16.5449 44.855 17.1819 47.29 18.2889 49.445C17.7132 47.6911 17.4192 45.857 17.4179 44.011C17.4179 34.808 24.5269 27.286 33.5449 26.615C33.1097 26.5744 32.673 26.552 32.2359 26.548ZM38.5329 55.14C37.0017 56.1682 35.3185 56.9498 33.5449 57.456C36.0217 57.153 38.3919 56.2697 40.4629 54.878C47.6659 50.036 49.6209 40.378 44.8319 33.302C44.5864 32.9484 44.3272 32.6045 44.0549 32.271C48.4799 40.007 46.1679 50.007 38.5329 55.14Z" fill="#654141"/>
              <path d="M38.875 46.1691C38.875 44.864 38.52 43.7531 37.81 42.8321C37.099 41.9111 36.151 41.3181 34.965 41.0541C36.95 39.9271 37.944 38.4181 37.944 36.5281C37.944 35.1951 37.459 34.0021 36.49 32.9431C35.314 31.6481 33.751 31.0031 31.803 31.0031C30.664 31.0031 29.636 31.2261 28.719 31.6721C27.8 32.1171 27.085 32.7301 26.573 33.5091C26.06 34.2871 25.677 35.3281 25.423 36.6321L29.078 37.2781C29.182 36.3371 29.474 35.6231 29.954 35.1321C30.1767 34.896 30.446 34.7089 30.7448 34.5825C31.0437 34.4562 31.3656 34.3933 31.69 34.3981C32.377 34.3981 32.928 34.614 33.342 35.045C33.756 35.475 33.963 36.0531 33.963 36.7781C33.963 37.6311 33.68 38.3141 33.115 38.8281C32.551 39.3431 31.731 39.5861 30.658 39.5571L30.22 42.9221C30.926 42.7161 31.533 42.6131 32.042 42.6131C32.813 42.6131 33.467 42.916 34.004 43.524C34.541 44.13 34.81 44.9541 34.81 45.9921C34.81 47.0911 34.53 47.9621 33.969 48.6091C33.408 49.2551 32.719 49.5791 31.901 49.5791C31.138 49.5791 30.489 49.3081 29.953 48.7701C29.417 48.2321 29.088 47.4521 28.965 46.4321L25.125 46.9181C25.323 48.7301 26.038 50.1961 27.271 51.3191C28.504 52.4401 30.057 53.0021 31.93 53.0021C33.906 53.0021 35.557 52.3351 36.885 51.003C38.212 49.671 38.875 48.0601 38.875 46.1691Z" fill="#654141"/>
            </svg>
            <img
              src={topRanker[2]?.profile.profile_img} alt="rankImage"
              onClick={() => {
                navigate(`/profile/${topRanker[2]?.user_id}`);
              }} 
            />
            <div className="nickname cookie">{topRanker[2]?.nickname}</div>
            <div className="tier">
              <Tier color={scoreToTier(topRanker[2]?.win_point)?.color} className="tierLogo" tier={scoreToTier(topRanker[2]?.win_point)?.tier}></Tier>
              <div>{scoreToTier(topRanker[2]?.win_point)?.tier} {topRanker[2]?.win_point} points </div>
            </div>
            <div className="progressbar">
              <progress id="progress" value={topRanker[2]?.win_cnt} max={topRanker[2]?.win_cnt + topRanker[2]?.lose_cnt}></progress>
              <div className="winrate">
                <span className="winp">{topRanker[2]?.win_cnt}승</span>
                <span className="losep">{topRanker[2]?.lose_cnt}패</span>
              </div>
              <span className="rate">{Math.floor((topRanker[2]?.win_cnt)/((topRanker[2]?.lose_cnt)+(topRanker[2]?.win_cnt))*100)}%</span>
            </div>
          </div>
        </div>
      <TableContainer component={Paper} className="rankingtable">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="tablehead">
              <StyledTableCell>순위</StyledTableCell>
              <StyledTableCell>소환사</StyledTableCell>
              <StyledTableCell >티어</StyledTableCell>
              <StyledTableCell >Point</StyledTableCell>
              <StyledTableCell >승률</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankingResults?.map((row) => (
              <StyledTableRow key={row.rank}>
                <StyledTableCell component="th" scope="row" className="nanum">
                  {row.rank}
                </StyledTableCell>
                <StyledTableCell>
                  <div className="userInfo"
                    onClick={() => {
                      navigate(`/profile/${row.user_id}`);
                    }} 
                  >
                    <img src={row.profile.profile_img} alt="profile" className="rankingprofile"/>
                    <div className="nickname">{row.nickname}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell className="nanum">{scoreToTier(row.win_point)?.tier}</StyledTableCell>
                <StyledTableCell className="nanum">{row.win_point} pt</StyledTableCell>
                <StyledTableCell>
                  <div className="progressbar">
                    <progress id="progress" value={row.win_cnt+row.lose_cnt === 0 ? "50" : row.win_cnt } max={row.win_cnt+row.lose_cnt === 0 ? "100" : row.win_cnt+row.lose_cnt }></progress>
                    <div className="winrate">
                      <span className="winp">{row.win_cnt}승</span>
                      <span className="losep">{row.lose_cnt}패</span>
                    </div>
                    {row.win_cnt === 0 || (<span className="rate">{Math.floor((row.win_cnt) / ((row.lose_cnt) + (row.win_cnt)) * 100)}%</span>)}
                    {row.win_cnt !== 0 || (<span className="rate">0%</span>)}
                  </div>                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
      <Stack spacing={2}>
        <Pagination count={total} page={page} variant="outlined" shape="rounded" onChange={handleChange} color="primary" className="pagination" size="large" />
      </Stack>
      <Footer bgcolor="#7DAE88" fontcolor="black"/>
    </div>
  );
}

export default Rank
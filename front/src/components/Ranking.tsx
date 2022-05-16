import React from 'react'
import { customAxios } from "../customAxios";

function Ranking() {
  async function GetRank() {
    const profileRes = await customAxios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/profileImages`,
    });
  }
  return (
    <div>랭킹 페이지</div>
  )
}

export default Ranking
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    private float gameTimer;
    private float gameTimeLimit;

    // Start is called before the first frame update
    void Start()
    {
        gameTimer = 0.0f;
    }

    // Update is called once per frame
    void Update()
    {   
        gameTimer += Time.deltaTime;
        // 시간을 체크해 게임시간이 끝나거나 플레이어 둘 중 한 명이 죽으면 조건문 진입
        if (TimeCheck() || HealthCheck())
        {
            // 게임 결과 화면에 표시 및 전송, 씬 이동
        }
    }

    bool TimeCheck()
    {
        // 게임 시간이 끝났을 경우
        if (gameTimeLimit >= gameTimer)
        {
            return true;
        }
        return false;
    }

    bool HealthCheck()
    {
        // 플레이어 두명의 체력을 체크 해줘야 함
        //if ()
        //{
        //    return true;
        //}
        return false;
    }
}

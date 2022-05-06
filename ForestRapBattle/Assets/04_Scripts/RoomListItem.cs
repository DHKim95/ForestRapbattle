using Photon.Realtime;
using System.Collections;
using System.Collections.Generic;
using TMPro;//텍스트 메쉬 프로 기능 사용
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;

public class RoomListItem : MonoBehaviourPunCallbacks//다른 포톤 반응 받아들이기 
{
    [SerializeField] TMP_Text RoomNameText;
    [SerializeField] TMP_Text RoomOwnerText;
    [SerializeField] TMP_Text PlayerCntText;

    [SerializeField] RawImage Lock;
    [SerializeField] Button InGameBtn;
    [SerializeField] Button IsFullBtn;

    public bool isGaming = false;

    // Start is called before the first frame update
    public RoomInfo info;

    public static RoomListItem Instance;//스크립트를 메서드로 사용하기 위해 선언

    public void SetUp(RoomInfo _info)// 방정보 받아오기
    {
        info = _info;
        RoomNameText.text = _info.Name;
        RoomOwnerText.text = (string)_info.CustomProperties["Owner"];

        int playerCount = _info.PlayerCount;
        Debug.Log(playerCount);
        Debug.Log("room owner:" + _info.CustomProperties["Owner"]);
        Debug.Log("is secret:" + _info.CustomProperties["isSecret"]);
        Debug.Log("gaming state:" + _info.CustomProperties["isGaming"]);
        PlayerCntText.text = playerCount.ToString() + "/" + _info.MaxPlayers.ToString();

        Debug.Log("Setting up");

        
        if (!_info.IsOpen) //들어갈 수 없는 상태(full or in game)
        {
            if ((bool)_info.CustomProperties["isGaming"]) // 게임 진행중 아니면
            {
                Debug.Log("room closed: in game");
                Lock.gameObject.SetActive(false);
                IsFullBtn.gameObject.SetActive(false);
                InGameBtn.gameObject.SetActive(true);
            }
            else // 2명이라 못 들어감
            {
                Debug.Log("room closed: is full");
                Lock.gameObject.SetActive(false);
                IsFullBtn.gameObject.SetActive(true);
                InGameBtn.gameObject.SetActive(false);
            }
            
        }
        else // 열린 상태
        {
            if ((string)_info.CustomProperties["isSecret"] == "True") // 비밀방
            {
                Debug.Log("room open: secret on");
                Lock.gameObject.SetActive(true);
                IsFullBtn.gameObject.SetActive(false);
                InGameBtn.gameObject.SetActive(false);
            }
            else //그저 열린방
            {
                Debug.Log("room open: secret off");
                Lock.gameObject.SetActive(false);
                IsFullBtn.gameObject.SetActive(false);
                InGameBtn.gameObject.SetActive(false);
            }
        }
    }

    // Update is called once per frame
    public void OnClick()
    {
        LobbyManager.Instance.JoinRoom(info);//런처스크립트 메서드로 JoinRoom 실행
    }

    public void GameInProcess(Room info)
    {
        string[] _removeProperties = new string[1]; //이미 있던 프로퍼티를 삭제하고 다시 넣어야함
        _removeProperties[0] = "isGaming";
        PhotonNetwork.RemovePlayerCustomProperties(_removeProperties);

        ExitGames.Client.Photon.Hashtable hashtable = new ExitGames.Client.Photon.Hashtable();
        hashtable.Add("isGaming", true);
        info.SetCustomProperties(hashtable);
        Debug.Log(info.Name + "is playing now!");

        Debug.Log("changing isGaming property" + info.CustomProperties["isGaming"]);
    }
}

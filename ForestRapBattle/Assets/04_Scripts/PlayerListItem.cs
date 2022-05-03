using Photon.Pun;
using Photon.Realtime;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class PlayerListItem : MonoBehaviourPunCallbacks//다른 포톤 반응 받아들이기 
{
    [SerializeField] TMP_Text text;

    Player player;//포톤 리얼타임은 Player를 선언 할 수 있게 해준다.
    
    [SerializeField] GameObject masterBadge;
    [SerializeField]
    private Button outBtn;
    [SerializeField] TMP_Text readyText;


    public static bool isReady = false;

    public static PlayerListItem Instance;//Launcher스크립트를 메서드로 사용하기 위해 선언

    void Awake()
    {
        Instance = this;//메서드로 사용
        outBtn.onClick.RemoveAllListeners();
        outBtn.onClick.AddListener(Kick);
    }

    public void SetUp(Player _player)
    {
        player = _player;
        text.text = _player.NickName;//플레이어 이름 받아서 그사람 이름이 목록에 뜨게 만들어준다. 

        Debug.Log("Player Entered Room");
        Debug.Log(player.NickName);
        Debug.Log(player.IsMasterClient);
        
        //방장 표시는 모든 플레이어에게 보이게
        masterBadge.SetActive(player.IsMasterClient);

        //내보내기는 방장일 때만 보임
        if (PhotonNetwork.IsMasterClient)
        {
            outBtn.gameObject.SetActive(!player.IsMasterClient);
        }
        
    }

    public override void OnPlayerLeftRoom(Player otherPlayer)//플레이어가 방떠났을때 호출
    {
        Debug.Log("OnPlayerLeftRoom");
        Debug.Log(player.NickName);
        Debug.Log(player.IsMasterClient);

        if (player == otherPlayer)//나간 플레이어가 나면?
        {
            Destroy(gameObject);//이름표 삭제
        }

        else // 내가 아닌 다른 사람이 나갔으면 내가 방장이 된거
        {
            Debug.Log("Master Client Changed!");

            masterBadge.SetActive(player.IsMasterClient); //방장 뱃지
            //string previous = PhotonNetwork.CurrentRoom.CustomProperties["Owner"].ToString();
            string next = player.NickName; // 로비에서 보이는 방 이름을 내 이름으로 변경

            //ExitGames.Client.Photon.Hashtable previousValue = new ExitGames.Client.Photon.Hashtable();
            //previousValue.Add("Owner", previous);

            ExitGames.Client.Photon.Hashtable setValue = new ExitGames.Client.Photon.Hashtable();
            setValue.Add("Owner", next);

            PhotonNetwork.CurrentRoom.SetCustomProperties(setValue);

            Debug.Log(PhotonNetwork.CurrentRoom.CustomProperties["Owner"]);
        }
    }

    public override void OnLeftRoom()//방 나가면 호출
    {
        Debug.Log("OnLeftRoom");
        Destroy(gameObject);//이름표 호출
    }

    private void Kick()
    {
        Player[] players = PhotonNetwork.PlayerList;

        //내보내기 클릭했을 때 모든 플레이어 중 방장이 아닌 사람을 찾아서 닉네임을 모달로 보냄
        foreach (Player player in players)
        {
            if (!player.IsMasterClient)
            {
                LobbyManager.Instance.ActivateKickModal(player.NickName);
            }
        }

        
    }

    public void KickProceed()
    {
        Player[] players = PhotonNetwork.PlayerList;

        //내보내기 클릭했을 때 모든 플레이어 중 방장이 아닌 사람을 찾아서 접속 종료시킴
        foreach (Player player in players)
        {
            if (!player.IsMasterClient)
            {
                ExitGames.Client.Photon.Hashtable hashtable = new ExitGames.Client.Photon.Hashtable();
                hashtable.Add("isKicked", true);
                player.SetCustomProperties(hashtable);
                Debug.Log(player.NickName + "is getting kicked!");
            }
        }
    }

    public override void OnPlayerPropertiesUpdate(Player targetPlayer
                     , ExitGames.Client.Photon.Hashtable changedProps)
    {
        if (targetPlayer == PhotonNetwork.LocalPlayer)
        {
            // isKicked property가 존재할경우(강퇴)
            if (changedProps["isKicked"] != null)
            {
                // 이게 true인 경우에만 진행
                if ((bool)changedProps["isKicked"])
                {
                    string[] _removeProperties = new string[1];
                    _removeProperties[0] = "isKicked";
                    PhotonNetwork.RemovePlayerCustomProperties(_removeProperties);
                    LobbyManager.Instance.LeaveRoom();
                }
            }
        }

        // isReady property가 존재할경우(레디)
        if (changedProps["isReady"] != null)
        {
            // 프로퍼티가 true이고 방장이 아닐 때
            if ((bool)changedProps["isReady"] && !player.IsMasterClient)
            {
                readyText.gameObject.SetActive(true);
            }
            // 프로퍼티가 false이고 방장이 아닐 때
            else if (!(bool)changedProps["isReady"] && !player.IsMasterClient)
            {
                readyText.gameObject.SetActive(false);
            }
        }
    }

    public void ReadyBtn()
    {

        Player[] players = PhotonNetwork.PlayerList;

        if (isReady) //레디 버튼을 눌러서 true가 됨
        {
            Debug.Log(player.NickName + "is ready for game!");

            foreach (Player player in players)
            {
                if (!player.IsMasterClient) //방장이 아니고
                {
                    if (player.CustomProperties["isReady"] == null) //레디 버튼을 최초로 누를 때 
                    {
                        //해당 플레이어에 "isReady" 프로퍼티를 true로 넣음
                        ExitGames.Client.Photon.Hashtable hashtable = new ExitGames.Client.Photon.Hashtable();
                        hashtable.Add("isReady", true);
                        player.SetCustomProperties(hashtable);
                        Debug.Log(player.NickName + "is getting ready for the first time!");
                    }

                    else //레디 -> 취소 -> 다시 레디가 된 경우
                    {
                        string[] _removeProperties = new string[1]; //이미 있던 프로퍼티를 삭제하고 다시 넣어야함
                        _removeProperties[0] = "isReady";
                        PhotonNetwork.RemovePlayerCustomProperties(_removeProperties);

                        ExitGames.Client.Photon.Hashtable hashtable = new ExitGames.Client.Photon.Hashtable();
                        hashtable.Add("isReady", true);
                        player.SetCustomProperties(hashtable);
                        Debug.Log(player.NickName + "is getting ready again!");
                    }
                        
                }
            }
        }
        else
        {
            Debug.Log(player.NickName + "is not ready for game");

            foreach (Player player in players)
            {
                if (!player.IsMasterClient)
                {
                    //레디 -> 취소 클릭했을 때 이전 프로퍼티를 삭제하고 해당 플레이어에 "isReady" 프로퍼티를 false로 넣음
                    string[] _removeProperties = new string[1]; //이미 있던 프로퍼티를 삭제하고 다시 넣어야함
                    _removeProperties[0] = "isReady";
                    PhotonNetwork.RemovePlayerCustomProperties(_removeProperties);

                    ExitGames.Client.Photon.Hashtable hashtable = new ExitGames.Client.Photon.Hashtable();
                    hashtable.Add("isReady", false);
                    player.SetCustomProperties(hashtable);
                    Debug.Log(player.NickName + "is not ready!");
                }
            }
        }
    }
}

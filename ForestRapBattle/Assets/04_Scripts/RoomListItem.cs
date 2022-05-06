using Photon.Realtime;
using System.Collections;
using System.Collections.Generic;
using TMPro;//�ؽ�Ʈ �޽� ���� ��� ���
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;

public class RoomListItem : MonoBehaviourPunCallbacks//�ٸ� ���� ���� �޾Ƶ��̱� 
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

    public static RoomListItem Instance;//��ũ��Ʈ�� �޼���� ����ϱ� ���� ����

    public void SetUp(RoomInfo _info)// ������ �޾ƿ���
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

        
        if (!_info.IsOpen) //�� �� ���� ����(full or in game)
        {
            if ((bool)_info.CustomProperties["isGaming"]) // ���� ������ �ƴϸ�
            {
                Debug.Log("room closed: in game");
                Lock.gameObject.SetActive(false);
                IsFullBtn.gameObject.SetActive(false);
                InGameBtn.gameObject.SetActive(true);
            }
            else // 2���̶� �� ��
            {
                Debug.Log("room closed: is full");
                Lock.gameObject.SetActive(false);
                IsFullBtn.gameObject.SetActive(true);
                InGameBtn.gameObject.SetActive(false);
            }
            
        }
        else // ���� ����
        {
            if ((string)_info.CustomProperties["isSecret"] == "True") // ��й�
            {
                Debug.Log("room open: secret on");
                Lock.gameObject.SetActive(true);
                IsFullBtn.gameObject.SetActive(false);
                InGameBtn.gameObject.SetActive(false);
            }
            else //���� ������
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
        LobbyManager.Instance.JoinRoom(info);//��ó��ũ��Ʈ �޼���� JoinRoom ����
    }

    public void GameInProcess(Room info)
    {
        string[] _removeProperties = new string[1]; //�̹� �ִ� ������Ƽ�� �����ϰ� �ٽ� �־����
        _removeProperties[0] = "isGaming";
        PhotonNetwork.RemovePlayerCustomProperties(_removeProperties);

        ExitGames.Client.Photon.Hashtable hashtable = new ExitGames.Client.Photon.Hashtable();
        hashtable.Add("isGaming", true);
        info.SetCustomProperties(hashtable);
        Debug.Log(info.Name + "is playing now!");

        Debug.Log("changing isGaming property" + info.CustomProperties["isGaming"]);
    }
}

using Photon.Realtime;
using System.Collections;
using System.Collections.Generic;
using TMPro;//�ؽ�Ʈ �޽� ���� ��� ���
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;

public class RoomListItem : MonoBehaviour
{
    [SerializeField] TMP_Text RoomNameText;
    [SerializeField] TMP_Text RoomOwnerText;
    [SerializeField] TMP_Text PlayerCntText;
    [SerializeField] RawImage Lock;

    // Start is called before the first frame update
    public RoomInfo info;

    public void SetUp(RoomInfo _info)// ������ �޾ƿ���
    {
        info = _info;
        RoomNameText.text = _info.Name;
        RoomOwnerText.text = (string)_info.CustomProperties["Owner"];

        int playerCount = _info.PlayerCount;
        Debug.Log(playerCount);
        Debug.Log(_info.CustomProperties["Owner"]);
        PlayerCntText.text = playerCount.ToString() + "/" + _info.MaxPlayers.ToString();

        Debug.Log("Setting up");

        if ((string)_info.CustomProperties["isSecret"] == "True")
        {
            Lock.enabled = true;
        }
        else
        {
            Lock.enabled = false;
        }
    }

    // Update is called once per frame
    public void OnClick()
    {
        LobbyManager.Instance.JoinRoom(info);//��ó��ũ��Ʈ �޼���� JoinRoom ����
    }
}

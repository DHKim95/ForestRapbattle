using Photon.Realtime;
using System.Collections;
using System.Collections.Generic;
using TMPro;//텍스트 메쉬 프로 기능 사용
using UnityEngine;
using UnityEngine.UI;

public class RoomListItem : MonoBehaviour
{
    [SerializeField] TMP_Text RoomNameText;
    [SerializeField] TMP_Text RoomOwnerText;
    [SerializeField] TMP_Text PlayerCntText;
    [SerializeField] RawImage Lock;

    // Start is called before the first frame update
    public RoomInfo info;

    public void SetUp(RoomInfo _info)// 방정보 받아오기
    {
        info = _info;
        RoomNameText.text = _info.Name;
        RoomOwnerText.text = (string)_info.CustomProperties["Owner"];

        Debug.Log("Setting up");
        Debug.Log(_info.CustomProperties["isSecret"]);

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
        //Launcher.Instance.JoinRoom(info);//런처스크립트 메서드로 JoinRoom 실행
    }
}

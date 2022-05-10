using Photon.Pun;
using Photon.Realtime;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class PlayerListItem : MonoBehaviourPunCallbacks//�ٸ� ���� ���� �޾Ƶ��̱� 
{
    [SerializeField] TMP_Text text;

    Player player;//���� ����Ÿ���� Player�� ���� �� �� �ְ� ���ش�.
    [SerializeField] GameObject masterBadge;
    [SerializeField]
    private Button outBtn;
    [SerializeField] TMP_Text readyText;


    public static bool isReady = false;

    public static PlayerListItem Instance;//��ũ��Ʈ�� �޼���� ����ϱ� ���� ����

    void Awake()
    {
        Instance = this;//�޼���� ���
        outBtn.onClick.RemoveAllListeners();
        outBtn.onClick.AddListener(Kick);
    }

    public void SetUp(Player _player)
    {
        player = _player;
        text.text = _player.NickName;//�÷��̾� �̸� �޾Ƽ� �׻�� �̸��� ��Ͽ� �߰� ������ش�. 

        Debug.Log("Player Entered Room");
        Debug.Log(player.NickName);
        Debug.Log(player.IsMasterClient);

        

        //���� ǥ�ô� ��� �÷��̾�� ���̰�
        masterBadge.SetActive(player.IsMasterClient);

        //��������� ������ ���� ����
        if (PhotonNetwork.IsMasterClient)
        {
            outBtn.gameObject.SetActive(!player.IsMasterClient);
        }
        
    }

    public override void OnPlayerLeftRoom(Player otherPlayer)//�÷��̾ �涰������ ȣ��
    {
        Debug.Log("OnPlayerLeftRoom");
        Debug.Log(player.NickName);
        Debug.Log(player.IsMasterClient);

        if (player == otherPlayer)//���� �÷��̾ ����?
        {
            Destroy(gameObject);//�̸�ǥ ����
        }

        else // ���� �ƴ� �ٸ� ����� �������� ���� ������ �Ȱ�
        {
            Debug.Log("Master Client Changed!");

            masterBadge.SetActive(player.IsMasterClient); //���� ����
            //string previous = PhotonNetwork.CurrentRoom.CustomProperties["Owner"].ToString();
            string next = player.NickName; // �κ񿡼� ���̴� �� �̸��� �� �̸����� ����

            //ExitGames.Client.Photon.Hashtable previousValue = new ExitGames.Client.Photon.Hashtable();
            //previousValue.Add("Owner", previous);

            ExitGames.Client.Photon.Hashtable setValue = new ExitGames.Client.Photon.Hashtable();
            setValue.Add("Owner", next);

            PhotonNetwork.CurrentRoom.SetCustomProperties(setValue);

            Debug.Log(PhotonNetwork.CurrentRoom.CustomProperties["Owner"]);
        }
    }

    public override void OnLeftRoom()//�� ������ ȣ��
    {
        Debug.Log("OnLeftRoom");
        Destroy(gameObject);//�̸�ǥ ȣ��
    }

    private void Kick()
    {
        Player[] players = PhotonNetwork.PlayerList;

        //�������� Ŭ������ �� ��� �÷��̾� �� ������ �ƴ� ����� ã�Ƽ� �г����� ��޷� ����
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

        //�������� Ŭ������ �� ��� �÷��̾� �� ������ �ƴ� ����� ã�Ƽ� ���� �����Ŵ
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
            // isKicked property�� �����Ұ��(����)
            if (changedProps["isKicked"] != null)
            {
                // �̰� true�� ��쿡�� ����
                if ((bool)changedProps["isKicked"])
                {
                    string[] _removeProperties = new string[1];
                    _removeProperties[0] = "isKicked";
                    PhotonNetwork.RemovePlayerCustomProperties(_removeProperties);
                    LobbyManager.Instance.LeaveRoom();
                }
            }
        }

        // isReady property�� �����Ұ��(����)
        if (changedProps["isReady"] != null)
        {
            // ������Ƽ�� true�̰� ������ �ƴ� ��
            if ((bool)changedProps["isReady"] && !player.IsMasterClient)
            {
                readyText.gameObject.SetActive(true);
            }
            // ������Ƽ�� false�̰� ������ �ƴ� ��
            else if (!(bool)changedProps["isReady"] && !player.IsMasterClient)
            {
                readyText.gameObject.SetActive(false);
            }
        }
    }

    public void ReadyBtn()
    {

        Player[] players = PhotonNetwork.PlayerList;

        if (isReady) //���� ��ư�� ������ true�� ��
        {
            Debug.Log(player.NickName + "is ready for game!");

            foreach (Player player in players)
            {
                if (!player.IsMasterClient) //������ �ƴϰ�
                {
                    if (player.CustomProperties["isReady"] == null) //���� ��ư�� ���ʷ� ���� �� 
                    {
                        //�ش� �÷��̾ "isReady" ������Ƽ�� true�� ����
                        ExitGames.Client.Photon.Hashtable hashtable = new ExitGames.Client.Photon.Hashtable();
                        hashtable.Add("isReady", true);
                        player.SetCustomProperties(hashtable);
                        Debug.Log(player.NickName + "is getting ready for the first time!");
                    }

                    else //���� -> ��� -> �ٽ� ���� �� ���
                    {
                        string[] _removeProperties = new string[1]; //�̹� �ִ� ������Ƽ�� �����ϰ� �ٽ� �־����
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
                    //���� -> ��� Ŭ������ �� ���� ������Ƽ�� �����ϰ� �ش� �÷��̾ "isReady" ������Ƽ�� false�� ����
                    string[] _removeProperties = new string[1]; //�̹� �ִ� ������Ƽ�� �����ϰ� �ٽ� �־����
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

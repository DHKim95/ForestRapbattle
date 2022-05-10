using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;//���� ��� ���
using TMPro;//�ؽ�Ʈ �޽� ���� ��� ���
using Photon.Realtime;
using System.Linq;


public class LobbyManager : MonoBehaviourPunCallbacks//�ٸ� ���� ���� �޾Ƶ��̱�
{
    [Header("Create Room References")]
    [SerializeField]
    private Button CreateRoomBtn;
    [SerializeField]
    private Button CancelRoomBtn;
    [SerializeField]
    private Button CreateConfirmBtn;
    [Space(5f)]

    [Header("Create Room Info References")]
    [SerializeField]
    private TMP_InputField RoomName;
    [SerializeField]
    private Button SecretOnBtn;
    [SerializeField]
    private Button SecretOffBtn;
    [SerializeField]
    private TMP_InputField RoomPw;
    [SerializeField]
    private GameObject CreateRoomPanel;
    [Space(5f)]

    [Header("Room List References")]
    [SerializeField] Transform roomListContent;
    [SerializeField] GameObject roomListItemPrefab;
    [Space(5f)]

    [Header("User Info References")]
    [SerializeField]
    private TMP_Text Username;
    [SerializeField] Transform userCharContent;
    [SerializeField] GameObject bearPrefab;
    [SerializeField] GameObject buffaloPrefab;
    [SerializeField] GameObject catPrefab;
    [SerializeField] GameObject chickenPrefab;
    [SerializeField] GameObject chikPrefab;
    [SerializeField] GameObject dogPrefab;
    [SerializeField] GameObject duckPrefab;
    [SerializeField] GameObject elephantPrefab;
    [SerializeField] GameObject frogPrefab;
    [SerializeField] GameObject monkeyPrefab;
    [SerializeField] GameObject pigPrefab;
    [SerializeField] GameObject rabbitPrefab;
    [SerializeField] GameObject rhinoPrefab;
    [Space(5f)]

    [Header("Game Room References")]
    [SerializeField] TMP_Text roomNameText;
    [SerializeField] Button exitBtn;
    [SerializeField] Button startBtn;
    [SerializeField] Button readyBtn;
    [SerializeField] Transform playerListContent;
    [SerializeField] GameObject bearinroomPrefab;
    [SerializeField] GameObject buffaloinroomPrefab;
    [SerializeField] GameObject catinroomPrefab;
    [SerializeField] GameObject chickeninroomPrefab;
    [SerializeField] GameObject chikinroomPrefab;
    [SerializeField] GameObject doginroomPrefab;
    [SerializeField] GameObject duckinroomPrefab;
    [SerializeField] GameObject elephantinroomPrefab;
    [SerializeField] GameObject froginroomPrefab;
    [SerializeField] GameObject monkeyinroomPrefab;
    [SerializeField] GameObject piginroomPrefab;
    [SerializeField] GameObject rabbitinroomPrefab;
    [SerializeField] GameObject rhinoinroomPrefab;
    [SerializeField] GameObject KickPlayerPanel;
    [SerializeField] TMP_Text KickPlayerText;
    [SerializeField] Button proceedKickBtn;
    [SerializeField] Button cancelKickBtn;
    [Space(5f)]

    [Header("Secret Room References")]
    [SerializeField] GameObject EnterPwPanel;
    [SerializeField] TMP_InputField enterRoomPwInput;
    [SerializeField] TMP_Text errorText;
    [SerializeField] Button confirmBtn;
    [SerializeField] Button cancelPwBtn;
    [Space(5f)]

    public static int charInt = 0;

    bool isSecret = false;

    public Color activatedColor;
    public Color deactivatedColor;

    public static LobbyManager Instance;//Launcher��ũ��Ʈ�� �޼���� ����ϱ� ���� ����

    private string targetRoomPw = "";
    private string targetRoomName = "";


    void Awake()
    {
        Instance = this;//�޼���� ���

        CreateRoomBtn.onClick.RemoveAllListeners();
        CreateRoomBtn.onClick.AddListener(ActivateModal);
        CancelRoomBtn.onClick.RemoveAllListeners();
        CancelRoomBtn.onClick.AddListener(DeactivateModal);
        SecretOnBtn.onClick.RemoveAllListeners();
        SecretOnBtn.onClick.AddListener(SecretOn);
        SecretOffBtn.onClick.RemoveAllListeners();
        SecretOffBtn.onClick.AddListener(SecretOff);
        CreateConfirmBtn.onClick.RemoveAllListeners();
        CreateConfirmBtn.onClick.AddListener(CreateRoom);

        exitBtn.onClick.RemoveAllListeners();
        exitBtn.onClick.AddListener(LeaveRoom);

        proceedKickBtn.onClick.RemoveAllListeners();
        proceedKickBtn.onClick.AddListener(Kick);

        cancelKickBtn.onClick.RemoveAllListeners();
        cancelKickBtn.onClick.AddListener(DeactivateKickModal);

        confirmBtn.onClick.RemoveAllListeners();
        confirmBtn.onClick.AddListener(CheckPw);

        cancelPwBtn.onClick.RemoveAllListeners();
        cancelPwBtn.onClick.AddListener(DeactivatePwModal);

        readyBtn.onClick.RemoveAllListeners();
        readyBtn.onClick.AddListener(Ready);

        startBtn.onClick.RemoveAllListeners();
        startBtn.onClick.AddListener(StartGame);
    }

    void Start()
    {
        Debug.Log("Connecting to Master");
        PhotonNetwork.ConnectUsingSettings();//������ ���� ������ ���� ������ ������ ����

        CreateRoomPanel.SetActive(false);
        RoomPw.interactable = false;

        string[] playerNames = new string[] { "��������", "���ֿ� �ŵ�", "���Ż�������ָ���", "�����̾���", "��ü�յ�ŷ", "���¾���������" };
        string[] tiers = new string[] { "Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond" };
        //string[] characters = new string[] { "bear", "buffalo", "cat", "chicken", "chik", "dog", "duck", "elephant", "frog", "monkey", "pig", "rabbit", "rhino" };

        int randomPlayer = UnityEngine.Random.Range(0, 6);
        int randomTier = UnityEngine.Random.Range(0, 6);
        int randomChar = UnityEngine.Random.Range(0, 13);

        PhotonNetwork.NickName = playerNames[randomPlayer] + "(" + tiers[randomTier] + ")";
        Debug.Log(PhotonNetwork.NickName); //���»�� �̸� �������� ���ںٿ��� �����ֱ�

        charInt = randomChar;

        if (charInt == 0)
        {
            Instantiate(bearPrefab, userCharContent);
        }
        else if (charInt == 1)
        {
            Instantiate(buffaloPrefab, userCharContent);
        }
        else if (charInt == 2)
        {
            Instantiate(catPrefab, userCharContent);
        }
        else if (charInt == 3)
        {
            Instantiate(chickenPrefab, userCharContent);
        }
        else if (charInt == 4)
        {
            Instantiate(chikPrefab, userCharContent);
        }
        else if (charInt == 5)
        {
            Instantiate(dogPrefab, userCharContent);
        }
        else if (charInt == 6)
        {
            Instantiate(duckPrefab, userCharContent);
        }
        else if (charInt == 7)
        {
            Instantiate(elephantPrefab, userCharContent);
        }
        else if (charInt == 8)
        {
            Instantiate(frogPrefab, userCharContent);
        }
        else if (charInt == 9)
        {
            Instantiate(monkeyPrefab, userCharContent);
        }
        else if (charInt == 10)
        {
            Instantiate(pigPrefab, userCharContent);
        }
        else if (charInt == 11)
        {
            Instantiate(rabbitPrefab, userCharContent);
        }
        else if (charInt == 12)
        {
            Instantiate(rhinoPrefab, userCharContent);
        }

        //�÷��̾� ĳ���� ������ ���� ��Ʈ��ũ�� ����
        ExitGames.Client.Photon.Hashtable playerChar = new ExitGames.Client.Photon.Hashtable();
        playerChar.Add("charInt", (int)LobbyManager.charInt);
        PhotonNetwork.SetPlayerCustomProperties(playerChar);
    }

    public override void OnConnectedToMaster()//�����ͼ����� ����� �۵���
    {
        Debug.Log("Connected to Master");
        PhotonNetwork.JoinLobby();//������ ���� ����� �κ�� ����
        PhotonNetwork.AutomaticallySyncScene = true;//�ڵ����� ��� ������� scene�� ���� �����ش�. 
    }

    public override void OnJoinedLobby()//�κ� ����� �۵�
    {
        Debug.Log("Joined Lobby");
        

        Username.text = PhotonNetwork.NickName;
    }

    private void ActivateModal()
    {
        CreateRoomPanel.SetActive(true);
    }

    private void DeactivateModal()
    {
        CreateRoomPanel.SetActive(false);
        RoomPw.interactable = false;
        RoomPw.text = "";
        RoomName.text = "";
        SecretOff();
    }

    public void ActivateKickModal(string targetName)
    {
        KickPlayerText.text = targetName + "���� ������ �������ðڽ��ϱ�?";
        KickPlayerPanel.SetActive(true);
    }

    private void DeactivateKickModal()
    {
        KickPlayerText.text = "";
        KickPlayerPanel.SetActive(false);
    }

    public void ActivatePwModal()
    {
        EnterPwPanel.SetActive(true);
    }

    private void DeactivatePwModal()
    {
        enterRoomPwInput.text = "";
        EnterPwPanel.SetActive(false);
        errorText.text = "";
    }

    private void SecretOn()
    {
        isSecret = true;

        ColorBlock OnBlock = SecretOnBtn.colors;
        ColorBlock OffBlock = SecretOffBtn.colors;

        OnBlock.normalColor = activatedColor;
        OnBlock.highlightedColor = activatedColor;
        OnBlock.pressedColor = activatedColor;
        SecretOnBtn.colors = OnBlock;

        OffBlock.normalColor = deactivatedColor;
        OffBlock.highlightedColor = deactivatedColor;
        OffBlock.pressedColor = deactivatedColor;
        SecretOffBtn.colors = OffBlock;

        RoomPw.interactable = true;
        RoomPw.Select();
    }

    private void SecretOff()
    {
        isSecret = false;
        ColorBlock OnBlock = SecretOnBtn.colors;
        ColorBlock OffBlock = SecretOffBtn.colors;

        OnBlock.normalColor = deactivatedColor;
        OnBlock.highlightedColor = deactivatedColor;
        OnBlock.pressedColor = deactivatedColor;
        SecretOnBtn.colors = OnBlock;

        OffBlock.normalColor = activatedColor;
        OffBlock.highlightedColor = activatedColor;
        OffBlock.pressedColor = activatedColor;
        SecretOffBtn.colors = OffBlock;

        RoomPw.text = "";
        RoomPw.interactable = false;
    }

    public void CreateRoom()//�游���
    {
        if (string.IsNullOrEmpty(RoomName.text))
        {
            return;//�� �̸��� ���̸� �� �ȸ������
        }

        string[] propertiesListedInLobby = new string[3];
        propertiesListedInLobby[0] = "Owner";
        propertiesListedInLobby[1] = "isSecret";
        propertiesListedInLobby[2] = "Password";

        ExitGames.Client.Photon.Hashtable openWith = new ExitGames.Client.Photon.Hashtable();
        openWith.Add("Owner", PhotonNetwork.NickName);
        openWith.Add("isSecret", isSecret.ToString());

        if (isSecret)
        {
            openWith.Add("Password", RoomPw.text);
        }

        PhotonNetwork.CreateRoom(RoomName.text, new RoomOptions
        {
            MaxPlayers = 2,
            IsVisible = true,
            IsOpen = true,
            CustomRoomProperties = openWith,
            CustomRoomPropertiesForLobby = propertiesListedInLobby
        });
        Debug.Log(openWith["Owner"]);
        Debug.Log(openWith["isSecret"]);
        Debug.Log(openWith["Password"]);
        DeactivateModal();
    }

    public override void OnRoomListUpdate(List<RoomInfo> roomList)//������ �� ����Ʈ ���
    {
        foreach (Transform trans in roomListContent)//�����ϴ� ��� roomListContent
        {
            Destroy(trans.gameObject);//�븮��Ʈ ������Ʈ�� �ɶ����� �������
        }
        for (int i = 0; i < roomList.Count; i++)//�氹����ŭ �ݺ�
        {
            if (roomList[i].RemovedFromList)//����� ���� ��� ���Ѵ�. 
                continue;
            Debug.Log("Initiating.......");
            Debug.Log(roomList[i].CustomProperties["isSecret"]);
            Debug.Log(roomList[i].CustomProperties["Owner"]);
            Instantiate(roomListItemPrefab, roomListContent).GetComponent<RoomListItem>().SetUp(roomList[i]);
            //instantiate�� prefab�� roomListContent��ġ�� ������ְ� �� �������� i��° �븮��Ʈ�� �ȴ�. 
        }
    }

    public override void OnJoinedRoom()//���� �� ���� �� �濡 ������ �۵�
    {
        Debug.Log("Joined Room");
        MenuManager.Instance.OpenMenu("Room");//�� �޴� ����

        roomNameText.text = "�� ���� : " + PhotonNetwork.CurrentRoom.Name;

        Player[] players = PhotonNetwork.PlayerList;

        foreach (Transform child in playerListContent)
        {
            Destroy(child.gameObject);
        }
        for (int i = 0; i < players.Count(); i++)
        {
            if (((int)players[i].CustomProperties["charInt"] == 0))
            {
                Instantiate(bearinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]);
            }
            else if (((int)players[i].CustomProperties["charInt"] == 1))
            {
                Instantiate(buffaloinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 2))
            {
                Instantiate(catinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 3))
            {
                Instantiate(chickeninroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 4))
            {
                Instantiate(chikinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 5))
            {
                Instantiate(doginroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 6))
            {
                Instantiate(duckinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 7))
            {
                Instantiate(elephantinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 8))
            {
                Instantiate(froginroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 9))
            {
                Instantiate(monkeyinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 10))
            {
                Instantiate(piginroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 11))
            {
                Instantiate(rabbitinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
            else if (((int)players[i].CustomProperties["charInt"] == 12))
            {
                Instantiate(rhinoinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(players[i]); ;
            }
        }
        Debug.Log(PhotonNetwork.IsMasterClient);
        startBtn.gameObject.SetActive(PhotonNetwork.IsMasterClient);
        readyBtn.gameObject.SetActive(!PhotonNetwork.IsMasterClient);
    }

    public override void OnMasterClientSwitched(Player newMasterClient)//�ٸ� �÷��̾ ������ ���� ������ �Ǿ��� ��
    {
        Debug.Log("OnMasterClientSwitched");
        startBtn.gameObject.SetActive(newMasterClient.IsMasterClient);
        readyBtn.gameObject.SetActive(!newMasterClient.IsMasterClient);
        PhotonNetwork.CurrentRoom.CustomProperties["Owner"] = newMasterClient.NickName;
    }


    public void LeaveRoom() // ����
    {
        PhotonNetwork.LeaveRoom();
        MenuManager.Instance.OpenMenu("Lobby");//�ٽ� �κ��
        
    }

    public void JoinRoom(RoomInfo info) //����
    {
        if (info.CustomProperties["Password"] != null) // ��й��� ���
        {
            ActivatePwModal();
            targetRoomName = info.Name;
            targetRoomPw = info.CustomProperties["Password"].ToString();
            Debug.Log(targetRoomName);
            Debug.Log(targetRoomPw);
        }
        else
        {
            PhotonNetwork.JoinRoom(info.Name);
            MenuManager.Instance.OpenMenu("Room");
        }
       
    }

    public override void OnPlayerEnteredRoom(Player newPlayer)//�ٸ� �÷��̾� �������� ��
    {
        if ((int)newPlayer.CustomProperties["charInt"] == 0)
        {
            Instantiate(bearinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 1)
        {
            Instantiate(buffaloinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 2)
        {
            Instantiate(catinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 3)
        {
            Instantiate(chickeninroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 4)
        {
            Instantiate(chikinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 5)
        {
            Instantiate(doginroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 6)
        {
            Instantiate(duckinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 7)
        {
            Instantiate(elephantinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 8)
        {
            Instantiate(froginroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 9)
        {
            Instantiate(monkeyinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 10)
        {
            Instantiate(piginroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 11)
        {
            Instantiate(rabbitinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
        else if ((int)newPlayer.CustomProperties["charInt"] == 12)
        {
            Instantiate(rhinoinroomPrefab, playerListContent).GetComponent<PlayerListItem>().SetUp(newPlayer);
        }
    }

    //public override void OnPlayerLeftRoom(Player otherPlayer)//�ٸ� �÷��̾� �������� ��
    //{
    //    Debug.Log("Other Player Left");
    //}

    private void Kick()
    {
        KickPlayerText.text = "";
        KickPlayerPanel.SetActive(false);
        PlayerListItem.Instance.KickProceed();
    }

    private void CheckPw()
    {
        if (enterRoomPwInput.text == targetRoomPw)
        {
            DeactivatePwModal();
            PhotonNetwork.JoinRoom(targetRoomName);
            MenuManager.Instance.OpenMenu("Room");
            //�� ���� �Ŀ� �ʱ�ȭ�ؾߵ�.....
            targetRoomPw = "";
            targetRoomName = "";
        }
        else
        {
            errorText.text = "��й�ȣ�� Ʋ���ϴ�.";
        }
    }

    private void Ready()
    {
        PlayerListItem.isReady = !PlayerListItem.isReady;
        Debug.Log("ready?" + PlayerListItem.isReady);
        PlayerListItem.Instance.ReadyBtn();
    }

    public void StartGame()
    {
        Player[] players = PhotonNetwork.PlayerList;

        foreach (Player player in players)
        {
            if (!player.IsMasterClient) //������ �ƴ� �÷��̾ ����
            {
                if (player.CustomProperties["isReady"] != null)
                {
                    if ((bool)player.CustomProperties["isReady"]) //���� ���°� true�̸�
                    {
                        Debug.Log("the other player is ready for game!");
                        PhotonNetwork.CurrentRoom.IsOpen = false; //���ӽ��� �� �ʱ�ȭ
                        Debug.Log(PhotonNetwork.CurrentRoom.IsOpen);
                        PlayerListItem.isReady = false;
                        Debug.Log(PlayerListItem.isReady);
                        //PhotonNetwork.LoadLevel("Game_temp");
                        PhotonNetwork.LoadLevel("PhotonTest");
                    }

                    else //���� ������Ƽ�� ������ false��
                    {
                        Debug.Log("the other player is not ready for game");
                    }
                }

                else //���� ������Ƽ�� ����
                {
                    Debug.Log("the other player is not ready for game");
                }
            }
        }
    }

}
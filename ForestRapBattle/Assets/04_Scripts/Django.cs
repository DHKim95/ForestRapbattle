using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using TMPro;


[RequireComponent(typeof(AudioSource))]
public class Django : MonoBehaviour
{
    [SerializeField]
    private Button PostGameDataBtn;
    [SerializeField]
    private TMP_Text InfoText;

    /*{
    "user_id" : 1,
    "player1" : 1,
    "player2" : 2,
    "win" : true,
    "lose" : false
    }*/

public void Awake()
    {
        PostGameDataBtn.onClick.RemoveAllListeners();
        PostGameDataBtn.onClick.AddListener(PostBtnClick);
    }

    public void PostBtnClick()
    {
        StartCoroutine(PostGameData());
    }

    public IEnumerator PostGameData()
    {
        WWWForm form = new WWWForm(); //임시로 만들 게임데이터(내가 1, 상대가 2이고 내가 이긴 상황)

        form.AddField("user_id", 1);
        form.AddField("player1", 1);
        form.AddField("player2", 2);
        form.AddField("win", "true");
        form.AddField("lose", "false");

        using (UnityWebRequest www = UnityWebRequest.Post("http://k6e204.p.ssafy.io:8443/api/v1/game/gameResult", form))
        {
            yield return www.SendWebRequest();
            if (www.result != UnityWebRequest.Result.Success)
            {
                InfoText.text = www.error;
                Debug.Log(www.error);
            }
            else
            {
                Debug.Log("Post Data Complete!");
                InfoText.text = "성공...!";
            }
        }
    }
}

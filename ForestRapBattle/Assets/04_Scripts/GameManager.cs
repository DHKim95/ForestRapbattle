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
        // �ð��� üũ�� ���ӽð��� �����ų� �÷��̾� �� �� �� ���� ������ ���ǹ� ����
        if (TimeCheck() || HealthCheck())
        {
            // ���� ��� ȭ�鿡 ǥ�� �� ����, �� �̵�
        }
    }

    bool TimeCheck()
    {
        // ���� �ð��� ������ ���
        if (gameTimeLimit >= gameTimer)
        {
            return true;
        }
        return false;
    }

    bool HealthCheck()
    {
        // �÷��̾� �θ��� ü���� üũ ����� ��
        //if ()
        //{
        //    return true;
        //}
        return false;
    }
}

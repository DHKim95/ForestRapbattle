using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMove : MonoBehaviour
{
    float moveSpeed = 10.0f;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {        
        float h = Input.GetAxis("Horizontal");// a,d Ȥ�� ��,�� �� �Է������� ���� �޾ƿ�        
        Vector3 dir = new Vector3(h, 0, 0);// ���� 3���� ���ͷ� ����
        dir = dir.normalized;// ������ ����ȭ
        transform.position += dir * moveSpeed * Time.deltaTime; 
    }
}

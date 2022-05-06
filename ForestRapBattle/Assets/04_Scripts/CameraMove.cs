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
        float h = Input.GetAxis("Horizontal");// a,d 혹은 ←,→ 를 입력했을때 값을 받아옴        
        Vector3 dir = new Vector3(h, 0, 0);// 값을 3차원 벡터로 생성
        dir = dir.normalized;// 벡터의 정규화
        transform.position += dir * moveSpeed * Time.deltaTime; 
    }
}

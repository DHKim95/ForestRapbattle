using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Unit1 : MonoBehaviour, IAction, IGetter
{
    private STATE uState;
    private int health;
    private int power;
    private float attackTime;
    private Transform targetTransform;

    // Start is called before the first frame update
    void Start()
    {
        uState = STATE.WALK;
        targetTransform = GameObject.Find("Castle2").transform;
        attackTime = 1.0f;
        health = 100;
    }

    // Update is called once per frame
    void Update()
    {
        Fsm();
    }

    void Fsm()
    {
        switch (uState)
        {
            case STATE.WALK:
                {
                    Walk();
                }
                break;

            case STATE.ATTACK:
                {
                    Attack();
                }
                break;

            case STATE.DEAD:
                {
                    Dead();
                }
                break;
        }
        if (health <= 0)
        {
            uState = STATE.DEAD;
        }
    }

    public void Walk()
    {
        //Vector3 rePos = targetTransform.position - transform.position;
        //transform.Translate((rePos) / 3000.0f);
        transform.LookAt(targetTransform);
        this.transform.position = Vector3.MoveTowards(transform.position, targetTransform.position, 5.0f * Time.deltaTime);
        //throw new NotImplementedException();
    }

    public void Attack()
    {
        //Time.deltaTime : 프레임 사이의 시간
        attackTime += Time.deltaTime;
        if (attackTime >= 1.0f)
        {
            //공격 애니메이션 실행하게 만들기
            attackTime = 0.0f;
        }
    }

    public void Dead()
    {
        Destroy(gameObject);
    }

    public int GetHealth()
    {
        return health;
    }
}

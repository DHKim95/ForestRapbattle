using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Unit1 : MonoBehaviour, IAction, IGetter
{
    delegate int Damage(int damage);
    private STATE uState;
    private int health;
    private int power;
    private float attackTime;
    private float moveSpeed;
    private GameObject attackTarget;
    private Transform targetTransform;
    private Damage targetDamage;
    public GameObject castleTarget; //테스트용
    private string sname;
    private string output;
    

    // Start is called before the first frame update
    void Start()
    {
        uState = STATE.WALK;
        //targetTransform = GameObject.Find("Castle2").transform;
        targetTransform = castleTarget.transform;
        attackTime = 1.0f;
        power = 10;
        health = 100;
        moveSpeed = 2.0f;
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
        this.transform.position = Vector3.MoveTowards(transform.position, targetTransform.position, moveSpeed * Time.deltaTime);
        //throw new NotImplementedException();
    }

    public void Attack()
    {
        if (targetDamage == null)
        {
            uState = STATE.WALK;
        }
        //Time.deltaTime : 프레임 사이의 시간
        attackTime += Time.deltaTime;
        if (attackTime >= 1.0f)
        {
            //공격 애니메이션 실행하게 만들기
            //Debug.Log("공격");
            int result = targetDamage(power);
            //Debug.Log(this.name + "의 공격 => " + attackTarget.name + "의 체력 : " + result);
            if (result <= 0)
            {
                targetDamage = null;
                uState = STATE.WALK;
            }
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

    public int GetDamage(int damage)
    {
        health -= damage;
        return health;
    }

    private void OnTriggerEnter(Collider other)
    {
        if(targetDamage == null)
        {
            if(other.tag != "Background" && other.tag != this.tag)
            {
                uState = STATE.ATTACK;
                attackTarget = other.gameObject;
                targetDamage = new Damage(other.GetComponent<Unit1>().GetDamage);
            }
        }
    }

    private void OnTriggerStay(Collider other)
    {
        
    }

    private void OnTriggerExit(Collider other)
    {
        
    }
}

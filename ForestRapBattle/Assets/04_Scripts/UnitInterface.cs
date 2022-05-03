using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public interface IAction
{
    void Walk();
    void Attack();
    void Dead();
}

public interface IGetter
{
    int GetHealth();
}

public enum STATE
{
    WALK,
    ATTACK,
    DEAD,
}

//public abstract class Unit : MonoBehaviour,IAction, IGetter
//{
//    protected STATE uState;
//    protected int health;
//    protected int power;
//    protected float attackTime;
//    protected Vector3 dest;

//    protected void Fsm()
//    {
//        switch (uState)
//        {
//            case STATE.WALK:
//                {
//                    Walk();
//                }
//                break;

//            case STATE.ATTACK:
//                {
//                    Attack();
//                }
//                break;

//            case STATE.DEAD:
//                {
//                    Dead();
//                }
//                break;
//        }
//        if (health <= 0)
//        {
//            uState = STATE.DEAD;
//        }
//    }

//    public abstract void Walk();    

//    public void Attack()
//    {
//        //Time.deltaTime : 프레임 사이의 시간
//        attackTime += Time.deltaTime;
//        if (attackTime >= 1.0f)
//        {
//            //공격 애니메이션 실행하게 만들기
//            attackTime = 0.0f;
//        }
//    }

//    public abstract void Dead();

//    public int GetHealth()
//    {
//        return health;
//    }

//}


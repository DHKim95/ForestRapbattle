using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UnitGenerator : MonoBehaviour
{
    public GameObject tmpPrefab;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void gen()
    {
        Instantiate(tmpPrefab, transform.position + new Vector3(0,0.5f,0), Quaternion.identity);
    }
}

import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function poketIndex() {
  const [data, setData] = useState([]);
  const [popup, setPopUp] = useState(false);
  const [key, setKey] = useState();
  const router = useRouter();
  const {query} = useRouter();

  useEffect(()=> {
    dataGet();
  },[])

  function dataGet() {
    axios.get("/api/poke").then(res => {
      let num = res;

      num.data.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
      })
      setData(num)
    })
  }

  const home = () => {
    router.push({
      pathname: "/main",
      query: query
    });
  }

  const popupCon = (id) => {
    setPopUp(!popup);
    setKey(id)
  }


  const abc = () => {
    //키 값 db에 보내면 끝
    axios.put(`/api/poke`, {key}, query)
  }

  return (
    <>
    <div className={popup ? "popup on" : "popup"}>
      <div>
        <p>구매하시겠습니까?</p>
        <div className="choice">
          <p onClick={()=>abc()}>예</p>
          <p onClick={()=>popupCon()}>아니오</p>
        </div>
      </div>
    </div>
    <div className={popup ? "layout blur" : "layout"}>
    <div className="home">
      <p onClick={home}>홈으로 가기</p>
    </div>
      {
        data.data && data.data.map((obj, key) => {
          return <div key={obj.id}>
            <figure>
              <img src={`${obj.card_url}`} alt="이미지"/>
              <figcaption>
                <p onClick={()=>popupCon(obj.id)}>구매하기</p>
              </figcaption>
            </figure>
          </div>
        })
      }
    </div>
    </>
  )
}

export default poketIndex
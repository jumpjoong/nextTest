import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function poketIndex() {
  const [data, setData] = useState([]);
  const [popup, setPopUp] = useState(false)
  const router = useRouter();
  const {query} = useRouter();

  useEffect(()=> {
    dataGet();
  },[])

  function dataGet() {
    axios.get("/api/poke").then(res => {
      setData(res)
    })
  }

  const home = () => {
    router.push({
      pathname: "/main",
      query: query
    });
  }

  const popupCon = (key) => {
    setPopUp(!popup);
    abc(key)
  }

  function abc () {

  }

  // const buyPoke = (key) => {
  //   console.log(e)
  // }
  ///popup창 컴포넌트로 만들고 구매하기 눌렀을 시 프롭스로 key값 넘기거나 query로 넘겨서 데이터 받고 yes 누르면 axios.put 실행과 키값 넘김
  return (
    <>
    <div className={popup ? "popup on" : "popup"}>
      <div>
        <p>구매하시겠습니까?</p>
        <div className="choice">
          <p onClick={(y)=>abc(y)}>예</p>
          <p onClick={(n)=>abc(n)}>아니오</p>
        </div>
      </div>
    </div>
    <div className={popup ? "layout blur" : "layout"}>
    <div className="home">
      <p onClick={home}>홈으로 가기</p>
    </div>
      {
        data.data && data.data.map((obj, key) => {
          return <div key={key}>
            <figure>
              <img src={`${obj.card_url}`} alt="이미지"/>
              <figcaption>
                <p onClick={()=>popupCon(key)}>구매하기</p>
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
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function poketIndex() {
  const {query} = useRouter();
  //data는 이미지
  const [data, setData] = useState([]);
  const [popup, setPopUp] = useState(false);
  const init = {id: query.id, name:query.name, have_poke_id: "", credit:""};
  const [initData, setInit] = useState(init);
  const router = useRouter();
  const [list, setList] = useState([]);
  

  useEffect(()=> {
    dataGet();
    dataList();
  },[query])

  //포켓몬 순서대로 정렬
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
  
  //api/poke에 query값 보내고 cus_poke에 have_poke_id를 가져와서 obj.id와 query.id가 일치하면 setlist에 저장
  function dataList() {
    axios.put("/api/poke", query).then(res=> {
      // let arr = [];
      // res.data.map((obj)=>{
      //   arr.push(obj.have_poke_id);
      // })
      // setList(res.test);
      res.data.map ((obj)=> {
        try {
          if(obj.id == query.id) {
            setList(obj.test)
          }
        }catch(err){
          console.log(err)
        }
      })
    })
  }
  
  const home = () => {
    router.push({
      pathname: "/main",
      query: query
    });
  }
  //구매하기 누르면 팝업창 띄우고 initData에 클릭한 poketmon_id가 들어감
  const popupCon = (id) => {
    if (list.includes(id.id)) {
      alert("구매하신 제품입니다.")
    } else {
      setPopUp(!popup);
      setInit({...initData, id:query.id, name:query.name, have_poke_id:JSON.stringify(id), credit: id.credit})
    }
  }

  //아니오 버튼 누를 시 팝업 창 사라짐
  const no = () => {
    setPopUp(!popup);
  } 
  //예 버튼을 누르면 구매하기 누른값을 넘기고 0.5초 후에 새로고침
  const yes = () => {
    axios.post(`/api/poke`, initData);
    setTimeout(() => {
      redCard();
    }, 300);
  }

  //alert 창 띄우고 창 새로고침
  function redCard() {
    alert('구매완료!');
    location.reload();
  }

  return (
    <>
    <div className={popup ? "popup on" : "popup"}>
      <div>
        <p>구매하시겠습니까?</p>
        <div className="choice">
          <p onClick={()=>yes()}>예</p>
          <p onClick={()=>no()}>아니오</p>
        </div>
      </div>
    </div>
    <div className={popup ? "layout blur" : "layout"}>
    <div className="home">
      <p onClick={home}>홈으로 가기</p>
    </div>
      {
        data.data && data.data.map((obj, key) => {
          if(list.includes(obj.id)){
            return <div key={obj.id}>
            <figure>
              <img src={`${obj.card_url}`} alt="이미지" className="have"/>
              <figcaption>
                <p onClick={()=>popupCon(obj)}>구매하기</p>
              </figcaption>
            </figure>
          </div>
          } else {
            return <div key={obj.id}>
            <figure>
              <img src={`${obj.card_url}`} alt="이미지"/>
              <figcaption>
                <p onClick={(e)=>popupCon(obj,e)}>구매하기</p>
              </figcaption>
            </figure>
          </div>
          }
        })
      }
    </div>
    </>
  )
}

export default poketIndex
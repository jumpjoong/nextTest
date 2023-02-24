import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Login() {
  const init = { email: "", password: "" };
  const [value, setValue] = useState(init);
  const [data, setData] = useState();
  const router = useRouter();

  //렌더링 될 때 마다 db에 있는 custumer(개인정보) 전부 불러옴
  useEffect(()=>{
    axios.get(`/api/loginCheck`).then(res => {
      setData(res.data);
    });
  },[])
  //인풋값 받아오기
  const change = e => {
    let t = e.target;
    setValue({ ...value, [t.name]: t.value });
  };
  //custumer == data (개인정보)를 전부 맵 돌려서 if문으로 비교함
  const check = e => {
    e.preventDefault();
    data.map((obj) => {
      if(obj.email === value.email && obj.password === value.password){
        router.push({
          pathname: "/main",
          query: obj
        })
      }
      if (obj.email !== value.email && obj.password !== value.password){
        alert('다시로그인하게요');
      }
    })
  };
  return (
    <div>
      <form onSubmit={check}>
        <input
          onChange={change}
          name="email"
          type="email"
          placeholder="아이디"
        />
        <input
          onChange={change}
          name="password"
          type="password"
          placeholder="비밀번호"
        />
        <input type="submit" value="로그인" />
      </form>
      
    </div>
  );
}

export default Login;

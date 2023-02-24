import axios from "axios";
import {useRouter } from "next/router";
import React, { useState } from "react";

function Register() {
  const init = {  name: "", email: "", password: "" };
  const [value, setValue] = useState(init);
  const router = useRouter();
  //인풋값 받아오기
  const change = (e) => {
    let t = e.target;
    setValue({...value, [t.name]: t.value});
  }
  //api/index로 인풋값 넘기고 메인 페이지로 이동
  const send = (e) => {
    e.preventDefault();
    axios.post(`/api/`, {...value});
    router.push("/");
  }
  return (
    <div>
      <form onSubmit={send}>
        <input name="name" type="text" onChange={change} placeholder="ID" />
        <input name="email" type="email" onChange={change} placeholder="이멜" />
        <input name="password" onChange={change} placeholder="비번" type="password" />
        <input type="submit" value="제출" />
      </form>
    </div>
  );
}

export default Register;





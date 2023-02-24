import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Write() {
  const {query} = useRouter();
  const router = useRouter();
  const init = {name : "", detail: ""};
  const [value, setValue] = useState(init);

  
  //글내용 
  const change = (e) => {
    let t = e.target;
    setValue({...value, [t.name]: t.value});
  };

  //보내기
  const send = (e) => {
    e.preventDefault();
    console.log(value);
    axios.post(`/api/writeSend`, {...value, query});
    router.push({
      pathname: '/main',
      query: query
    });
  }
  return (
    <div>
      <form onSubmit={send}>
        <input name="detail" onChange={change} placeholder="글을 입력하세요" text="text" />
        <input type="submit" value="제출하기"/>
      </form>
    </div>
  );
};

export default Write;

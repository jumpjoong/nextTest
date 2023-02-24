import { useRouter } from "next/router";
import React, { useEffect } from "react";

function List() {
  const router = useRouter();
  
  //회원가입 페이지로 넘어가기
  const reg = () => {
    router.push("/register");
  };
  //로그인 페이지 넘어가기
  const login = (e) => {
    e.preventDefault();
    router.push("/login");
  }
  return (
    <>
    <div>
      <button onClick={reg} >회원가입</button>
      <button onClick={login} >로그인</button>
    </div>
    <div>
      
    </div>
    </>
  );
}

export default List;

import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Main() {
  const router = useRouter();
  //query에 로그인 정보가 있음
  const {query} = useRouter();
  const [post, setPost] = useState();

  useEffect(()=> {
    axios.get(`/api/writeSend`).then(res=> {
      setPost(res.data);
    })
  }, [])
  //글쓰기 버튼 누르면 query로 로그인 정보 넘기기
  const write = () => {
    router.push({
      pathname: "/write",
      query: query
    });
  };
  const subTitle = () => {
    
  }
  const poketmon = () => {
    router.push({
      pathname: "/poketIndex",
      query: query
    });
  }
  const logOut = () => {
    router.push("/")
  }
  return (
    <>
    <div>
    <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {
            post && post.map((obj, key)=> {
              return <tr key={key}>
                <td>{obj.post_key}</td>
                <td onClick={()=>subTitle(obj)}>{obj.detail}</td>
                <td>{obj.name}</td>
              </tr>
            })
          }
        </tbody>
      </table>
      <button onClick={write}>글쓰기</button>
      <button onClick={poketmon}>도감 페이지</button>
      <button onClick={logOut}>로그아웃</button>
    </div>
    </>
  )
}

export default Main
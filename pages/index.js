import HeadMeta from "../component/headMeta";
import Layout from "../component/layout";
import List from "../component/list";
import axios from "axios";

export default function Home( {data, post} ) {
  // console.log(data2)
  return (
    <>
      <Layout>
        <HeadMeta />
        <List data={data} post={post}/>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`http://localhost:3000/api/`);
  const data = await res.data;
  const res2 = await axios.get(`http://localhost:3000/api/writeSend`);
  const post = await res2.data;
  return { props:  {data, post}  };
}

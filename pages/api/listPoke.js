import { executeQuery } from "./db";

const handler = async (req, res) => {
  const { method, body } = req;
  // console.log(method, body)
  // DESC 내림차순
  // ASC 오름차순
  // let data = await executeQuery("insert into test_table (name, email, password) value (?,?,?)", ["김김김", "김김@김김김", "2023"]);
  // let data = await executeQuery("update test_table set name=? where id=?", ["이이이", 2]);
  // let data = await executeQuery("delete from test_table where id=?", 3);


  //포켓몬 db 불러오기
  const dataGet = async () => {
    try {
      let data = await executeQuery(
        "select * from cus_poke order by id DESC",
        // "select *"
        []
        );
        res.json(data);
    } catch (err) {
      res.send(err);
    }
  };

  // const dataPost = async () => {
  //   try {
  //     let data = await executeQuery(
  //       "insert into cus_poke (id, have_poke) value (?,?)",
  //       [body.id, body.have_poke_id]
  //       );
  //       res.json(data);
  //   } catch (err) {
  //     res.send(err);
  //   }
  // };

  // 포켓몬 id값 받아와서 custumer테이블 have_poke_id에 포켓몬id값 추가
  // const dataPut = async () => {
  //   try {
  //     let data = await executeQuery(
  //       "update custumer set have_poke_id=? where id=?",
  //       [body.have_poke_id, body.id]
  //       );
  //       res.json(data);
  //   } catch (err) {
  //     res.send(err);
  //   }
  // };

  switch (method) {
    case "GET":
      dataGet();
      break;
    // case "POST":
    // dataPost();
    //   break;
    // case "PUT":
    //   dataPut();
    //   break;
  }
};

export default handler;

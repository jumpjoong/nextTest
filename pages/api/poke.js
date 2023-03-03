import { executeQuery } from "./db";

const handler = async (req, res) => {
  const { method, body } = req;
  // DESC 내림차순
  // ASC 오름차순
  // let data = await executeQuery("insert into test_table (name, email, password) value (?,?,?)", ["김김김", "김김@김김김", "2023"]);
  // let data = await executeQuery("update test_table set name=? where id=?", ["이이이", 2]);
  // let data = await executeQuery("delete from test_table where id=?", 3);


  //포켓몬 db 불러오기
  const dataGet = async () => {
    try {
      let data = await executeQuery(
        "select * from poke_table order by id DESC",
        []
        );
        res.json(data);
        // dataSort();
    } catch (err) {
      res.send(err);
    }
  };

  const dataPost = async () => {
    try {
      let data = await executeQuery(
        "insert into cus_poke (id, name, have_poke_id) value (?,?,?)",
        [body.id, body.name, body.have_poke_id]
        );
      // await executeQuery(
      //   "update custumer set credit=credit-1 where id=?",
      //   [body.id]
      // );
        res.json(data);
    } catch (err) {
      res.send(err);
    }
  };

  //db cus_poke 테이블에 have_poke_id 컬럼에 숫자 합치고 겹치는 숫자는 하나만 보이게
  const  dataPut = async () => {
    try {
      let data = await executeQuery(
        "select id,name, group_concat(have_poke_id)as test from cus_poke group by name",
        // "select have_poke_id from cus_poke where id = ?",
        // [body.id]
      );
      res.json(data)
    } catch (err) {
      res.send(err);
    }
  }

  switch (method) {
    case "GET":
      dataGet();
      break;
    case "POST":
      dataPost();
      break;
    case "PUT":
      dataPut();
      break;
    case "DELETE":
      dataDelete();
  }
};

export default handler;

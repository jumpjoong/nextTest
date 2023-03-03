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
        "SELECT * FROM custumer"
        );
        res.json(data);
    } catch (err) {
      res.send(err);
    }
  };

  switch (method) {
    case "GET":
      dataGet();
      break;
  }
}

export default handler;
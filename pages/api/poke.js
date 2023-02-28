import { executeQuery } from "./db";

const handler = async (req, res) => {
  const { method, body } = req;
  // DESC 내림차순
  // ASC 오름차순
  // let data = await executeQuery("insert into test_table (name, email, password) value (?,?,?)", ["김김김", "김김@김김김", "2023"]);
  // let data = await executeQuery("update test_table set name=? where id=?", ["이이이", 2]);
  // let data = await executeQuery("delete from test_table where id=?", 3);

  const dataGet = async () => {
    try {
      let data = await executeQuery(
        "select * from poke_table order by id DESC",
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
  //       "insert into custumer (name, email, password) value (?,?,?)",
  //       [body.name, body.email, body.password]
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
    //   dataPost();
    //   break;
  }
};

export default handler;

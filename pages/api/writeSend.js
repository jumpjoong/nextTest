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
        "select * from post order by post_key DESC",
        []
      );
      res.json(data);
    } catch (err) {
      res.send(err);
    }
  };
  const dataPost = async () => {
    try {
      let data = await executeQuery(
        "insert into post (name, detail) value (?,?)",
        [body.query.name, body.detail]
      );
      res.json(data);

      let data1 = await executeQuery(
        "update custumer set credit=credit+1 where id=?",
        [body.query.id]
      ).then(res => {
        res.json(data1);
      });
    } 
    catch (err) {
      res.send(err);
    }
  };
  const dataPut = async () => {
    try {
      let data = await executeQuery(
        "update custumer set credit=credit+10 where id=?",
        [body.query.id]
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
    case "POST":
      dataPost();
      break;
    case "PUT":
      dataPut();
      break;
  }
};

export default handler;

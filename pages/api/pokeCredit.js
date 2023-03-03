import { executeQuery } from './db';

const handler = async (req, res) => {
  const { method, body } = req 

  const dataPut = async () => {
    try {
      await executeQuery(
        "update custumer set credit = credit-? where id=?",
        [body.credit, body.id]
      );
    } catch (err) {
      res.send(err);
    }
  };


  switch (method) {
    // case "GET":
    //   dataGet();
    //   break;
    // case "POST":
    //   dataPost();
    //   break;
    case "PUT":
      dataPut();
      break;
  }
}

export default handler;
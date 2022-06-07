import axios from "axios";
import nc from "next-connect";
import { isAuth } from "../../../../lib/auth";
import { client } from "../../../../lib/client";

const handler = nc();

handler.use(isAuth);

handler.get(async (req, res) => {
  const order = await client.fetch(`*[_type == 'order' && _id == $id][0]`, {
    id: req.query.id,
  });
  res.send(order);

});

export default handler;

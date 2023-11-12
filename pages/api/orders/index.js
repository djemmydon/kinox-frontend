import axios from "axios";
import nc from "next-connect";
import { isAuth } from "../../../lib/auth";
import { SanityClient } from "sanity";
import { createClient } from "next-sanity"; 

const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
  const projectId = "jbcyg7kh";
  // console.log(req.userInfo?._id, "uhweihuehihuihfueh");

  const sanity = {
    projectId: "jbcyg7kh",
    dataset: "production",
    token:
      "sk9HrFrIzduRTcbFyEjKbJXb7TA2lYp4EbUSPOapRq18Fys3QKxbcjdwEWfv8NWITtymnkHL1SHfN95gWgBrpSBtSHRaLqHv6J4BDnwDdFXbhjb8N8QpGlyveYa3B9THiZhRFrAAFKBFAxNQhj154L5zQMh5jnCTaNLeuTBssa2ZtvfVhyUV",
  };

  const clients = createClient(sanity);

  // console.log(req.body.userInfo, "uhweihuehihuihfueh");
  const order = await clients.create({
    _type: "order",
    ...req.body,
    user: {
      _type: "reference",
      _ref: req.body.userId,
    },
  });

  res.status(201).send(order);
});

export default handler;

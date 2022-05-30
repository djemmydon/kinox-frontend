import nc from "next-connect";
import { client } from "../../../lib/client";
import bcrypt from "bcryptjs";
import { signToken } from "../../../lib/auth";
import axios from "axios";

const handler = nc();

handler.post(async (req, res) => {
  const projectId = "jbcyg7kh";
  const dataset = "production";
  const tokenWithAccess =
    "sk5JHFPaa8OK0GVfzEMv8bJwnBj1Mw5cjipg4rHsdR0WxbLXyBae73FL89nuER7fsKaNilcQAFxlxT6lx2AX4FydDIIpStVjzP9XOO4Ib5FATFcMhkE7DiSGjatH7m7bQ8N5XC4gZjNqvjHKzb8fYY0TaW6VbcubQ9widDBbqIWRCVeZOH8h";

  const createMutation = [
    {
      create: {
        _type: "user",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
      },
    },
  ];


  const users = await client.fetch(`*[_type == 'user' && email == $email] [0]  `, {
    email: req.body.email,
  });

  if(users) {
     return res.status(401).send({message: "Email already exist"})
  }
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutation },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithAccess}`,
      },
    }
  );

  const userId = data.results[0].id;
  const user = {
    _id: userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    isAdmin: false,
  };

  const token = signToken(user);
  res.send({...user, token});
});

export default handler;

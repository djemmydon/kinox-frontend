import axios from "axios";
import nc from "next-connect";
import { isAuth } from "../../../lib/auth";

const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
  const projectId = "jbcyg7kh";
  const dataset = "production";
  const tokenWithAccess =
    "sk5JHFPaa8OK0GVfzEMv8bJwnBj1Mw5cjipg4rHsdR0WxbLXyBae73FL89nuER7fsKaNilcQAFxlxT6lx2AX4FydDIIpStVjzP9XOO4Ib5FATFcMhkE7DiSGjatH7m7bQ8N5XC4gZjNqvjHKzb8fYY0TaW6VbcubQ9widDBbqIWRCVeZOH8h";

  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    {
      mutations: [
        {
          create: {
            _type: "order",
            createdAt: new Date().toISOString(),
            ...req.body,
            firstName: req.user.firstName,
            user: {
              _type: "reference",
              _ref: req.user._id,
            },
          },
        },
      ],
    },
    {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${tokenWithAccess}`,
      },
    }
  );

  res.status(201).send(data.results[0].id);
 
});

export default handler;

import nc from "next-connect";
import { client } from "../../../lib/client";
import bcrypt from "bcryptjs";
import { signToken } from "../../../lib/auth";

const handler = nc();

handler.post(async (req, res) => {
  const user = await client.fetch(
    `*[_type == 'user' && email == $email] [0]  `,
    {
      email: req.body.email,
    }
  );

  if (user && bcrypt.compareSync(req.body.password, user?.password)) {
    const token = signToken({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      influencer: user.influencer,
      coupon: user.coupon,
    });
    res.send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      coupon: user.coupon,
      influencer: user.influencer,
      token,
    });
  } else {
    res.status(401).send({ message: "Invalid Email and password." });
  }
});

export default handler;

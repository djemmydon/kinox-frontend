import axios from "axios";
import nc from "next-connect";
import { isAuth } from "../../../lib/auth";

const handler = nc();

handler.use(isAuth);

handler.get(async (req, post) => {
    res.send(process.env.TOKEN_PAYSTACK)
})

export default handler
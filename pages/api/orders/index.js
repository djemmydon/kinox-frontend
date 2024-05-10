import nc from "next-connect";
import { isAuth } from "../../../lib/auth";
import { createClient } from "next-sanity";
import { transporter } from "../../../lib/nodemailer";

const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
  const sanity = {
    projectId: "jbcyg7kh",
    dataset: "production",
    token:
      "sk9HrFrIzduRTcbFyEjKbJXb7TA2lYp4EbUSPOapRq18Fys3QKxbcjdwEWfv8NWITtymnkHL1SHfN95gWgBrpSBtSHRaLqHv6J4BDnwDdFXbhjb8N8QpGlyveYa3B9THiZhRFrAAFKBFAxNQhj154L5zQMh5jnCTaNLeuTBssa2ZtvfVhyUV",
  };

  const clients = createClient(sanity);

  // console.log(req.body.userInfo, "uhweihuehihuihfueh");

  const daam = [
    {
      name: "noble",
      age: 10,
    },

    {
      name: "emeka",
      age: 25,
    },

    {
      name: "Viv",
      age: 12,
    },
  ];

  const order = await clients.create({
    _type: "order",
    ...req.body,
    user: {
      _type: "reference",
      _ref: req.body.userId,
    },
  });

  const onRegisterTemplate = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        /* Add your custom styles here */
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .header {
          background-color: #5e0079;
          padding: 15px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .header h1 {
          margin: 0;
          color: #333;
          font-size:1rem;
          color:black;
        }
        .content {
          padding: 15px;
        }
        .cta-button {
          display: inline-block;
          margin-top: 15px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
      <div>
      </div>
        <div class="header">
          <h1 style="color:#fff;">Kinox Apparel</h1>
        </div>
        <div class="content">
          <div> Hi,<br />

          <p>Your has been successfully initiated and is now in process <p/> <br />
          <h3> Order Details: <h3/> <br />
          <h4>Items Ordered: <h4/>
          
          <br />
          <ul>
          ${req.body.orderItems.map(
            (item) =>
              ` <li>
              ${item.name} * ${item.quantity}
            </li>`
          )}
          
  </ul>
  <br />

                   <h3>Total Amount:30000 <h3/> <br />

          <p>Track your  Order</p>
          <a href="https://www.kinoxoriginal.com" style="color:#fff;" class="cta-button">Trade Order</a>
          <p> Thank you for choosing Kinox. We appreciate your business and look forward to delivering your products promptly. <p/> <br />

        </div>
      </div>
    </body>
  </html>
`;
  const admin = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Add your custom styles here */
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .header {
        background-color: #5e0079;
        padding: 15px;
        text-align: center;
        border-radius: 5px 5px 0 0;
      }
      .header h1 {
        margin: 0;
        color: #333;
        font-size:1rem;
        color:black;
      }
      .content {
        padding: 15px;
      }
      .cta-button {
        display: inline-block;
        margin-top: 15px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
    <div>
    </div>
      <div class="header">
        <h1 style="color:#fff;">Kinox Apparel</h1>
      </div>
      <div class="content">
        <div> Hi,<br />

        <p>We're excited to inform you that a new order has been placed on your website <p/> <br />
     

      </div>
    </div>
  </body>
</html>
`;

  await transporter.sendMail({
    from: "kinoxapparel@gmail.com",
    to: req.body.email,
    subject: "You have new Order",
    html: onRegisterTemplate,
  });

  await transporter.sendMail({
    from: "kinoxapparel@gmail.com",
    to: "kinoxapparel@gmail.com",
    subject: "You have new Order",
    html: admin,
  });

  res.status(201).send(order);
});

export default handler;

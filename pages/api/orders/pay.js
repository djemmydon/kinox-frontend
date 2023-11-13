import nc from "next-connect";
import { createClient } from "next-sanity";
import { transporter } from "../../../lib/nodemailer";

const handler = nc();

handler.put(async (req, res) => {
  const sanity = {
    projectId: "jbcyg7kh",
    dataset: "production",
    token:
      "sk9HrFrIzduRTcbFyEjKbJXb7TA2lYp4EbUSPOapRq18Fys3QKxbcjdwEWfv8NWITtymnkHL1SHfN95gWgBrpSBtSHRaLqHv6J4BDnwDdFXbhjb8N8QpGlyveYa3B9THiZhRFrAAFKBFAxNQhj154L5zQMh5jnCTaNLeuTBssa2ZtvfVhyUV",
  };

  const clients = createClient(sanity);

  console.log(req.body.id);

  const order = clients
    .patch(req.body.id)
    .set({
      isPaid: true,
    })
    .commit();

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

          <p>Your payment for order #${req.body.orderId} has been received successfully.<p/> <br />
          <h3> Order Details: <h3/> <br />
  <br />
  <h4>Amount:$${req.body.price} <h4/>
<br />
<h4>Order Id:${req.body.orderId} <h4/>
<br />

        

          <p>We're processing your order and will notify you once it ships. Thank you for shopping with us!</p>
          <a href="https://www.kinoxoriginal.com/user/order/${orderId}" style="color:#fff;" class="cta-button">Trade Order</a>
          <p> Thank you for choosing Kinox. We appreciate your business and look forward to delivering your products promptly. <p/> <br />

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

  res.send({ message: "Order Successfully", order });
});

export default handler;

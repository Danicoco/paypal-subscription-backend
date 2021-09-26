import { RequestHandler, Request, Response } from 'express';
import paypal from 'paypal-rest-sdk';

paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPALCLIENT || "",
  'client_secret': process.env.PAYPALSECRET || ""
});

// const webhookID = "74F20667KF166590H"

paypal.notification.webhookEventType.list(function (error, webhookEventTypes) {
  if (error) {
      throw error;
  } else {
      console.log("List webhookEventTypes Response");
      console.log(webhookEventTypes);
  }
});

export const paypalWebhook: RequestHandler = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    return res.status(200).json({
      data: "Data received"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
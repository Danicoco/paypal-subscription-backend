import { RequestHandler, Request, Response } from 'express';
import { Plan, ErrorLog } from '../models';


export const paypalWebhook: RequestHandler = async (req: Request, res: Response) => {
  const { event_type } = req.body;
  try {
    //get customer/user id
    //this was added to PayPal smart subscription button
    //custom customer informatin can be found in resource object
    const custom_id = req.body.resource.custom_id;
    // get price_id to know which plan the user subscribe to
    const plan_Id = req.body.resource.plan_id;
    //get current subscription id
    const subscriptionId = req.body.resource.id;
    if (event_type === "BILLING.SUBSCRIPTION.ACTIVATED") {
      const plan = await Plan.findOne().where('user.id').equals(custom_id);
      if (!plan || plan === null) return;

      if (plan_Id === process.env.SILVERPLANID) {
        //update plan status
        const update = { type: "silver", status: "active", subscriptionId, price_id: plan_Id };
        await Plan.updateOne({ _id: plan._id }, update, { new: true });
        return;
      }
      
      if (plan_Id === process.env.GOLDPLANID) {
        //update plan status
        const update = { type: "gold", status: "active", subscriptionId, price_id: plan_Id };
        await Plan.updateOne({ _id: plan._id }, update, { new: true });
        return;
      }

    }

    if (event_type === "BILLING.SUBSCRIPTION.CANCELLED") {
      const plan = await Plan.findOne().where('user.id').equals(custom_id);
      if (!plan || plan === null) return;

      //update plan status
      const update = { type: "none", status: "cancel", subscriptionId, price_id: plan_Id };
      await Plan.updateOne({ _id: plan._id }, update, { new: true });
      return;

    }

    if (event_type === "BILLING.SUBSCRIPTION.EXPIRED") {
      const plan = await Plan.findOne().where('user.id').equals(custom_id);
      if (!plan || plan === null) return;

      //update plan status
      const update = { type: "none", status: "expired", subscriptionId, price_id: plan_Id };
      await Plan.updateOne({ _id: plan._id }, update, { new: true });
      return;

    }

    //you can listen to other types of event_type
    //as your app needs
    return res.status(200).json({
      data: "Data received"
    });
  } catch (error: any) {
    const new_errorlog = await new ErrorLog({ type: "subscription error", message: error.message });
    await new_errorlog.save();
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
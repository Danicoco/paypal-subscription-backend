import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IPlan extends Document {
  type: string;
  status: string;
  stripeId: string;
  subscriptionId: string;
  priceId: string;
  product: string;
  invoiceId: string;
  createdAt?: Date;
  url: string;
  user: {
    id: ObjectId;
    email: string;
  }
}

const PlanSchema = new Schema({
  type: { //trial, silver, gold and platinum
    type: String 
  },
  status: {
    type: String
  },
  stripeId: {
    type: String
  },
  subscriptionId: {
    type: String
  },
  priceId: {
    type: String
  },
  invoiceId: {
    type: String
  },
  product: {
    type: String
  },
  url: {
    type: String
  },
  user: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    email: String
  } //associate user to plan
});

PlanSchema.set('timestamps', true);

const Plan: Model<IPlan> = model('Plan', PlanSchema);

export default Plan;
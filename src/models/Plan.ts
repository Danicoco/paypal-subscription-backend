import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IPlan extends Document {
  type: string;
  status: string;
  subscriptionId: string;
  priceId: string;
  product: string;
  createdAt?: Date;
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
  subscriptionId: {
    type: String
  },
  priceId: {
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
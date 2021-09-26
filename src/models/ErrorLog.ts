import { model, Schema, Model, Document } from 'mongoose';

interface IErrorLog extends Document {
  type: string;
  message: string;
}

const ErrorLogSchema = new Schema({
  type: { //subscription error and others
    type: String 
  },
  message: {
    type: String
  }
});

ErrorLogSchema.set('timestamps', true);

const ErrorLog: Model<IErrorLog> = model('ErrorLog', ErrorLogSchema);

export default ErrorLog;
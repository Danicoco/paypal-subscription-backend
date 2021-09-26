import { RequestHandler, Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser: RequestHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne().where('email').equals(email);
    if (user) return res.status(400).json({
      success: false,
      message: "You already have an account. Kindly login"
    })
    
    //validate input on the server too. Will be skipping that for this project

    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    //create new user
    const new_user = await new User({ name, email, password: hash });
    
    //create plan for user - Trial plan by default
    // const new_plan = await new Plan({ type: 'trial', status: 'incomplete', stripeId: customer.id });
    // new_plan.user.id = new_user._id;
    // new_plan.user.email = new_user.email;
    // await new_plan.save();
    await new_user.save();

    return res.status(200).json({
      success: true,
      data: 'New user successfully created'
    });
    
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export const getUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const user = await User.findOne().where('_id').equals(id).select('-password');
    if (!user || user === null) return res.status(401).json({
      success: false,
      message: "Appears your session have expired. Please login again"
    });

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export const allowLogin: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne().where('email').equals(email);
    if (!user || user === null) return res.status(401).json({
      success: false,
      message: "Invalid combination of email/password"
    });

    //compare password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch === false) return res.status(400).json({
      success: false,
      message: "Invalid combination of email/password"
    });

    const token = await jwt.sign({ id: user._id }, process.env.JWTSEC || "", { expiresIn: 60 * 60 });  //token expires in 1 hour
    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
        }
      }
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export const productAccess: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const user = await User.findOne().where('_id').equals(id);
    if (!user || user === null) return res.status(401).json({
      success: false,
      message: "Appears your session expires. Please login again"
    });
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
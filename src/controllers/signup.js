import Signupschema from "../models/auth/signupschema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import lookupuser from "../models/auth/lookupuser.js";
import signupm from "../models/auth/signup.js";

dotenv.config({ path: "./.env" });

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    throw err;
  }
};

export default async function signup(rq, rs) {
  const { user, password, email } = rq.body;
  try {
    const lookup = await lookupuser(email);
    if (lookup !== null) {
      rs.status(200).json({
        acknowledged: false,
        message: "an account with this email already exists!",
      });
    } else {
      const hashedPassword = await hashPassword(password);
      const schema = new Signupschema(email, user, hashedPassword);
      await signupm(schema);
      const secrete = process.env.SECRETE;
      const token = jwt.sign(
        { _id: schema._id, user: schema.meta.user, email: schema.meta.email },
        secrete,
        { expiresIn: "5h" }
      );
      rs.status(200).json({
        acknowledged: "Ok",
        message: "user created succesfully!",
        data: token,
      });
    }
  } catch (err) {
    rs.status(500).json({
      acknowledged: false,
      error: err,
    });
  }
}

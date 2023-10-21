import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import signinm from "../models/auth/signin.js";

dotenv.config({ path: "./.env" });

const comparePassword = async (hashed, password) => {
  try {
    const compPassword = await bcrypt.compare(password, hashed);
    return compPassword;
  } catch (err) {
    throw err;
  }
};

export default async function signin(rq, rs) {
  const { email, password } = rq.body;
  try {
    const lookup = await signinm(email);
    if (lookup !== null) {
      const compare = await comparePassword(lookup.meta.password, password);
      if (compare === true) {
        const secrete = process.env.SECRETE;
        const token = jwt.sign(
          { _id: lookup._id, user: lookup.meta.user, email: lookup.meta.email },
          secrete,
          { expiresIn: "5h" }
        );
        rs.status(200).json({
          acknowledged: "Ok",
          message: "login success!",
          data: token,
        });
      } else {
        rs.status(200).json({
          acknowledged: false,
          message: "incorrect password!",
        });
      }
    } else {
      rs.status(200).json({
        acknowledged: false,
        message: "account does not exist!",
      });
    }
  } catch (err) {
    rs.status(500).json(err);
  }
}

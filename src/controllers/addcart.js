import dotenv from "dotenv";
import cartm from "../models/app/cartm.js";
import verifyjwt from "../utils/jwt.js";

dotenv.config({ path: "../.env" });

export default async function addcart(rq, rs) {
  const signature = await rq.query["signature"];
  const secrete = process.env.SECRETE;
  const data = await rq.body;

  if (signature) {
    const verifytoken = await verifyjwt(signature, secrete);
    if (verifytoken && verifytoken._id !== null) {
      try {
        const dbquery = await cartm(verifytoken._id, verifytoken.user, data);
        if (dbquery === true) {
          rs.status(200).json({ acknowleged: "Ok", data: "creation success!" });
        } else {
          rs.status(200).json({
            acknowleged: false,
            data: "creation failed!",
          });
        }
      } catch (err) {
        rs.status(500).json({
          acknowleged: false,
          message: err,
        });
      }
    } else {
      rs.status(401).json({
        acknowleged: false,
        message: verifytoken,
      });
    }
  } else {
    rs.status(404).json({
      acknowleged: false,
      message: "signature not found!",
    });
  }
}

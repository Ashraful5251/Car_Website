import dotenv from "dotenv";
import restorem from "../models/app/restorem.js";
import verifyjwt from "../utils/jwt.js";

dotenv.config({ path: "../.env" });

export default async function getcart(rq, rs) {
  const signature = await rq.query["signature"];
  const secrete = process.env.SECRETE;

  if (signature) {
    const verifytoken = await verifyjwt(signature, secrete);
    if (verifytoken && verifytoken._id !== null) {
      try {
        const dbquery = await restorem(verifytoken._id, verifytoken.user);
        rs.status(200).json({ acknowleged: "Ok", data: dbquery });
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

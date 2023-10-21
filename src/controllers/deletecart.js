import dotenv from "dotenv";
import deletem from "../models/app/deletem.js";
import verifyjwt from "../utils/jwt.js";

dotenv.config({ path: "../.env" });

export default async function deletecart(rq, rs) {
  const id = await rq.query["id"];
  const signature = await rq.query["signature"];
  const secrete = process.env.SECRETE;

  if (signature) {
    const verifytoken = await verifyjwt(signature, secrete);
    if (verifytoken && verifytoken._id !== null) {
      try {
        const dbquery = await deletem(verifytoken._id, verifytoken.user, id);
        if (dbquery === true) {
          rs.status(200).json({
            acknowleged: "Ok",
            data: "deleted successfully!",
          });
        } else {
          rs.status(200).json({
            acknowleged: "Ok",
            data: "unable to delete",
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

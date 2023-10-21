import jwt from "jsonwebtoken";

export default async function verifyjwt(signature, secrete) {
  let res;
  await jwt.verify(signature, secrete, (err, data) => {
    if (data) {
      res = data;
    } else {
      res = err.message;
    }
  });
  return res;
}

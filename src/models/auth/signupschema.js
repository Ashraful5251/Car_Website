import crypto from "node:crypto";

export default function Signupschema(email, user, password) {
  this._id = crypto.randomBytes(30).toString("hex");
  this.meta = {
    email: email,
    user: user,
    password: password,
  };
  this.cart = [];
  this.purchases = [];
}

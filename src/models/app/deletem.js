import dbconnect from "../../utils/dbconnect.js";

export default async function removeFromCart(id, user, valueToRemove) {
  let connection;
  try {
    connection = dbconnect();
    await connection.connect();
    const db = connection.db("assignment").collection("col1");
    const res = await db.updateOne(
      { _id: id, "meta.user": user },
      { $pull: { cart: { id: valueToRemove } } }
    );
    if (res.matchedCount && res.modifiedCount) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err.message;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

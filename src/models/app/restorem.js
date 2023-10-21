import dbconnect from "../../utils/dbconnect.js";

export default async function restorem(id, user) {
  let connection;
  try {
    connection = dbconnect();
    await connection.connect();
    const db = connection.db("assignment").collection("col1");
    const res = await db.findOne(
      { $and: [{ _id: id }, { "meta.user": user }] },
      {
        projection: {
          _id: 0,
          meta: 0,
        },
      }
    );
    return res;
  } catch (err) {
    throw err.message;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

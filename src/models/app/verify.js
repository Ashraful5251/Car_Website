import dbconnect from "../../utils/dbconnect.js";

export default async function verify(id, user, email) {
  let connection;
  try {
    connection = dbconnect();
    await connection.connect();
    const db = connection.db("assignment").collection("col1");
    const res = await db.findOne(
      { $and: [{ _id: id }, { "meta.user": user }, { "meta.email": email }] },
      {
        projection: {
          meta: 1,
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

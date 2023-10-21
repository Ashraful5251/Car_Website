import dbconnect from "../../utils/dbconnect.js";

export default async function signinm(email) {
  let connection;
  try {
    connection = dbconnect();
    await connection.connect();
    const db = connection.db("assignment").collection("col1");
    const res = await db.findOne(
      { "meta.email": email },
      {
        projection: {
          _id: 1,
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

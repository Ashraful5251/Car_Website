import dbconnect from "../../utils/dbconnect.js";

export default async function signupm(data) {
  let connection;
  try {
    connection = dbconnect();
    await connection.connect();
    const db = connection.db("assignment").collection("col1");
    await db.insertOne(data);
    return true;
  } catch (err) {
    throw err.message;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

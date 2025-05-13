// lib/db.ts
import { MongoClient, Db, Collection } from "mongodb"

if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found!")
}

const client = new MongoClient(process.env.DB_URI)

let isConnected = false // track connection state

/**
 * Returns a connected MongoDB database instance.
 * @param dbName - Name of the database to connect to.
 */
export async function getDB(dbName: string): Promise<Db> {
  if (!isConnected) {
    await client.connect()
    isConnected = true
    console.log(">>>> Connected to DB <<<<")
  }
  return client.db(dbName)
}

/**
 * Returns a specific collection from the test database.
 * @param name - Collection name.
 */
export async function getCollection<TSchema extends Document = Document>(
  name: string,
): Promise<Collection<TSchema>> {
  const db = await getDB("test")
  return db.collection<TSchema>(name)
}

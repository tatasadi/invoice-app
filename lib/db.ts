import { MongoClient, Collection } from 'mongodb'

if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found!")
}

const client = new MongoClient(process.env.DB_URI)
let isConnected = false

async function getDB(dbName: string) {
  if (!isConnected) {
    await client.connect()
    isConnected = true
    console.log(">>>> Connected to DB <<<<")
  }
  return client.db(dbName)
}

/**
 * Return an untyped collection and cast at call site.
 */
export async function getCollection<T = any>(
  name: string
): Promise<Collection<any>> {
  const db = await getDB("invoice_app")
  return db.collection(name)
}

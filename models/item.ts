import { ObjectId } from "mongodb"

export interface Item {
  _id: ObjectId
  invoiceId: ObjectId
  name: string
  quantity: number
  price: number
  total: number
}

export interface ItemDTO {
  id: string
  invoiceId: string
  name: string
  quantity: number
  price: number
  total: number
}
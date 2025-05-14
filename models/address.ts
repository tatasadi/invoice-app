import { ObjectId } from "mongodb"

export interface Address {
  _id: ObjectId
  street?: string
  city?: string
  postCode?: string
  country?: string
}

export interface AddressDTO {
  id: string
  street?: string
  city?: string
  postCode?: string
  country?: string
}
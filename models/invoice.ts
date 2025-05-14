import { AddressDTO } from "@/models/address"
import { ItemDTO } from "@/models/item"

export interface InvoiceDTO {
  id: string
  invoiceNumber: string
  createdAt: string
  invoiceDate: string
  paymentDue: string
  description: string
  paymentTerms: number
  clientName: string
  clientEmail: string
  status: string
  senderAddressId: string
  clientAddressId: string
  total: number
}


export interface InvoiceWithRelationsDTO extends Omit<InvoiceDTO, 'senderAddressId' | 'clientAddressId'> {
  senderAddress: AddressDTO
  clientAddress: AddressDTO
  items: ItemDTO[]
}
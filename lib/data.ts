import { ObjectId } from 'mongodb'
import { unstable_noStore as noStore } from 'next/cache'
import { getCollection } from './db'

import {
  InvoiceDTO,
  InvoiceWithRelationsDTO,
} from '@/models/invoice'
import { AddressDTO } from "@/models/address"
import { ItemDTO } from "@/models/item"
import { randomInvoiceNumber } from "@/lib/utils"

export const ITEMS_PER_PAGE = 7

async function addressCol() { return getCollection('addresses') }
async function invoiceCol() { return getCollection('invoices') }
async function itemCol()    { return getCollection('items')    }

// ——— Fetch paginated invoices (no relations) ———
export async function fetchLatestInvoices(
  currentPage: number,
  status?: string[],
): Promise<InvoiceDTO[]> {
  noStore()
  const col = await invoiceCol()
  const filter = status && status.length ? { status: { $in: status } } : {}
  const docs = await col
    .find(filter)
    .sort({ createdAt: 1 })
    .skip((currentPage - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .toArray()

  return docs.map<InvoiceDTO>(doc => ({
    id:               doc._id.toHexString(),
    invoiceNumber:    doc.invoiceNumber,
    createdAt:        doc.createdAt.toISOString(),
    invoiceDate:      doc.invoiceDate.toISOString(),
    paymentDue:       doc.paymentDue.toISOString(),
    description:      doc.description,
    paymentTerms:     doc.paymentTerms,
    clientName:       doc.clientName,
    clientEmail:      doc.clientEmail,
    status:           doc.status,
    senderAddressId:  doc.senderAddressId.toHexString(),
    clientAddressId:  doc.clientAddressId.toHexString(),
    total:            doc.total,
  }))
}

export async function fetchInvoicesCount(status?: string[]): Promise<number> {
  noStore()
  const col = await invoiceCol()
  const filter = status && status.length ? { status: { $in: status } } : {}
  return col.countDocuments(filter)
}

export async function fetchInvoicesPages(status?: string[]): Promise<number> {
  const count = await fetchInvoicesCount(status)
  return Math.ceil(count / ITEMS_PER_PAGE)
}

// ——— Fetch single invoice with relations ———
export async function fetchInvoiceById(
  id: string,
): Promise<InvoiceWithRelationsDTO | null> {
  noStore()
  const invCol = await invoiceCol()
  const filter = ObjectId.isValid(id)
    ? { _id: new ObjectId(id) }
    : { _id: id }

  const doc = await invCol.findOne(filter)
  if (!doc) return null

  const [rawSender, rawClient, rawItems] = await Promise.all([
    (await addressCol()).findOne({ _id: doc.senderAddressId }),
    (await addressCol()).findOne({ _id: doc.clientAddressId }),
    (await itemCol()).find({ invoiceId: doc._id }).toArray(),
  ])

  if (!rawSender || !rawClient) {
    throw new Error('Data inconsistency: missing address')
  }

  const senderAddress: AddressDTO = {
    id:       rawSender._id.toHexString(),
    street:   rawSender.street,
    city:     rawSender.city,
    postCode: rawSender.postCode,
    country:  rawSender.country,
  }

  const clientAddress: AddressDTO = {
    id:       rawClient._id.toHexString(),
    street:   rawClient.street,
    city:     rawClient.city,
    postCode: rawClient.postCode,
    country:  rawClient.country,
  }

  const items: ItemDTO[] = rawItems.map(item => ({
    id:        item._id.toHexString(),
    invoiceId: item.invoiceId.toHexString(),
    name:      item.name!,
    quantity:  item.quantity ?? 0,
    price:     item.price    ?? 0,
    total:     item.total    ?? 0,
  }))

  const invoice: Omit<InvoiceDTO, 'senderAddressId' | 'clientAddressId'> = {
    id:           doc._id.toHexString(),
    invoiceNumber: doc.invoiceNumber,
    createdAt:    doc.createdAt.toISOString(),
    invoiceDate:  doc.invoiceDate.toISOString(),
    paymentDue:   doc.paymentDue.toISOString(),
    description:  doc.description,
    paymentTerms: doc.paymentTerms,
    clientName:   doc.clientName,
    clientEmail:  doc.clientEmail,
    status:       doc.status,
    total:        doc.total,
  }

  return {
    ...invoice,
    senderAddress,
    clientAddress,
    items,
  }
}

// ——— Create invoice ———
export async function createInvoice(
  data: Omit<InvoiceWithRelationsDTO, 'id'>
): Promise<InvoiceDTO> {
  const addrCol = await addressCol()
  const invCol  = await invoiceCol()
  const itCol   = await itemCol()

  const { insertedId: senderId } = await addrCol.insertOne({
    street:   data.senderAddress.street,
    city:     data.senderAddress.city,
    postCode: data.senderAddress.postCode,
    country:  data.senderAddress.country,
  })
  const { insertedId: clientId } = await addrCol.insertOne({
    street:   data.clientAddress.street,
    city:     data.clientAddress.city,
    postCode: data.clientAddress.postCode,
    country:  data.clientAddress.country,
  })

  const invoiceDoc = {
    createdAt:       new Date(data.createdAt),
    paymentDue:      new Date(data.paymentDue),
    invoiceDate:     new Date(data.invoiceDate),
    description:     data.description,
    paymentTerms:    data.paymentTerms,
    clientName:      data.clientName,
    clientEmail:     data.clientEmail,
    status:          data.status,
    senderAddressId: senderId,
    clientAddressId: clientId,
    total:           data.total,
    invoiceNumber: randomInvoiceNumber()
  }
  const { insertedId: invoiceId } = await invCol.insertOne(invoiceDoc)

  await itCol.insertMany(data.items.map(i => ({
    invoiceId,
    name:     i.name,
    quantity: i.quantity,
    price:    i.price,
    total:    i.total,
  })))

  return {
    id:               invoiceId.toHexString(),
    createdAt:        invoiceDoc.createdAt.toISOString(),
    invoiceDate:      invoiceDoc.invoiceDate.toISOString(),
    paymentDue:       invoiceDoc.paymentDue.toISOString(),
    description:      invoiceDoc.description,
    paymentTerms:     invoiceDoc.paymentTerms,
    clientName:       invoiceDoc.clientName,
    clientEmail:      invoiceDoc.clientEmail,
    status:           invoiceDoc.status,
    senderAddressId:  senderId.toHexString(),
    clientAddressId:  clientId.toHexString(),
    total:            invoiceDoc.total,
    invoiceNumber:    invoiceDoc.invoiceNumber,
  }
}

// ——— Update invoice ———
export async function updateInvoice(
  data: InvoiceWithRelationsDTO
): Promise<void> {
  const addrCol = await addressCol()
  const invCol  = await invoiceCol()
  const itCol   = await itemCol()
  const oid     = new ObjectId(data.id)

  await Promise.all([
    addrCol.updateOne(
      { _id: new ObjectId(data.senderAddress.id) },
      { $set: {
          street:   data.senderAddress.street,
          city:     data.senderAddress.city,
          postCode: data.senderAddress.postCode,
          country:  data.senderAddress.country,
        }},
    ),
    addrCol.updateOne(
      { _id: new ObjectId(data.clientAddress.id) },
      { $set: {
          street:   data.clientAddress.street,
          city:     data.clientAddress.city,
          postCode: data.clientAddress.postCode,
          country:  data.clientAddress.country,
        }},
    ),
  ])

  await invCol.updateOne(
    { _id: oid },
    { $set: {
        paymentDue:   new Date(data.paymentDue),
        description:  data.description,
        paymentTerms: data.paymentTerms,
        clientName:   data.clientName,
        clientEmail:  data.clientEmail,
        status:       data.status,
        total:        data.total,
        invoiceDate:  new Date(data.invoiceDate),
      }},
  )

  await itCol.deleteMany({ invoiceId: oid })
  await itCol.insertMany(data.items.map(i => ({
    invoiceId: oid,
    name:      i.name,
    quantity:  i.quantity,
    price:     i.price,
    total:     i.total,
  })))
}

// ——— Delete invoice ———
export async function deleteInvoice(id: string): Promise<void> {
  const addrCol = await addressCol()
  const invCol  = await invoiceCol()
  const itCol   = await itemCol()
  const oid     = new ObjectId(id)

  await itCol.deleteMany({ invoiceId: oid })

  const invoice = await invCol.findOne({ _id: oid })
  if (!invoice) return

  await invCol.deleteOne({ _id: oid })
  await Promise.all([
    addrCol.deleteOne({ _id: invoice.senderAddressId }),
    addrCol.deleteOne({ _id: invoice.clientAddressId }),
  ])
}

// ——— Update only status ———
export async function updateInvoiceStatus(
  id: string,
  status: string,
): Promise<void> {
  const invCol = await invoiceCol()
  await invCol.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } },
  )
}

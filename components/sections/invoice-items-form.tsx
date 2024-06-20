// import { useState } from "react"
// import { Input } from "../ui/input"
// import { Button } from "../ui/button"
// import iconDelete from "@/public/img/icon-delete.svg"
// import Image from "next/image"

// interface Item {
//   name: string
//   quantity: number
//   price: number
//   total: number
// }

// export default function InvoiceItemsForm() {
//   const [items, setItems] = useState<Item[]>([
//     { name: "", quantity: 0, price: 0, total: 0 },
//   ])

//   const addItem = () => {
//     setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }])
//   }

//   const removeItem = (index: number) => {
//     const newItems = items.filter((_, i) => i !== index)
//     setItems(newItems)
//   }

//   const updateItem = (index: number, key: keyof Item, value: any) => {
//     const newItems = items.map((item, i) =>
//       i === index
//         ? {
//             ...item,
//             [key]: value,
//             total:
//               key === "quantity" || key === "price"
//                 ? item.quantity * item.price
//                 : item.total,
//           }
//         : item,
//     )
//     setItems(newItems)
//   }

//   return (
//     <section>
//       <h2 className="mt-10 text-purple-primary sm:mt-12">Item List</h2>
//       {items.map((item, index) => (
//         <div key={index} className="mt-6 grid grid-cols-4 items-center gap-6">
//           <Input
//             value={item.name}
//             onChange={(e) => updateItem(index, "name", e.target.value)}
//             placeholder="Item Name"
//             className="col-span-1"
//           />
//           <Input
//             type="number"
//             value={item.quantity}
//             onChange={(e) =>
//               updateItem(index, "quantity", parseInt(e.target.value))
//             }
//             placeholder="Qty."
//             className="col-span-1"
//           />
//           <Input
//             type="number"
//             value={item.price}
//             onChange={(e) =>
//               updateItem(index, "price", parseFloat(e.target.value))
//             }
//             placeholder="Price"
//             className="col-span-1"
//           />
//           <div className="col-span-1 flex items-center justify-between">
//             <span>{item.total.toFixed(2)}</span>
//             <button type="button" onClick={() => removeItem(index)}>
//               <Image src={iconDelete} alt="Delete" />
//             </button>
//           </div>
//         </div>
//       ))}
//       <Button type="button" onClick={addItem} className="mt-6">
//         + Add New Item
//       </Button>
//     </section>
//   )
// }

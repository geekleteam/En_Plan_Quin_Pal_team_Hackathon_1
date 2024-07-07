import { Metadata } from "next"
import { getFavouriteSolutions, getCustomer, getCart } from "@lib/data"


export const metadata: Metadata = {
  title: "hola",
  description: "Something went ok",
}


export default async function  FavouriteSolutions() {
  const customer = await getCustomer();
  const solutions = await getFavouriteSolutions(customer);

  return (
    <div style={{'fontSize': '30px'}}>
      blabla
      {solutions[0].customer_id}
    </div>
  )
}

import { Metadata } from "next"
import { getFavouriteSolutions, getCustomer, getCart, getChats } from "@lib/data"


export const metadata: Metadata = {
  title: "hola",
  description: "Something went ok",
}


export default async function  FavouriteSolutions() {
  const customer = await getCustomer();
  const solutions = await getFavouriteSolutions(customer);
  const chats = await getChats(customer);

  return (
    <><div style={{'fontSize': '30px'}}>
      Solutions:
      {solutions.map(s => s.name)}
    </div>
      <div style={{'fontSize': '30px'}}>
      Chats:
      {chats.map(ch => {
        return(<div>
            {ch.title}
            <ul>
              {ch.messages.map(m => <li key={m.id}>{m.role}: {m.content}</li>)}
            </ul>
          </div>
        )
      })}

      </div>
    </>
  )
}

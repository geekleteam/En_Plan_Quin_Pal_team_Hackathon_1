import { Metadata } from "next"
import { getFavouriteSolutions, getCustomer, getCart, getChats, getSolutions, createFavouriteSolution } from "@lib/data"
import CreateFab from "@modules/examples/createFab"


export const metadata: Metadata = {
  title: "hola",
  description: "Something went ok",
}


export default async function  FavouriteSolutions() {
  const customer = await getCustomer();
  const solutions = await getSolutions();
  // example to mark solution as favourite:
  // if(solutions.length > 0) await createFavouriteSolution(customer, solutions[0].id);
  const favourites = await getFavouriteSolutions(customer);
  const chats = await getChats(customer);

  return (
    <><div style={{'fontSize': '30px'}}>
      Solutions:
      <ul>
        {solutions.map(s => {
          return <div>{s.name} </div>
        })}
      </ul>
      Favourites:
      <ul>
        {favourites.map(s => {
          return <div>{s.name}</div>
        })}
      </ul>

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

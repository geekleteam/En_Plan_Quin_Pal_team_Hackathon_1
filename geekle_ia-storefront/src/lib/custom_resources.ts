import { BaseResource, Client } from "@medusajs/medusa-js"
import { Customer } from "@medusajs/medusa"

class CustomResources extends BaseResource {

  constructor(args: Client) {
    super(args)
  }

  // GETS

  listFavouriteSolutions(customer: any) {
    return this.client.request("GET", `/store/customers/${customer.id}/favourite_solutions`);
  }

  getSolutionDetails(solutionId: String) {
    return this.client.request("GET", `/store/solutions/${solutionId}`);
  }

  listChats(customer: any) {
    return this.client.request("GET", `/store/customers/${customer.id}/chats`);
  }

  getChatDetails(customer: Customer, chatId: String) {
    return this.client.request("GET", `/store/customers/${customer.id}/chats/${chatId}`);
  }

  listSolutions() {
    return this.client.request("GET", `/store/solutions`);
  }

  // POSTS

  createFavouriteSolution(customer:any, solutionId:String){
    return this.client.request("POST", `/store/customers/${customer.id}/favourite_solutions`, {solution_id: solutionId});
  }
}

export default CustomResources;
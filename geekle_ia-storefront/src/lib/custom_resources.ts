import { BaseResource, Client } from "@medusajs/medusa-js"

class CustomResources extends BaseResource {

  constructor(args: Client) {
    super(args)
  }

  listFavouriteSolutions(customer: any) {
    console.log(customer.id);
    return this.client.request("GET", `/store/favourite_solutions/${customer.id}`, {customerId: customer.id});
  }

}

export default CustomResources;
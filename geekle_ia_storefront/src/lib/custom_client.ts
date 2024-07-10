import Medusa, { BaseResource, Client, Config } from "@medusajs/medusa-js"
import CustomResources from "@lib/custom_resources"


class CustomClient extends Medusa {

  public customResources: CustomResources

  constructor(args: Config) {
    super(args);
    this.customResources = new CustomResources(this.client)
  }


}

export default CustomClient;
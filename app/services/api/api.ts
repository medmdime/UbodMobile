/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import type {
  ApiConfig,
} from "./api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

}

// Singleton instance of the API for convenience
export const api1 = new Api()
export const api = create({
  baseURL: "http://localhost:8080/api/",
  headers: { "Content-Type": "application/json" },
})
export const apiNutrition = create({
  baseURL: "https://world.openfoodfacts.org/cgi",
  headers: { "Content-Type": "application/json" },

})

export const  getMeal = async (query: string) => await apiNutrition.get(`/search.pl?code=${query}&fields=_id,product_name,serving_quantity,nova_group,nutriscore_grade,image_url,nutriments&action=process&json=1&`)
export const searchMeal = async (query: string) => await apiNutrition.get(`/search.pl?search_terms=${query}&search_simple=1&action=process&tagtype_0=labels&tag_contains_0=contains&
page_size=20&json=1&`)

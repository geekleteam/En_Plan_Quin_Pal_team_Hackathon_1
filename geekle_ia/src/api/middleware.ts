import {
    authenticate, Customer, CustomerService,
} from "@medusajs/medusa"
import type {
    MedusaNextFunction,
    MedusaRequest,
    MedusaResponse,
    MiddlewaresConfig,
    User,
    UserService,
} from "@medusajs/medusa"

const registerLoggedInUser = async (
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
) => {
    let loggedInUser: User | null = null

    if (req.user && req.user.userId) {
        const userService =
            req.scope.resolve("userService") as UserService
        loggedInUser = await userService.retrieve(req.user.userId)
    }

    req.scope.register({
        loggedInUser: {
            resolve: () => loggedInUser,
        },
    })

    next()
}

const registerLoggedInCustomer = async (
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
) => {
    let loggedInCustomer: Customer | null = null

    console.log("MIDDLEWARE")
    console.log(req)

    if (req.user && req.user.userId) {
        const customerService =
            req.scope.resolve("customerService") as CustomerService
        loggedInCustomer = await customerService.retrieve(req.user.customer_id)
    }

    req.scope.register({
        loggedInCustomer: {
            resolve: () => loggedInCustomer,
        },
    })

    next()
}


export const config: MiddlewaresConfig = {
    routes: [
        {
            matcher: "/store/favourite_solutions",
            middlewares: [authenticate(), registerLoggedInCustomer, registerLoggedInUser],
        },
        {
            matcher: "/admin/favourite_solutions",
            middlewares: [authenticate(), registerLoggedInUser],
        },
    ],
}
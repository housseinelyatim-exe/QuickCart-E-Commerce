import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/modals/User";
import Order from "@/modals/Order";

export const inngest = new Inngest({ id: "quickcart-next" })

export const syncUserCreataion = inngest.createFunction(
    {
        id: 'sync-user-from-clerk',
        triggers: [{ event: 'clerk/user.created' }],
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + " " + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)
    }
)

export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk',
        triggers: [{ event: 'clerk/user.updated' }],
    },                                                  // ← was missing
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + " " + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id, userData)
    }
)

export const syncUserDeletation = inngest.createFunction(
    {
        id: 'delete-user-with-clerk',
        triggers: [{ event: 'clerk/user.deleted' }],
    },
    async ({ event }) => {
        const { id } = event.data
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)

export const createUserOrder = inngest.createFunction(
    {
        id: 'create-user-order',
        batchEvents: {
            maxSize: 5,
            timeout: '5s'
        },
        triggers: [{ event: 'order/created' }], // ✅ triggers stays inside config
    },
    async ({ events, step }) => { // ✅ handler is second argument (no separate trigger arg)
        const orders = events.map((event) => ({
            userId: event.data.userId,
            items: event.data.items,
            amount: event.data.amount,
            address: event.data.address,
            date: event.data.date
        }))

        await step.run("Save orders to MongoDB", async () => {
            await connectDB()
            await Order.insertMany(orders)
        })

        return { success: true, processed: orders.length }
    }
)
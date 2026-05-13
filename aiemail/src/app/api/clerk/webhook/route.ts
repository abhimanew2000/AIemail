import { db } from "@/server/db"

export const POST = async (req: Request) => {
    const payload = await req.json()
    const { data, type } = payload

    // Only process user creation or updates
    if (type !== 'user.created' && type !== 'user.updated') {
        return new Response('Webhook ignored', { status: 200 })
    }

    const id = data.id
    const email = data.email_addresses?.[0]?.email_address
    const firstName = data.first_name
    const lastName = data.last_name
    const imageUrl = data.image_url

    if (!id || !email) {
        return new Response('Missing user ID or email', { status: 400 })
    }

    await db.user.upsert({
        where: { id: id },
        update: {
            emailAddress: email,
            firstName: firstName,
            lastName: lastName,
            imageUrl: imageUrl,
        },
        create: {
            id: id,
            emailAddress: email,
            firstName: firstName,
            lastName: lastName,
            imageUrl: imageUrl,
        },
    })

    return new Response('Webhook received', { status: 200 })
}

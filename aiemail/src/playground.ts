import { db } from "./server/db";

await db.user.create({
    data: {
        
        emailAddress: "test@gmail.com",
        firstName: "John",
        lastName: "Doe",
        imageUrl: "https://example.com/john-doe.jpg",
    },
})
console.log('done')
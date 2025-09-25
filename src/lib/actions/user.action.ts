import { db } from "../database/db";
import { currentUser } from "@clerk/nextjs/server";

export const checkUser = async () => {
    const user = await currentUser();

    if(!user){
        return null;
    }

    const loggedInUser = await db.user.findUnique({
        where: {
            clerkId: user.id
        }
    })

    if(loggedInUser){
        return loggedInUser;
    }

    const newUser = await db.user.create({
        data: {
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress || '',
            name: user.username,
            imageUrl: user.imageUrl,
        }
    })

    return newUser;
};
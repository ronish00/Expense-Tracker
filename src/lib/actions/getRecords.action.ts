"use server"

import { auth } from "@clerk/nextjs/server";
import { db } from "../database/db";

export const getRecords = async ():Promise<{
    records?: ExpenseRecord[]
    error?: string
}> => {
    const { userId } = await auth();

    if(!userId){
        return {error: "User not found"};
    }

    try {
        const records = await db.record.findMany({
            where: { userId},
            orderBy: {
                date: 'desc'
            },
            take: 10,
        });

        return {records};
    } catch (error) {
        console.log('Error fetching records:', error);
        return {error: 'Database error'};
    }
}
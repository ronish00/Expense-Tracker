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

export async function getUserRecord(): Promise<{
  record?: number;
  daysWithRecords?: number;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const records = await db.record.findMany({
      where: { userId },
    });

    const record = records.reduce((sum, record) => sum + record.amount, 0);

    // Count the number of days with valid sleep records
    const daysWithRecords = records.filter(
      (record) => record.amount > 0
    ).length;

    return { record, daysWithRecords };
  } catch (error) {
    console.error("Error fetching user record:", error); // Log the error
    return { error: "Database error" };
  }
}

export async function getBestWorstExpense(): Promise<{
  bestExpense?: number;
  worstExpense?: number;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // Fetch all records for the authenticated user
    const records = await db.record.findMany({
      where: { userId },
      select: { amount: true }, // Fetch only the `amount` field for efficiency
    });

    if (!records || records.length === 0) {
      return { bestExpense: 0, worstExpense: 0 }; // Return 0 if no records exist
    }

    const amounts = records.map((record) => record.amount);

    // Calculate best and worst expense amounts
    const bestExpense = Math.max(...amounts); // Highest amount
    const worstExpense = Math.min(...amounts); // Lowest amount

    return { bestExpense, worstExpense };
  } catch (error) {
    console.error("Error fetching expense amounts:", error); // Log the error
    return { error: "Database error" };
  }
}
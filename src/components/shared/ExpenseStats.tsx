"use client";
import {
  getBestWorstExpense,
  getUserRecord,
} from "@/lib/actions/records.action";
import React, { useEffect, useState } from "react";

interface Data {
  userRecordResult: {
    record?: number;
    daysWithRecords?: number;
    error?: string;
  } | null;
  rangeResult: {
    bestExpense?: number;
    worstExpense?: number;
    error?: string;
  } | null;
}

const ExpenseStats = () => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  (async () => {
    const [userRecordResult, rangeResult] = await Promise.all([
      getUserRecord(),
      getBestWorstExpense(),
    ]);

    // ✅ Check for server-returned errors
    if (userRecordResult.error || rangeResult.error) {
      setError(
        userRecordResult.error || rangeResult.error || "Failed to load data"
      );
      setData(null);
    } else {
      setData({ userRecordResult, rangeResult });
      setError(null);
    }
  })().catch((err) => {
    console.error("Unexpected error:", err);
    setError("Something went wrong.");
    setData(null);
  });
}, []);

  // ❌ Error state
  if (error) {
    return (
      <div className="bg-white/80  p-8 rounded-2xl shadow-lg border border-gray-100/50  hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-dark rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl">📊</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-dark ">
              Expense Statistics
            </h3>
            <p className="text-sm text-gray-500  mt-1">
              Your spending insights and ranges
            </p>
          </div>
        </div>
        <div className="bg-red-50/80 p-6 rounded-xl border-l-4 border-l-red-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-lg">⚠️</span>
            </div>
            <p className="text-red-800  font-semibold">
              Unable to load expense statistics
            </p>
          </div>
          <p className="text-red-700  text-sm ml-11">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  // 🕐 Loading state
  if (!data) {
    return (
      <div className="bg-white/80  p-8 rounded-2xl shadow-lg border border-gray-100/50  hover:shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-dark rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl">📊</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-dark  bg-clip-text text-transparent">
              Expense Statistics
            </h3>
            <p className="text-sm text-gray-500  mt-1">
              Loading your spending insights...
            </p>
          </div>
        </div>
        <div className="animate-pulse bg-gray-100 dark:bg-gray-700 h-32 rounded-xl"></div>
      </div>
    );
  }

  // ✅ Safe destructuring after data is available
  const { record, daysWithRecords } = data.userRecordResult || {};
  const { bestExpense, worstExpense } = data.rangeResult || {};

  const averageExpense = (record || 0) / (daysWithRecords || 1);
  const validDays = daysWithRecords || 1;

  return (
    <div className="bg-white/80 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-lg mt-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-dark rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-sm sm:text-lg">📊</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold ">
            Expense Statistics
          </h3>
          <p className="text-xs text-gray-500  mt-0.5">
            Your spending insights and ranges
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* 💰 Average Daily Spending */}
        <div className="bg-dark rounded-xl p-3 sm:p-4 border border-gray-200/5">
          <div className="text-center">
            <p className="text-xs font-medium text-white mb-2 tracking-wide uppercase">
              Average Daily Spending
            </p>
            <div className="text-2xl text-white sm:text-3xl font-bold  mb-2">
              ${averageExpense.toFixed(2)}
            </div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"></span>
              Based on {validDays} days with expenses
            </div>
          </div>
        </div>

        {/* 📊 Expense Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {/* Highest Expense */}
          <div className="bg-red-50/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border-l-4 border-l-red-500 hover:bg-red-50 dark:hover:bg-red-900/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm leading-none text-white  font-bold">
                  ↑
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold  text-xs mb-0.5">
                  Highest
                </h4>
                <p className="text-lg font-bold text-red-600 ">
                  {bestExpense !== undefined ? `$${bestExpense}` : "No data"}
                </p>
              </div>
            </div>
          </div>

          {/* Lowest Expense */}
          <div className="bg-green-50/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border-l-4 border-l-green-500 hover:bg-green-50 dark:hover:bg-green-900/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm leading-none text-white font-bold">
                  ↓
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold  text-xs mb-0.5">
                  Lowest
                </h4>
                <p className="text-lg font-bold text-green-600">
                  {worstExpense !== undefined ? `$${worstExpense}` : "No data"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStats;

"use client";

import addExpenseRecord from "@/lib/actions/addExpenseRecord.action";
import { suggestCategory } from "@/lib/actions/suggestCategory.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
  description: z.string(),
  date: z.string(),
  category: z.string(),
  amount: z.number(),
});

const AddNewRecord = () => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>("");
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [categorizingAI, setCategorizingAI] = useState(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      category: "",
      amount: 50,
    },
  });

  const description = watch("description");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setAlertMessage("");
    try {
      const { error } = await addExpenseRecord(data);
      if (error) {
        setAlertType("error");
        setAlertMessage(`Error: ${error}`);
      } else {
        setAlertType("success");
        setAlertMessage("Expense Record Added Successfully");
        reset();
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Failed to add expense record");
    } finally {
      setLoading(false);
    }
  };

  const handleAISuggestCategory = async () => {
    const description = watch("description");
    if (!description.trim()) {
      setAlertType("error");
      setAlertMessage("Please enter a description first");
      return;
    }

    setCategorizingAI(true);

    try {
      const result = await suggestCategory(description);
      if (result.error) {
        setAlertMessage(`AI Suggestion: ${result.error}`);
        setAlertType("error");
      } else {
        setAlertType("success");
        setValue("category", result.category);
        setAlertMessage(`AI suggested category: ${result.category}`);
      }
    } catch {
      setAlertMessage("Failed to get AI category suggestion");
      setAlertType("error");
    } finally {
      setCategorizingAI(false);
    }
  };

  return (
    <div className="bg-white/80 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl mt-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-dark rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-sm sm:text-lg">💳</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold leading-tight">
            Add New Expense
          </h3>
          <p className="text-xs mt-0.5">
            Track your spending with AI assistance
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4  rounded-xl mb-0">
          {/* Expense Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="text"
              className="flex items-center gap-2 text-xs font-semibold text-gray-700 tracking-wide"
            >
              <span className="w-1.5 h-1.5 bg-dark rounded-full"></span>
              Expense Description
            </label>
            <div className="relative">
              <input
                className="w-full pl-3 pr-12 sm:pr-14 py-2.5 bg-white/7 border-2 border-gray-200/80 rounded-xl placeholder-gray-400 text-sm shadow-sm hover:shadow-md transition-all duration-200"
                placeholder="Coffee, groceries, gas..."
                {...register("description")}
              />
              <button
                type="button"
                onClick={handleAISuggestCategory}
                disabled={categorizingAI || !description.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-7 bg-dark disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg text-xs font-medium flex items-center justify-center shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200"
                title="AI Category Suggestion"
              >
                {categorizingAI ? (
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span className="text-xs">✨</span>
                )}
              </button>
            </div>
            {categorizingAI && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 bg-dark rounded-full animate-pulse"></div>
                AI is analyzing your description...
              </div>
            )}
          </div>

          {/* Expense Date */}
          <div className="space-y-1.5">
            <label
              htmlFor="date"
              className="flex items-center gap-2 text-xs font-semibold tracking-wide"
            >
              <span className="w-1.5 h-1.5 bg-dark rounded-full"></span>
              Expense Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2.5 bg-white/70 border-2 border-gray-200/80 rounded-xl text-sm shadow-sm hover:shadow-md transition-all duration-200"
              {...register("date")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 b rounded-xl mb-0">
          {/* Category Selection */}
          <div className="space-y-1.5">
            <label
              htmlFor="category"
              className="flex items-center gap-2 text-xs font-semibold tracking-wide"
            >
              <span className="w-1.5 h-1.5 bg-dark rounded-full"></span>
              Category
            </label>
            <select
              className="w-full px-3 py-2.5 bg-white/70 border-2 border-gray-200/80 rounded-xl cursor-pointer text-sm shadow-sm hover:shadow-md transition-all duration-200"
              {...register("category")}
            >
              <option value="" disabled className="text-gray-400">
                Select category...
              </option>
              <option value="Food" className="">
                🍔 Food & Dining
              </option>
              <option value="Transportation" className="">
                🚗 Transportation
              </option>
              <option value="Shopping" className="">
                🛒 Shopping
              </option>
              <option value="Entertainment" className="">
                🎬 Entertainment
              </option>
              <option value="Bills" className="">
                💡 Bills & Utilities
              </option>
              <option value="Healthcare" className="">
                🏥 Healthcare
              </option>
              <option value="Other" className="">
                📦 Other
              </option>
            </select>
            <span className="text-xs text-gray-600 font-normal hidden sm:inline">
              Use the ✨ button above for AI suggestions
            </span>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label
              htmlFor="amount"
              className="flex items-center gap-2 text-xs font-semibold tracking-wide"
            >
              <span className="w-1.5 h-1.5 bg-dark rounded-full"></span>
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-[12px] font-medium text-sm">
                $
              </span>
              <input
                type="number"
                className="w-full pl-6 pr-3 py-2.5 bg-white/70 border-2 border-gray-200/80 rounded-xl placeholder-gray-400 text-sm font-semibold shadow-sm"
                placeholder="0.00"
                {...register("amount")}
              />
            </div>
            <span className="text-xs ml-2 font-normal hidden sm:inline">
              Enter amount between $0 and $1,000
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full relative overflow-hidden bg-dark text-white px-4 py-3 sm:px-5 sm:py-4 rounded-xl font-semibold shadow-xl group transition-all duration-300 border-2 border-transparen text-sm sm:text-base"
        >
          <div className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span className="text-lg">💫</span>
                <span>Add Expense</span>
              </>
            )}
          </div>
        </button>
      </form>

      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`mt-4 p-3 rounded-xl border-l-4 backdrop-blur-sm ${
            alertType === "success"
              ? "bg-green-50/80 border-l-green-500 text-green-800 "
              : "bg-red-50/80  border-l-red-500 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                alertType === "success" ? "bg-green-100 " : "bg-red-100"
              }`}
            >
              <span className="text-sm">
                {alertType === "success" ? "✅" : "⚠️"}
              </span>
            </div>
            <p className="font-medium text-sm">{alertMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewRecord;

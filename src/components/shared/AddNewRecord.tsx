"use client";
import { useRef, useState } from "react";
import addExpenseRecord from "@/lib/actions/addExpenseRecord";
import { suggestCategory } from "@/lib/actions/suggestCategory";

const AddRecord = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState(50); // Default value for expense amount
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // State for alert message
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null); // State for alert type
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [category, setCategory] = useState(""); // State for selected expense category
  const [description, setDescription] = useState(""); // State for expense description
  const [isCategorizingAI, setIsCategorizingAI] = useState(false); // State for AI categorization loading

  const clientAction = async (formData: FormData) => {
    setIsLoading(true); // Show spinner
    setAlertMessage(null); // Clear previous messages
    
    formData.set("amount", amount.toString()); // Add the amount value to the form data
    formData.set("category", category); // Add the selected category to the form data

    const { error } = await addExpenseRecord(formData); // Removed `data` since it's unused

    if (error) {
      setAlertMessage(`Error: ${error}`);
      setAlertType("error"); // Set alert type to error
    } else {
      setAlertMessage("Expense record added successfully!");
      setAlertType("success"); // Set alert type to success
      formRef.current?.reset();
      setAmount(50); // Reset the amount to the default value
      setCategory(""); // Reset the category
      setDescription(""); // Reset the description
    }

    setIsLoading(false); // Hide spinner
  };


  const handleAISuggestCategory = async () => {
    if (!description.trim()) {
      setAlertMessage("Please enter a description first");
      setAlertType("error");
      return;
    }

    setIsCategorizingAI(true);
    setAlertMessage(null);

    try {
      const result = await suggestCategory(description);
      if (result.error) {
        setAlertMessage(`AI Suggestion: ${result.error}`);
        setAlertType("error");
      } else {
        setCategory(result.category);
        setAlertMessage(`AI suggested category: ${result.category}`);
        setAlertType("success");
      }
    } catch {
      setAlertMessage("Failed to get AI category suggestion");
      setAlertType("error");
    } finally {
      setIsCategorizingAI(false);
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
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current!);
          clientAction(formData);
        }}
        className="space-y-6 sm:space-y-8"
      >
        {/* Expense Description and Date */}
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
                type="text"
                id="text"
                name="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full pl-3 pr-12 sm:pr-14 py-2.5 bg-white/7 border-2 border-gray-200/80 rounded-xl placeholder-gray-400 text-sm shadow-sm hover:shadow-md transition-all duration-200"
                placeholder="Coffee, groceries, gas..."
                required
              />
              <button
                type="button"
                onClick={handleAISuggestCategory}
                disabled={isCategorizingAI || !description.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-7 bg-dark disabled:from-gray-300 disabled:to-gray-300 text-white rounded-lg text-xs font-medium flex items-center justify-center shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200"
                title="AI Category Suggestion"
              >
                {isCategorizingAI ? (
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span className="text-xs">✨</span>
                )}
              </button>
            </div>
            {isCategorizingAI && (
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
              name="date"
              id="date"
              className="w-full px-3 py-2.5 bg-white/70 border-2 border-gray-200/80 rounded-xl text-sm shadow-sm hover:shadow-md transition-all duration-200"
              required
              onFocus={(e) => e.target.showPicker()}
            />
          </div>
        </div>

        {/* Category Selection and Amount */}
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
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-white/70 border-2 border-gray-200/80 rounded-xl cursor-pointer text-sm shadow-sm hover:shadow-md transition-all duration-200"
              required
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
                name="amount"
                id="amount"
                min="0"
                max="1000"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full pl-6 pr-3 py-2.5 bg-white/70 border-2 border-gray-200/80 rounded-xl placeholder-gray-400 text-sm font-semibold shadow-sm"
                placeholder="0.00"
                required
              />
            </div>
            <span className="text-xs ml-2 font-normal hidden sm:inline">
              Enter amount between $0 and $1,000
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full relative overflow-hidden bg-dark text-white px-4 py-3 sm:px-5 sm:py-4 rounded-xl font-semibold shadow-xl group transition-all duration-300 border-2 border-transparen text-sm sm:text-base"
          disabled={isLoading}
        >
          <div className="relative flex items-center justify-center gap-2">
            {isLoading ? (
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

export default AddRecord;

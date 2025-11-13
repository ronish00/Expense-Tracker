import { getRecords } from "@/lib/actions/records.action";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";

const RecordChart = () => {
  const [error, setError] = useState<string | null>("");
  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[] | null>(
    null
  );
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { records, error } = await getRecords();
        if (error) {
          setError(error);
        }

        if (records) {
          setExpenseRecords(records);
        }
      } catch (error) {
        setError("Failed to get records")
        return;
      }
    };
    fetchRecords();
  }, [expenseRecords]);

  if (error) {
    return (
      <div className="bg-white/80 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-dark rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm sm:text-lg">📊</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold">
              Expense Chart
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Visual representation of your spending
            </p>
          </div>
        </div>
        <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl border-l-4 border-l-red-500">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
              <span className="text-sm">⚠️</span>
            </div>
            <p className="text-red-800 dark:text-red-300 font-semibold text-sm">
              Error loading chart data
            </p>
          </div>
          <p className="text-red-700 dark:text-red-400 text-xs ml-8">{error}</p>
        </div>
      </div>
    );
  }

  if (!expenseRecords || expenseRecords.length === 0) {
    return (
      <div className="bg-white/80 p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 hover:shadow-2xl">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-dark rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm sm:text-lg">📊</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold">
              Expense Chart
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Visual representation of your spending
            </p>
          </div>
        </div>
        <div className="text-center py-6 sm:py-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl sm:text-3xl">📈</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold mb-2">
            No Data to Display
          </h4>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed text-sm">
            Start tracking your expenses to see your spending patterns
            visualized in this chart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-dark rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-sm sm:text-lg">📊</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold">
            Expense Chart
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Visual representation of your spending
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <BarChart
          records={expenseRecords.map((record) => ({
            ...record,
            date: String(record.date),
          }))}
        />
      </div>
    </div>
  );
};

export default RecordChart;

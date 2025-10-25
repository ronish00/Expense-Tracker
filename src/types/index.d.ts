declare type ExpenseRecord = {
  date: string | number | Date;
  id: string;
  text: string;
  amount: number;
  category: string;
  userId: string;
  createdAt: Date;
}

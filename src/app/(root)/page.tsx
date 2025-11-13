"use client";

import AddNewRecord from "@/components/shared/AddNewRecord";
import AIInsights from "@/components/shared/AIInsights";
import Container from "@/components/shared/Container";
import ExpenseStats from "@/components/shared/ExpenseStats";
import Guest from "@/components/shared/Guest";
import RecordChart from "@/components/shared/RecordChart";
import RecordHistory from "@/components/shared/RecordHistory";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

const Home = () => {
  const user = useUser();

  if (!user) {
    return <Guest />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-16">
        {/* left column */}
        <div>
          <section className="p-8 bg-white/80 flex items-start gap-8 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl">
            <div className="relative min-w-16">
              <Image
                className="rounded-xl"
                src={user.imageUrl ?? ""}
                alt="profile img"
                width={64}
                height={64}
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-dark rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 sm:w-9 sm:h-9 bg-dark rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm sm:text-lg">👋</span>
                </div>
                <h4 className="text-2xl font-bold">
                  Welcome Back, {user.username}
                </h4>
              </div>
              <p className="my-6 text-sm">
                Here&#39;s a quick overview of your recent expense activity.
                Track your spending, analyze patterns, and manage your budget
                efficiently!
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">📅</span>
                  </div>
                  <div>
                    <p className="text-xs">Joined</p>
                    <p className="font-semibold">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">📅</span>
                  </div>
                  <div>
                    <p className="text-xs">Last Active</p>
                    <p className="font-semibold">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <AddNewRecord />
        </div>
        {/* right column */}
        <div>
          <RecordChart />
          <ExpenseStats />
        </div>
      </div>
      <AIInsights />
      <RecordHistory />
    </Container>
  );
};

export default Home;

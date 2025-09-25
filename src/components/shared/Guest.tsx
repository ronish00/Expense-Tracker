import Link from "next/link";
import Container from "./Container";

const Guest = () => {
  return (
    <>
      <section className="flex items-center justify-center">
        <Container extraClass={"flex flex-col items-center mt-16"}>
          {/* Heading */}
          <div className="flex items-center gap-1.5 px-4 py-2 shadow w-max rounded-4xl">
            <span className="w-2 h-2 rounded-full bg-dark"></span>
            <span className="font-medium text-sm">
              AI-Powered Financial Management
            </span>
          </div>
          <div className="text-center w-2xl">
            <h1 className="text-7xl font-bold mt-3 mb-6">
              Welcome to Expense Tracker AI
            </h1>
            <p className="text-xl">
              Track your expenses, manage your budget, and get AI-powered
              insights to take control of your finances with intelligent
              automation.
            </p>
          </div>

          {/*Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <Link
              className="bg-dark text-white py-4 px-8 rounded-xl flex items-center gap-2"
              href={"/sign-up"}
            >
              <span>Get Started</span>
              <span>→</span>
            </Link>
            <Link
              className="bg-transparent border-dark border-1 py-4 px-8 rounded-xl"
              href={"/about"}
            >
              Learn More
            </Link>
          </div>
          
          {/* Cards */}
          <div className="flex items-center gap-8 mt-8">
            <div className="flex flex-col items-center gap-2.5 shadow-xl p-6 rounded-xl">
              <div className="bg-dark p-2.5 rounded-xl">🤖</div>
              <h3 className="text-lg font-semibold">Ai Insights</h3>
              <p className="text-sm">
                Smart analysis of your spending patterns
              </p>
            </div>
            <div className="flex flex-col items-center gap-2.5 shadow-xl p-6 rounded-xl">
              <div className="bg-dark p-2.5 rounded-xl">✨</div>
              <h3 className="text-lg font-semibold">Auto Categories</h3>
              <p className="text-sm">Intelligent expense categorization</p>
            </div>
            <div className="flex flex-col items-center gap-2.5 shadow-xl p-6 rounded-xl">
              <div className="bg-dark p-2.5 rounded-xl">📊</div>
              <h3 className="text-lg font-semibold">Smart Dashboard</h3>
              <p className="text-sm">Beautiful, intuitive financial overview</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Guest;

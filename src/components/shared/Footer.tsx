import Link from "next/link";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-dark mt-28 py-16">
      <Container
        extraClass={"flex flex-col md:flex-row gap-[48px] md:gap-[200px]"}
      >
        <div className="md:w-xs">
          <h3 className="text-white text-2xl font-bold mb-6">
            Expense Tracker
          </h3>
          <p className="text-white">
            Intelligent financial management powered by AI. Track your expenses,
            manage your budget, and gain insights into your spending patterns.
          </p>
        </div>
        <div>
          <h4 className="text-white text-lg font-semibold">Features</h4>
          <div className="flex flex-col gap-2 mt-6">
            <div className="flex gap-4 items-center">
              <span className="bg-white rounded-lg p-2">🤖</span>
              <p className="text-white">AI-Powered Insights</p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="bg-white rounded-lg p-2">✨</span>
              <p className="text-white">Smart Categorization</p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="bg-white rounded-lg p-2">📊</span>
              <p className="text-white">Analytics Dashboard</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

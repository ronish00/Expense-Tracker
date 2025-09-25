import Link from "next/link";
import Container from "./Container";
import { faq, testimonials } from "@/constants";

const Guest = () => {
  return (
    <>
      {/* Hero Section */}
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

      {/* Line */}
      <div className="h-0.5 w-full bg-dark mt-18"></div>

      {/* FAQ */}
      <section className="mt-20">
        <Container extraClass={"flex flex-col items-center"}>
          <div className="flex flex-col items-center mx-auto w-2xl text-center">
            <div className="flex items-center gap-1.5 px-4 py-2 shadow w-max rounded-4xl">
              <span className="w-2 h-2 rounded-full bg-dark"></span>
              <span className="font-medium text-sm">FAQ</span>
            </div>
            <h2 className="text-5xl font-bold mt-3 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg">
              Everything you need to know about ExpenseTracker AI and how it can
              transform your financial management.
            </p>
          </div>
          <div className="flex flex-col gap-8 mt-12">
            {faq.map((item) => (
              <div
                key={item.title}
                className="flex gap-8 w-4xl p-6 shadow-xl rounded-2xl"
              >
                <div className="min-w-[32px] h-[32px] rounded-xl bg-dark text-white flex items-center justify-center">
                  <span>{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="mt-28">
        <Container extraClass={"flex flex-col items-center"}>
          <div className="flex flex-col items-center mx-auto w-2xl text-center">
            <div className="flex items-center gap-1.5 px-4 py-2 shadow w-max rounded-4xl">
              <span className="w-2 h-2 rounded-full bg-dark"></span>
              <span className="font-medium text-sm">Testimonials</span>
            </div>
            <h2 className="text-5xl font-bold mt-3 mb-4">What Our User Say</h2>
            <p className="text-lg">
              Join thousands of satisfied users who have transformed their
              financial habits with ExpenseTracker AI.
            </p>
          </div>
          <div className="flex gap-6 mt-12">
            {testimonials.map((item) => (
              <div className="p-6 shadow-xl rounded-xl" key={item.name}>
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-full bg-dark text-white grid place-items-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm">Verified User</p>
                  </div>
                </div>
                <p>&quot;{item.desc}&quot;</p>
                <div className="mt-5">
                  {item.stars.map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* footer */}
      <section className="bg-dark mt-28 py-16">
        <Container extraClass={"flex gap-[200px]"}>
          <div className="w-xs">
            <h3 className="text-white text-2xl font-bold mb-6">
              Expense Tracker
            </h3>
            <p className="text-white">
              Intelligent financial management powered by AI. Track your
              expenses, manage your budget, and gain insights into your spending
              patterns.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2 mt-6">
              <Link className="text-white" href={"/"}>
                Home
              </Link>
              <Link className="text-white" href={"/about"}>
                About
              </Link>
              <Link className="text-white" href={"/contact"}>
                Contact
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Quick Links</h4>
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
      </section>
    </>
  );
};

export default Guest;

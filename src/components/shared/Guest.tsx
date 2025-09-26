import Link from "next/link";
import Container from "./Container";
import { faq, features, metrics, testimonials } from "@/constants";

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
          <div className="text-center md:w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mt-3 mb-6">
              Welcome to Expense Tracker AI
            </h1>
            <p className="text-lg md:text-xl">
              Track your expenses, manage your budget, and get AI-powered
              insights to take control of your finances with intelligent
              automation.
            </p>
          </div>

          {/*Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <Link
              className="bg-dark text-white py-4 px-4 md:px-8 rounded-xl flex items-center gap-2"
              href={"/sign-up"}
            >
              <span>Get Started</span>
              <span>→</span>
            </Link>
            <Link
              className="bg-transparent border-dark border-1 py-4 px-4 md:px-8 rounded-xl"
              href={"#features"}
            >
              Learn More
            </Link>
          </div>

          {/* Cards */}
          <div className="flex flex-col w-full lg:w-4xl md:flex-row gap-8 items-center mt-12">
            {metrics.map((item) => (
              <div
                className="p-8 shadow-xl w-full rounded-xl grow text-center"
                key={item.title}
              >
                <h3 className="text-4xl font-bold">{item.detail}</h3>
                <p className="text-xl font-medium mt-3">{item.title}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Line */}
      <div className="h-0.5 w-full bg-dark mt-18"></div>

      {/* Features */}
      <section id="features" className="mt-20">
        <Container>
          <div className="flex flex-col items-center mx-auto lg:w-3xl text-center">
            <div className="flex items-center gap-1.5 px-4 py-2 shadow w-max rounded-4xl">
              <span className="w-2 h-2 rounded-full bg-dark"></span>
              <span className="font-medium text-sm">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Why Choose ExpenseTracker AI?
            </h2>
            <p className="text-base md:text-lg">
              Discover the powerful features that make our AI-driven platform
              the smart choice for modern financial management.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:justify-between mt-12">
            {features.map((item) => (
              <div className="p-8 shadow-xl rounded-xl grow" key={item.title}>
                <div className="w-12 h-12 rounded-xl bg-dark grid place-items-center">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold my-4">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <Container extraClass={"flex flex-col items-center"}>
          <div className="flex flex-col items-center mx-auto lg:w-2xl text-center">
            <div className="flex items-center gap-1.5 px-4 py-2 shadow w-max rounded-4xl">
              <span className="w-2 h-2 rounded-full bg-dark"></span>
              <span className="font-medium text-sm">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg">
              Everything you need to know about ExpenseTracker AI and how it can
              transform your financial management.
            </p>
          </div>
          <div className="flex flex-col gap-8 mt-12">
            {faq.map((item) => (
              <div
                key={item.title}
                className="flex gap-8 lg:w-4xl p-6 shadow-xl rounded-2xl"
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
          <div className="flex flex-col items-center mx-auto md:w-2xl text-center">
            <div className="flex items-center gap-1.5 px-4 py-2 shadow w-max rounded-4xl">
              <span className="w-2 h-2 rounded-full bg-dark"></span>
              <span className="font-medium text-sm">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              What Our User Say
            </h2>
            <p className="text-base md:text-lg">
              Join thousands of satisfied users who have transformed their
              financial habits with ExpenseTracker AI.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-12">
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

      {/* Line */}
      <div className="h-0.5 w-full bg-dark mt-20"></div>

      {/* CTA */}
      <section className="flex items-center justify-center  mt-20">
        <Container extraClass={"flex flex-col items-center"}>
          {/* Heading */}
          <div className="flex items-center gap-1.5 px-4 py-2 shadow w-max rounded-4xl">
            <span className="w-2 h-2 rounded-full bg-dark"></span>
            <span className="font-medium text-sm">
              Ready to Transform Your Finances?
            </span>
          </div>
          <div className="text-center lg:w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6">
              Take Control of Your Financial Future
            </h1>
            <p className="text-lg md:text-xl">
              Join thousands of users who have already transformed their
              financial habits with ExpenseTracker AI. Start your journey
              towards smarter budgeting today.
            </p>
          </div>

          {/*Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <Link
              className="bg-dark text-white py-4 px-4 md:px-8 rounded-xl flex items-center gap-2"
              href={"/sign-up"}
            >
              <span>Get Started</span>
              <span>→</span>
            </Link>
            <Link
              className="bg-transparent border-dark border-1 py-4 px-4 md:px-8 rounded-xl"
              href={"#features"}
            >
              Learn More
            </Link>
          </div>

          {/* Cards */}
          <div className="flex flex-col lg:w-4xl md:flex-row gap-8 mt-12">
            <div className="p-8 w-full grow text-center">
              <h3 className="text-4xl font-bold">Free</h3>
              <p className="text-xl font-medium mt-3">
                No credit card required
              </p>
            </div>
            <div className="p-8 w-full grow text-center">
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-xl font-medium mt-3">AI-powered support</p>
            </div>
            <div className="p-8 w-full grow text-center">
              <h3 className="text-4xl font-bold">Instant</h3>
              <p className="text-xl font-medium mt-3">Setup in minutes</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Guest;

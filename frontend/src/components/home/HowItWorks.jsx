function HowItWorks() {

  const steps = [
    "Register Account",
    "Login Securely",
    "Start Exam",
    "Submit Answers",
    "View Results",
  ];

  return (
    <section className="py-20">

      <h2 className="text-4xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="flex flex-wrap justify-center gap-6">

        {steps.map((step, index) => (
          <div
            key={step}
            className="bg-gray-800 p-6 rounded-xl"
          >
            {index + 1}. {step}
          </div>
        ))}

      </div>

    </section>
  );
}

export default HowItWorks;
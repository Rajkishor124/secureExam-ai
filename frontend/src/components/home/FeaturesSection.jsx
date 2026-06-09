

function FeaturesSection() {

  const features = [
    "Secure Authentication",
    "Real-Time Exam Timer",
    "Anti-Cheating Detection",
    "Role-Based Access",
    "Automated Evaluation",
    "Result Management",
  ];

  return (
    <section className="py-20">

      <h2 className="text-4xl font-bold text-center mb-12">
        Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

        {features.map((feature) => (
          <div
            key={feature}
            className="bg-gray-800 p-8 rounded-xl"
          >
            <h3 className="text-xl font-semibold">
              {feature}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
}

export default FeaturesSection;
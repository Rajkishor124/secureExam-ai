function StatsSection() {

  return (
    <section className="py-20">

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

        <div className="text-center">
          <h3 className="text-4xl font-bold text-blue-500">
            100+
          </h3>
          <p>Students</p>
        </div>

        <div className="text-center">
          <h3 className="text-4xl font-bold text-blue-500">
            50+
          </h3>
          <p>Exams</p>
        </div>

        <div className="text-center">
          <h3 className="text-4xl font-bold text-blue-500">
            95%
          </h3>
          <p>Accuracy</p>
        </div>

        <div className="text-center">
          <h3 className="text-4xl font-bold text-blue-500">
            24/7
          </h3>
          <p>Availability</p>
        </div>

      </div>

    </section>
  );
}

export default StatsSection;
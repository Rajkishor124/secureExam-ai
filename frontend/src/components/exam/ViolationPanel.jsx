function ViolationPanel({ violations }) {

  return (
    <div className="bg-yellow-500 text-black p-4 rounded mb-6 text-xl font-bold">

      Violations:
      {" "}
      {violations}

    </div>
  );
}

export default ViolationPanel;
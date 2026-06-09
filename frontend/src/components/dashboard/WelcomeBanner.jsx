function WelcomeBanner({ user }) {

  return (
    <div className="
      bg-linear-to-r
      from-blue-600
      to-indigo-600
      rounded-3xl
      p-8
      mb-8
    ">

      <h1 className="
        text-4xl
        font-bold
      ">
        Welcome Back,
        {" "}
        {user?.name}
      </h1>

      <p className="mt-3 text-blue-100">

        Ready to attempt your next exam?

      </p>

    </div>
  );
}

export default WelcomeBanner;
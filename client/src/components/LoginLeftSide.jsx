const LoginLeftSide = () => {
  return (
    <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">

      {/* Decorative Circle */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-10 lg:px-16">

        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          Employee
          <br />
          Management System
        </h1>

        <p className="mt-5 max-w-md text-white/80 text-base lg:text-lg leading-relaxed">
          Manage your employees, attendance, leaves and payroll
          efficiently from one place.
        </p>

      </div>
    </div>
  );
};

export default LoginLeftSide;
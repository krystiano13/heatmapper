export function Login() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form className="flex flex-col gap-8 bg-slate-800 p-8 rounded-lg w-full max-w-[90%] sm:max-w-[26rem] md:max-w-[32rem]">
        <div className="flex flex-col gap-2">
          <label className="text-white text-lg" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 text-white text-lg outline-none bg-transparent border-[1px] border-slate-200 rounded-md"
            type="email"
            name="email"
            placeholder="address@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white text-lg" htmlFor="password">
            Password
          </label>
          <input
            className="p-2 text-white text-lg outline-none bg-transparent border-[1px] border-slate-200 rounded-md"
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <button
          className="bg-blue-600 text-white p-2 pl-6 pr-6 hover:bg-blue-500 transition-colors cursor-pointer"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

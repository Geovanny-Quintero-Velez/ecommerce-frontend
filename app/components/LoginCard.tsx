// Login card component
import React from "react";

export default function LoginCard() {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
      <h1 className="text-2xl font-bold leading-tight tracking-tight text-green-700">
        Welcome Back!
      </h1>
      <form className="space-y-4" action="#">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-green-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-green-700"
            >
              Password
            </label>
            <a
              href="#"
              className="text-sm font-medium text-green-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
        <p className="text-sm font-light text-gray-500">
          You don't have an account yet?{" "}
          <a href="#" className="font-medium text-green-600 hover:underline">
            Register now
          </a>
        </p>
      </form>
    </div>
  );
}

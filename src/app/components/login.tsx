"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUserThunk } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

type LoginFormValues = {
  email: string;
  password: string;
};

export function Login() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError("");
    try {
      const result = await dispatch(loginUserThunk(values)).unwrap();
      if (result) {
        reset();
        router.push("/dashboard");
      }
    } catch (err: any) {
      setServerError(err || "Login failed");
    }
  };
  return (
    <div className="relative min-h-screen  overflow-hidden bg-gradient-to-r from-orange-100 via-yellow-100 to-green-100 px-4 md:py-26 text-slate-100 sm:px-6 lg:px-10 ">
      <div
        className="flex flex-1 items-center justify-center  py-20  p-4"
        style={{
          backgroundImage: `url('/cropped-UC-New-Logo-Border-UC-scaled-1.png')`,
          backgroundSize: " 80% 150%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
          <div className="flex w-full flex-col justify-between gap-10   pt-14 rounded-3xl border border-black bg-blue-500 p-8 shadow-xl shadow backdrop-blur-md lg:w-1/2 lg:p-10">
            <div className="space-y-3">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white">
                Urban Mobility Suite
              </span>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Operational command center for your fleet
              </h1>
              <p className="text-sm text-white sm:text-white">
                Authenticate to access bookings, fleet telemetry, route
                intelligence, and rate contracts. Designed for field teams,
                coordinators, and executive leadership.
              </p>
            </div>

            <div className="space-y-4 text-sm text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white">
                  Adaptive insights
                </p>
                <p className="text-sm">
                  Personalized dashboards tuned to your role and region.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white">
                  Enterprise grade security
                </p>
                <p className="text-sm">
                  Encrypted sessions, granular permissions, and continuous
                  monitoring.
                </p>
              </div>
              <p className="text-xs text-white">
                Need provisioning support? Email the Urban Cruise systems
                administrator.
              </p>
            </div>
          </div>

          <div className="flex w-full items-center justify-center rounded-3xl border border-black bg-transparent p-8 shadow-2xl shadow-sky-500/10 backdrop-blur-xl lg:w-[44%] lg:p-10">
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold text-black sm:text-3xl">
                  Sign in to continue
                </h2>
                <p className="text-sm text-slate-900">
                  Use your corporate credentials to access the console.
                </p>
              </div>

              {serverError && (
                <div
                  className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200"
                  role="alert"
                >
                  {serverError}
                </div>
              )}

              <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-md font-semibold uppercase tracking-[0.2em] text-slate-900"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={`w-full rounded-xl border border-black bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-slate-400 shadow-inner backdrop-blur focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-green-700 ${
                      errors.email
                        ? "border-red-400/60 focus:ring-red-400/40"
                        : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs font-medium text-red-700">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-md font-semibold uppercase tracking-[0.2em] text-slate-900"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={`w-full rounded-xl border border-black bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 shadow-inner backdrop-blur focus:border-emerald-400 focus:outline-none focus:ring-2  focus:ring-green-700${
                      errors.password
                        ? "border-red-400/60 focus:ring-red-400/40"
                        : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-xs font-medium text-red-700">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 via-sky-600 to-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Signing in…" : "Sign in securely"}
                </button>
              </form>

              <div className="space-y-2 text-center text-xs text-slate-900">
                <p>Adaptive layout across mobile, tablet, and wall displays.</p>
                <p>
                  © {new Date().getFullYear()} Urban Cruise Console. All rights
                  reserved.
                </p>
              </div>

              <div className="text-center text-sm">
                <Link
                  href="/dashboard"
                  className="text-emerald-700 transition hover:text-emerald-900 hover:bg-green-900 "
                >
                  Skip for now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
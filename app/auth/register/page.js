"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User as UserIcon, Briefcase } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "CANDIDATE",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),

            });
            console.log("register data sent", res.data);

            if (res.ok) {
                router.push("/auth/login?registered=true");
            } else {
                const json = await res.json();
                setError(json.message || "Something went wrong.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-transparent dark:border-gray-800 transition-colors duration-300">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create an account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
                            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                        </div>
                    )}
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-600 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors"
                                placeholder="Full Name"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-600 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors"
                                placeholder="Email address"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-600 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors"
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I am a</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setData({ ...data, role: "CANDIDATE" })}
                                    className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition-all ${data.role === "CANDIDATE"
                                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                                        : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
                                        }`}
                                >
                                    <UserIcon className="h-4 w-4 mr-2" />
                                    Candidate
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData({ ...data, role: "RECRUITER" })}
                                    className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition-all ${data.role === "RECRUITER"
                                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                                        : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
                                        }`}
                                >
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Recruiter
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-600/30"
                        >
                            {loading ? "Creating account..." : "Sign up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

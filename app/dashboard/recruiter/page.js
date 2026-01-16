"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PlusCircle, Users, Briefcase } from "lucide-react";

export default function RecruiterDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [jobData, setJobData] = useState({
        title: "",
        description: "",
        companyName: "",
        location: "",
        salary: "",
        jobType: "Full-time",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    if (status === "loading") return <p className="p-8">Loading...</p>;
    if (!session || session.user.role !== "RECRUITER") {
        // router.push("/auth/login"); 
        return <div className="p-8 text-center text-red-600">Access Denied: Recruiters only.</div>;
    }

    const handlePostJob = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...jobData, recruiterId: session.user.id }),
            });

            if (res.ok) {
                setMessage("Job posted successfully!");
                setJobData({ title: "", description: "", companyName: "", location: "", salary: "", jobType: "Full-time" });
                router.refresh();
            } else {
                setMessage("Failed to post job.");
            }
        } catch (error) {
            setMessage("Error posting job.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Recruiter Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Stats / Quick Actions */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                                    <Briefcase className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Jobs</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                                </div>
                            </div>
                            <button className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                                Manage Jobs
                            </button>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg text-purple-600 dark:text-purple-400">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Applicants</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">48</p>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push('/dashboard/recruiter/applications')}
                                className="w-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium py-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
                            >
                                View Applications
                            </button>
                        </div>
                    </div>

                    {/* Post Job Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 transition-colors duration-300">
                            <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                                <PlusCircle className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                                <h2 className="text-xl font-bold">Post a New Job</h2>
                            </div>

                            {message && (
                                <div className={`p-4 rounded-lg mb-6 ${message.includes("success") ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"}`}>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handlePostJob} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Job Title</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors"
                                            value={jobData.title}
                                            onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Company Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors"
                                            value={jobData.companyName}
                                            onChange={(e) => setJobData({ ...jobData, companyName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Location</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors"
                                            value={jobData.location}
                                            onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Salary</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. $80k - $100k"
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-600 dark:placeholder-gray-400 transition-colors"
                                            value={jobData.salary}
                                            onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Job Type</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors"
                                        value={jobData.jobType}
                                        onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })}
                                    >
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Description</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors"
                                        value={jobData.description}
                                        onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                                    >
                                        {loading ? "Posting..." : "Post Job"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

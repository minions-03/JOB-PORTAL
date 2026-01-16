"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FileText, CheckCircle, Clock, XCircle, Building2 } from "lucide-react";

export default function CandidateDashboard() {
    const { data: session } = useSession();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            if (session?.user?.id) {
                try {
                    // Note: We need an API to fetch applications for a user.
                    // Using a GET endpoint with query param or dedicated route.
                    // For now, let's assume /api/applications?candidateId=...

                    const res = await fetch(`/api/applications?candidateId=${session.user.id}`);
                    const data = await res.json();
                    if (data.success) {
                        setApplications(data.data);
                    }
                } catch (error) {
                    console.error("Failed to fetch applications");
                } finally {
                    setLoading(false);
                }
            }
        };

        if (session) fetchApplications();
    }, [session]);

    const getStatusColor = (status) => {
        switch (status) {
            case "ACCEPTED": return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
            case "REJECTED": return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
            case "SHORTLISTED": return "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800";
            default: return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"; // PENDING
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading applications...</div>;
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Applications</h1>

                {applications.length > 0 ? (
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {applications.map((app) => (
                                <div key={app._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {app.jobId?.title || "Job Unavailable"}
                                            </h3>
                                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                                                <Building2 className="h-4 w-4 mr-1.5" />
                                                {app.jobId?.companyName || "Unknown Company"}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                                                <Clock className="h-3 w-3 mr-1" />
                                                Applied on {new Date(app.appliedAt).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                            <Link href={app.resumeUrl} target="_blank" className="text-blue-600 hover:underline text-sm font-medium flex items-center">
                                                <FileText className="h-4 w-4 mr-1" />
                                                View Resume
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl shadow-sm transition-colors duration-300 border border-gray-100 dark:border-gray-800">
                        <div className="bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Applications Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Start exploring jobs and apply to your dream roles.</p>
                        <Link href="/jobs" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                            Find Jobs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

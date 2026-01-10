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
            case "ACCEPTED": return "text-green-600 bg-green-50 border-green-200";
            case "REJECTED": return "text-red-600 bg-red-50 border-red-200";
            case "SHORTLISTED": return "text-purple-600 bg-purple-50 border-purple-200";
            default: return "text-yellow-600 bg-yellow-50 border-yellow-200"; // PENDING
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading applications...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>

                {applications.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="divide-y divide-gray-100">
                            {applications.map((app) => (
                                <div key={app._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                {app.jobId?.title || "Job Unavailable"}
                                            </h3>
                                            <div className="flex items-center text-gray-500 text-sm mb-2">
                                                <Building2 className="h-4 w-4 mr-1.5" />
                                                {app.jobId?.companyName || "Unknown Company"}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-400">
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
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Applications Yet</h3>
                        <p className="text-gray-500 mb-6">Start exploring jobs and apply to your dream roles.</p>
                        <Link href="/jobs" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                            Find Jobs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

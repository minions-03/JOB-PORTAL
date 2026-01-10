"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { FileText, User, Mail, Calendar, Briefcase, CheckCircle, XCircle, ArrowLeft } from "lucide-react";

export default function ApplicationDetailsPage() {
    const { id } = React.use(params);
    const router = useRouter();
    const { data: session } = useSession();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplication = async () => {
            if (session?.user?.id && id) {
                try {
                    // We need a specific endpoint or update logic to get single application
                    // Reusing the general endpoint with a filter for simplicity in prototype
                    const res = await fetch(`/api/applications?recruiterId=${session.user.id}`);
                    const data = await res.json();
                    if (data.success) {
                        const app = data.data.find(a => a._id === id);
                        setApplication(app);
                    }
                } catch (error) {
                    console.error("Failed to fetch application details");
                } finally {
                    setLoading(false);
                }
            }
        };

        if (session) fetchApplication();
    }, [session, id]);

    if (loading) return <div className="p-12 text-center">Loading details...</div>;
    if (!application) return <div className="p-12 text-center text-red-500">Application not found.</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Applications
                </button>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-blue-600 px-8 py-8 flex justify-between items-center text-white">
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-3">
                                <User className="h-6 w-6" />
                                {application.candidateId?.name}
                            </h1>
                            <p className="text-blue-100 mt-1 flex items-center gap-2">
                                <Mail className="h-4 w-4" /> {application.candidateId?.email}
                            </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold bg-white/20 backdrop-blur-sm
                            ${application.status === 'ACCEPTED' ? 'text-green-200' :
                                application.status === 'REJECTED' ? 'text-red-200' : 'text-yellow-200'}`}>
                            {application.status}
                        </span>
                    </div>

                    <div className="p-8 space-y-8">
                        <div>
                            <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-blue-500" />
                                Applied For
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-xl font-bold text-gray-900">{application.jobId?.title}</p>
                                <p className="text-gray-600">{application.jobId?.companyName}</p>
                                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Applied on {new Date(application.appliedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-purple-500" />
                                Application Materials
                            </h3>
                            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        <FileText className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Resume / CV</p>
                                        <p className="text-xs text-gray-500">PDF Document</p>
                                    </div>
                                </div>
                                <a
                                    href={application.resumeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                                >
                                    View Document
                                </a>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 border-t border-gray-100 flex gap-4">
                            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-colors flex justify-center items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                Accept Application
                            </button>
                            <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-bold transition-colors flex justify-center items-center gap-2 border border-red-100">
                                <XCircle className="h-5 w-5" />
                                Reject Application
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

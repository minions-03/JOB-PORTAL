import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Job from "@/models/Job";
import User from "@/models/User"; // For population if needed
import Link from "next/link";
import { Building2, MapPin, DollarSign, Clock, ArrowLeft } from "lucide-react";
import ApplyButton from "@/components/ApplyButton"; // Client component for interaction

async function getJob(id) {
    await dbConnect();
    try {
        const job = await Job.findById(id).lean();
        if (!job) return null;
        return JSON.parse(JSON.stringify(job));
    } catch (error) {
        return null;
    }
}

export default async function JobDetailsPage({ params }) {
    const { id } = await params;
    const job = await getJob(id);

    if (!job) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/jobs" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Jobs
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-blue-600 px-8 py-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
                        <div className="relative z-10">
                            <span className="inline-block bg-blue-500 bg-opacity-30 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4 border border-blue-400">
                                {job.jobType}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{job.title}</h1>
                            <div className="flex items-center text-blue-100 font-medium text-lg">
                                <Building2 className="h-5 w-5 mr-2" />
                                {job.companyName}
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex flex-wrap gap-6 mb-8 border-b border-gray-100 pb-8 text-gray-600">
                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                                {job.location}
                            </div>
                            <div className="flex items-center">
                                <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                                {job.salary || "Competitive"}
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-purple-500" />
                                Posted {new Date(job.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {job.description}
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <div className="text-gray-900 font-medium">
                                Interested in this role?
                            </div>
                            <ApplyButton jobId={job._id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

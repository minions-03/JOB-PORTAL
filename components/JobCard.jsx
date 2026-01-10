"use client";

import Link from "next/link";
import { MapPin, Building2, Clock, DollarSign } from "lucide-react";

export default function JobCard({ job }) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden group">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {job.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm font-medium">
                            <Building2 className="h-4 w-4" />
                            <span>{job.companyName}</span>
                        </div>
                    </div>
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                        {job.jobType}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {job.description}
                </p>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2.5 text-gray-400" />
                        {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2.5 text-gray-400" />
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                    {job.salary && (
                        <div className="flex items-center text-sm font-semibold text-green-600">
                            <DollarSign className="h-4 w-4 mr-2.5" />
                            {job.salary}
                        </div>
                    )}
                </div>

                <Link
                    href={`/jobs/${job._id}`}
                    className="block w-full text-center bg-gray-50 text-gray-900 font-medium py-2.5 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

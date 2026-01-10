"use client";

import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import { Search, MapPin, Filter } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Suspense } from 'react';

function JobsPageContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [locationTerm, setLocationTerm] = useState("");

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/jobs?q=${searchTerm}`);
            const data = await res.json();
            if (data.success) {
                setJobs(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search jobs by title, company, or keywords..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex-grow relative md:max-w-xs">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                value={locationTerm}
                                onChange={(e) => setLocationTerm(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="md:w-32 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters (Mock) */}
                    <div className="hidden lg:block space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-4 font-bold text-gray-900">
                                <Filter className="h-4 w-4" />
                                <span>Filters</span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-sm text-gray-700 mb-2">Job Type</h4>
                                    <div className="space-y-2">
                                        {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                                            <label key={type} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                                <span className="text-sm text-gray-600">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <hr className="border-gray-100" />

                                <div>
                                    <h4 className="font-medium text-sm text-gray-700 mb-2">Salary Range</h4>
                                    <select className="w-full border-gray-200 rounded-md text-sm text-gray-600">
                                        <option>Any</option>
                                        <option>$30k - $50k</option>
                                        <option>$50k - $80k</option>
                                        <option>$80k - $120k</option>
                                        <option>$120k+</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job List */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                {loading ? "Searching..." : `${jobs.length} Jobs Found`}
                            </h2>
                            <div className="text-sm text-gray-500">
                                Sort by: <span className="font-medium text-gray-900 cursor-pointer">Newest</span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="animate-pulse bg-white h-48 rounded-xl"></div>
                                ))}
                            </div>
                        ) : jobs.length > 0 ? (
                            <div className="space-y-4">
                                {jobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                                <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                                <button onClick={() => { setSearchTerm(""); fetchJobs(); }} className="mt-4 text-blue-600 font-medium hover:underline">
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function JobsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 p-8">Loading...</div>}>
            <JobsPageContent />
        </Suspense>
    );
}

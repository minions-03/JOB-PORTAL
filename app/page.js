"use client";

import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("q", searchTerm);
    if (locationTerm) params.append("location", locationTerm);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-32 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                Find Your <br />
                <span className="text-blue-600 dark:text-blue-400">Dream Job</span> Today
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
                Connecting thousands of job seekers with top employers. Browse jobs, apply effortlessly, and track your career progress.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 flex flex-col sm:flex-row gap-3 border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto lg:mx-0 transition-colors">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Job title, keywords..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-100 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="relative flex-grow sm:border-l border-gray-200 dark:border-gray-600">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Location"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-100 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none transition-colors"
                    value={locationTerm}
                    onChange={(e) => setLocationTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
                >
                  Search
                </button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 text-sm font-medium text-gray-500">
                <span>Popular:</span>
                <Link href="/jobs?q=Remote" className="text-blue-600 hover:text-blue-800 hover:underline">Remote</Link>
                <Link href="/jobs?q=Developer" className="text-blue-600 hover:text-blue-800 hover:underline">Developer</Link>
                <Link href="/jobs?q=Design" className="text-blue-600 hover:text-blue-800 hover:underline">Design</Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
              <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              <img
                src="/hero-job-search.png"
                alt="Job Search Illustration"
                className="relative z-10 w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide the best tools for both candidates and recruiters to ensure a smooth hiring process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Easy Application", desc: "Apply to multiple jobs with one click using your stored resume." },
              { title: "Real-time Tracking", desc: "Get instant updates on your application status from recruiters." },
              { title: "Verified Recruiters", desc: "Connect with legitimate employers from top companies." }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 font-bold text-xl">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-gray-900 py-20 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-blue-600 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to start your career journey?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Create your profile today and get discovered by top recruiters. It takes less than 5 minutes.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/auth/register" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg">
                Get Started
              </Link>
              <Link href="/jobs" className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-all shadow-lg border border-blue-500">
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

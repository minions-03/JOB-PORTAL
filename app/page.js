import Link from "next/link";
import { Search, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500 opacity-90"></div>
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500 opacity-30 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Find Your <span className="text-yellow-300">Dream Job</span> Today
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Connecting thousands of job seekers with top employers. Browse jobs, apply effortlessly, and track your career progress.
          </p>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Job title, keywords..."
                className="block w-full pl-10 pr-3 py-3 border-none rounded-md focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-700"
              />
            </div>
            <div className="relative flex-grow border-l border-gray-200">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="block w-full pl-10 pr-3 py-3 border-none rounded-md focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-700"
              />
            </div>
            <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors shadow-lg">
              Search
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-4 text-sm font-medium text-blue-200">
            <span>Popular:</span>
            <Link href="/jobs?q=Remote" className="hover:text-white underline decoration-blue-400 underline-offset-4">Remote</Link>
            <Link href="/jobs?q=Developer" className="hover:text-white underline decoration-blue-400 underline-offset-4">Developer</Link>
            <Link href="/jobs?q=Design" className="hover:text-white underline decoration-blue-400 underline-offset-4">Design</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best tools for both candidates and recruiters to ensure a smooth hiring process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Easy Application", desc: "Apply to multiple jobs with one click using your stored resume." },
              { title: "Real-time Tracking", desc: "Get instant updates on your application status from recruiters." },
              { title: "Verified Recruiters", desc: "Connect with legitimate employers from top companies." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600 font-bold text-xl">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 border-t border-gray-100">
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

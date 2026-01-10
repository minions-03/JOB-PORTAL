"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle, Loader2 } from "lucide-react";

export default function ApplyButton({ jobId }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [applied, setApplied] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [resumeLink, setResumeLink] = useState("");

    const handleApply = async (e) => {
        e.preventDefault();
        if (!session) {
            router.push("/auth/login");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jobId,
                    resumeUrl: resumeLink || "https://example.com/resume.pdf",
                    candidateId: session.user.id
                }),
            });

            if (res.ok) {
                setApplied(true);
                setShowModal(false);
            } else {
                alert("Failed to apply");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Simplified: Allow everyone to apply for demo purposes.
    if (applied) {
        return (
            <button disabled className="bg-green-100 text-green-700 font-bold py-3 px-6 rounded-lg flex items-center gap-2 cursor-default">
                <CheckCircle className="h-5 w-5" />
                Applied Successfully
            </button>
        );
    }

    return (
        <>
            <button
                onClick={() => {
                    if (!session) router.push("/auth/login");
                    else setShowModal(true);
                }}
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
                Apply Now
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Application</h3>
                        <form onSubmit={handleApply}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Resume URL (PDF/Link)
                                </label>
                                <div className="relative">
                                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="url"
                                        placeholder="https://linkedin.com/in/..."
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={resumeLink}
                                        onChange={(e) => setResumeLink(e.target.value)}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">For this demo, simply paste any URL as your resume.</p>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2"
                                >
                                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

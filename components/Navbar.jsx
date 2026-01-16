"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, Briefcase, User } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-transparent dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <Briefcase className="h-8 w-8 text-blue-600" />
                            <span className="font-bold text-2xl text-gray-900 dark:text-white tracking-tight">
                                JobPortal
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                            Find Jobs
                        </Link>

                        {session?.user?.role === 'RECRUITER' && (
                            <Link href="/dashboard/recruiter" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                                Recruiter Dashboard
                            </Link>
                        )}

                        {session?.user?.role === 'CANDIDATE' && (
                            <Link href="/dashboard/candidate" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                                My Applications
                            </Link>
                        )}

                        {session ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 hidden lg:block">Hi, {session.user.name || session.user.email}</span>
                                <button
                                    onClick={() => signOut()}
                                    className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-medium hover:bg-red-100 transition-colors text-sm"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/auth/login"
                                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        <Link href="/jobs" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                            Find Jobs
                        </Link>
                        {session ? (
                            <>
                                {session?.user?.role === 'RECRUITER' && (
                                    <Link href="/dashboard/recruiter" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                                        Recruiter Dashboard
                                    </Link>
                                )}
                                {session?.user?.role === 'CANDIDATE' && (
                                    <Link href="/dashboard/candidate" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                                        My Applications
                                    </Link>
                                )}
                                <button
                                    onClick={() => signOut()}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                                    Login
                                </Link>
                                <Link href="/auth/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 font-bold hover:bg-blue-50">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

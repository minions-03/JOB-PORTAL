import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Application from "@/models/Application";
import Job from "@/models/Job";
import { getServerSession } from "next-auth/next";
import { GET as authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    try {
        const body = await req.json();
        const { jobId, resumeUrl, candidateId } = body;

        if (!candidateId) {
            return NextResponse.json({ success: false, message: "User ID required" }, { status: 400 });
        }

        await dbConnect();

        // Check if already applied
        const existing = await Application.findOne({ jobId, candidateId });
        if (existing) {
            return NextResponse.json({ success: false, message: "Already applied" }, { status: 400 });
        }

        const application = await Application.create({
            jobId,
            candidateId,
            resumeUrl,
        });

        return NextResponse.json({ success: true, data: application }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed" }, { status: 400 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const candidateId = searchParams.get("candidateId");
        const recruiterId = searchParams.get("recruiterId");

        await dbConnect();

        if (candidateId) {
            const applications = await Application.find({ candidateId }).populate("jobId").sort({ appliedAt: -1 });
            return NextResponse.json({ success: true, data: applications });
        }

        if (recruiterId) {
            const jobs = await Job.find({ recruiterId }).select('_id');
            const jobIds = jobs.map(job => job._id);

            const applications = await Application.find({ jobId: { $in: jobIds } })
                .populate("jobId")
                .populate("candidateId", "name email")
                .sort({ appliedAt: -1 });

            return NextResponse.json({ success: true, data: applications });
        }

        return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch apps" }, { status: 500 });
    }
}

import { baseApi } from "@/uitils/commonApi";
import { NextResponse } from "next/server";
import axios from "axios";

const leadApi = `${baseApi}/lead`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const response = await axios.get(leadApi, { params });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Axios Error:", error.message);

    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const response = await axios.post(leadApi, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error("Lead Creation Error Details:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create lead";

    return NextResponse.json(
      {
        error: errorMessage,
        details: error.response?.data,
        status: error.response?.status,
      },
      { status: error.response?.status || 500 },
    );
  }
}

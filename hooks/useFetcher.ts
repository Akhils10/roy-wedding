"use client";

import { AppState } from "@/store/configureStore";
import fetcher from "@/utils/fetcher";
import { useSelector } from "react-redux";

export const useFetch = () => {
	const token = useSelector((state: AppState) => state.user.token);

	const fetchWithToken = async (
		url: string,
		method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
		body: Record<string, any> | null = null
	) => {
		const headers = { Authorization: `Bearer ${token}` };
		return fetcher(url, method, body, headers);
	};

	return fetchWithToken;
};
import { toast } from "react-hot-toast";
const isOnline = () => {
	return navigator.onLine;
};

async function fetcher<T>(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
	body: Record<string, any> | null = null,
	customHeaders?: Record<string, string>
) {
	try {
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...customHeaders,
		};

		const options: RequestInit = {
			method,
			headers,
		};

		if (body) {
			options.body = JSON.stringify(body);
		}
		const res = await fetch(url, options);
		const response = await res.json();

		if (!res.ok) {
			throw new Error(response.error || 'An error occurred!')
		}

		return response;
	} catch (error: any) {
		// return !isOnline()
		// 	? toast.error(`Oopsies, seems you don't have internet`)
		// 	: toast.error(error?.message || 'An error occurred!')
		throw new Error(error?.message || 'An error occurred')
	}
}

export default fetcher;

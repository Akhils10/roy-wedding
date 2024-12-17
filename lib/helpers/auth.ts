import HttpException from "./HttpException";
import jwt from "jsonwebtoken";
import { prismaClient } from "../prisma/client";
import { CreateAdminPayload, SigninAdminPayload } from "./types";
import { compare, hash } from "bcryptjs";
import { sanitize } from ".";

export const JWT_SECRET = process.env.JWT_SECRET || "j783n@rsa"
export const authenticate = async (token: string) => {
	if (!token) throw new HttpException(401, "Unauthorized");
	try {
		const decoded: any = jwt.verify(token, JWT_SECRET);
		const admin = await getAdmin(decoded.username);
		if (!admin) throw new HttpException(403, "Authorized");
		const newToken = jwt.sign(
			{ id: admin.id, username: admin.username, roles: admin.roles },
			JWT_SECRET,
			{
				expiresIn: "24h",
			}
		);
		const loggedInAdmin = await prismaClient.admin.update({
			data: {
				token: newToken,
			},
			where: {
				id: admin.id,
			},
		});
		return loggedInAdmin;
	} catch (error) {
		throw new HttpException(403, "Authorized");
	}
};

export const signin = async (payload: SigninAdminPayload) => {
	try {
		const { username, password } = sanitize<SigninAdminPayload>(payload, [
			"password",
		]);

		const admin = await getAdmin(username);
		console.log(admin, "details");
		if (!admin) throw new HttpException(400, "Invalid username or password");
		const isValidPassword = await compare(password, admin.password);
		if (!isValidPassword)
			throw new HttpException(400, "Invalid username or password");

		const token = jwt.sign(
			{ id: admin.id, username: admin.username, roles: admin.roles },
			JWT_SECRET,
			{
				expiresIn: "24h",
			}
		);

		const loggedInAdmin = await prismaClient.admin.update({
			data: {
				token,
			},
			where: {
				id: admin.id,
			},
		});

		return loggedInAdmin;
	} catch (error: any) {
		throw new HttpException(error.status, error.message);
	}
};

export const signup = async (payload: CreateAdminPayload) => {
	try {
		const { roles, ...rest } = payload;
		const { username, password } = sanitize<SigninAdminPayload>(rest, ["password"]);
		if (!username || !password)
			throw new HttpException(400, "Username and password is required");

		const admin = await getAdmin(username);
		if (admin) throw new HttpException(400, "Admin with the username already exist");
		const hashedPassword = await hash(password, 10);

		const newAdmin = await prismaClient.admin.create({
			data: {
				username,
				password: hashedPassword,
				roles,
			},
		});

		return newAdmin;
	} catch (error: any) {
		throw new HttpException(error.status, error.message);
	}
};

export const getAdmin = async (username: string) => {
	try {
		const admin = await prismaClient.admin.findFirst({
			where: { username },
		});
		return admin;
	} catch (error: any) {
		console.log(error, "error");
		throw new HttpException(error.status, error.message);
	}
};

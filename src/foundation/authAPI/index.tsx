import Axios from "axios";
import { IRegisterCrendential} from "./IAuthAPI";


interface LoginCredential {
	password: string;
	email: string;
}


async function RegisterAPI(registerCredential: IRegisterCrendential ) {
	const response = await Axios.post(`/api/users/register`, registerCredential);
	if (response.data.auth) {
		return {
			auth: true,
			msg: "Register Successfully",
		};
	} else {
		return {
			auth: false,
			msg:
				response.data.err.name === "UserExistsError"
					? "A user with the given email is already registered"
					: response.data.err.message,
		};
	}
}

async function LogoutAPI() {
	try {
		const response = await Axios.post(`/api/users/logout`);
		return response;
	}
	catch (err) {
		console.log(err);
		return;
	}
}

async function LoginAPI(credential: LoginCredential) {
	try {
		const response = await Axios.post(`/api/users/login`, credential);
		if (response.data.auth) {
			return {
				auth: response.data.auth,
			};
		}
		return { auth: false, msg: response.data.msg };
	} catch (e) {
		console.log("Error");
		console.log(e);
		return { auth: false, msg: e };
	}
}

async function isLoggedIn() {
	const response = await Axios.post(`/api/users/auth`);
	if (response.data.auth) {
		return response.data;
	}
	return { auth: response.data.auth, id: "", lastName:"", firstName:"",email:"" };
}



export { LogoutAPI, LoginAPI, isLoggedIn, RegisterAPI };

import Axios, { AxiosResponse } from "axios";
import { showToast } from "../../foundation/utils/ToastMessage.tsx"
import { IUser } from "../../types/auth";
import { IGetSingleUser,IUpdateUserProfile,IUpdateUserProfileResponse,IUpdateUserAvatarResponse} from "./IUserAPI";


async function GetUserList(query: string) {
	if (!query) {
		return [];
	}
	try {
		const response = await Axios.get(`/api/users/user-list/${query}`);
		return response.data;
	}
	catch (err) {
		console.log(err);
		return;
	}
}

async function GetUserProfile({userEmail}: IGetSingleUser) {
	try {
		const res: AxiosResponse<IUser,IGetSingleUser> = await Axios.get(`/api/users/single/${userEmail}`);
		const result = res.data;
		return result;
	} catch (err) {
		if (Axios.isAxiosError(err)) {
			// showToast("error", err.response!.data.message, { containerId: shareProjectParams.toastContainer })
			console.log('err');
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
}

async function UpdateUserProfile(updateCredential: IUpdateUserProfile) {
	try {
		const res:AxiosResponse<IUpdateUserProfileResponse,IUpdateUserProfile> = await Axios.post(`/api/users/update`, updateCredential )
		showToast("success", res.data.message, { containerId: "UserProfileToast" })
		const result = res.data;
		return result
	}
	catch (err) {
		if (Axios.isAxiosError(err)) {
			showToast("error", err.response!.data.message, { containerId: "UserProfileToast" })
			console.log('err');
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}
	
}

async function UpdateUserAvatar(updateCredential: FormData) {
	try {
		const res:AxiosResponse<IUpdateUserAvatarResponse,FormData> = await Axios.post(`/api/users/update-avatar`, updateCredential )
		showToast("success", res.data.message, { containerId: "UserProfileToast" })
		const result = res.data;
		return result
	}
	catch (err) {
		if (Axios.isAxiosError(err)) {
			showToast("error", err.response!.data.message, { containerId: "UserProfileToast" })
			console.log('err');
		}
		else {
			throw new Error("An unexpected error occurred")
		}
	}	
}

export { GetUserProfile,UpdateUserProfile,UpdateUserAvatar,GetUserList};
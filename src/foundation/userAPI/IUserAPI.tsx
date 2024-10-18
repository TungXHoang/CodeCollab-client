import { IUser } from "../../types/auth";

export interface IGetSingleUser {
	userEmail: string;
}

export interface IUpdateUserProfile {
	requestId: string;
	changeId: string;
	newFirstName: string;
	newLastName: string;
	newEmail: string;
}

export interface IUpdateUserProfileResponse{
	message: string;
	updatedUser: IUser;
}

export interface IUpdateUserAvatarResponse extends IUpdateUserProfileResponse { }
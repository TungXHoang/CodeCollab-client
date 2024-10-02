import { useState, useEffect } from 'react';
import Axios from "axios";
import { IUser } from "../types/auth"

export interface IGuestList {
	_id?: string,
	project: string,
	guest: IUser,
}

function useGetGuests(projectId: string) {
	const [loadingGuests, setLoadingGuests] = useState(false);
	const [guestsList, setGuestsList] = useState<IGuestList[] | undefined>(undefined);

	useEffect(() => {
		const getGuests = async () => {
			try {
				setLoadingGuests(true);
				const res = await Axios.get(`/api/guests/${projectId}`);
				setGuestsList(res.data as IGuestList[]);
			}
			catch (err) {
				console.log(err)
			}
			finally {
				setLoadingGuests(false);
			}
			
		};
		getGuests();
	}, [projectId]);

	return { loadingGuests, guestsList,setGuestsList };
}

export {useGetGuests} ;
import { useState, useRef } from 'react';
import useClickOutside from "../../hooks/useClickOutside";
import { GetUserList } from "../../foundation/userAPI";
import  {useDebounce}  from "../../hooks/useDebounce";
import { IAuthUser } from "../../types/auth";

interface ISearchSuggest {
	filterQuery: string,
	setFilterQuery:(user:string)=>void;
}

const SearchSuggest = ({ filterQuery, setFilterQuery }: ISearchSuggest) => {
	const [loadingUser, setLoading] = useState(false);
	const [ userList, setUserList] = useState<IAuthUser[] | undefined>(undefined);
	const [showSearchDropdown, setShowSearchDropdown] = useState(false);
	const ulRef = useRef<HTMLUListElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useClickOutside({
		disable: false, isOpen: showSearchDropdown, targetRef: ulRef, toggleButtonRef: inputRef,
		onClickOutside: () => {
			setShowSearchDropdown(false);
		}
	});

	const handleOnClick = (userEmail:string) => {
		setFilterQuery(userEmail);
		setShowSearchDropdown(false);
	}

	
	const debouncedRequest = useDebounce(async () => {
		try {
			setLoading(true);
			const res = await GetUserList(filterQuery);
			setUserList(res);
		}
		catch(err) {
			console.log(err);
		}
		finally {
			setLoading(false);
		}
	},500);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		setFilterQuery(e.currentTarget.value)
		debouncedRequest();
  };

	return (
		<div className="w-[417px] text-[14px] flex flex-col relative">
			<input ref={inputRef} onFocus={() => setShowSearchDropdown(true)} autoFocus={false} autoComplete="off" required name="email" placeholder="Enter email..." className="text-[13px] outline-none focus:border-[#0079F2] px-2 py-1 w-full bg-[#2B3245] border-[1px] border-[#3C445C] hover:border-[#5F677A] rounded-[4px]" type="email" value={filterQuery} onChange={onChange} />
			{ showSearchDropdown && filterQuery !== "" && (
				loadingUser ? (
					<div className={`flex items-center gap-[8px] p-[8px] bg-[#2B3245] rounded-[6px] mt-[5px] z-10 border-[#3C445C] border-[1px]`}>
						<div className="small-loader w-[14px]"></div>
						<div className="text-[14px] leading-[1.6] text-[#FFFFFF]">Loading...</div>
					</div>
				) : (userList &&
						<ul ref={ulRef} role="listbox" className={`max-h-[280px] ${userList.length === 0 ? 'hidden' : ''} absolute w-full flex flex-col shrink-0 outline-none bg-[#2B3245] rounded-[6px] top-[38px] z-10 border-[#3C445C] border-[1px]`}>
							{userList.map((user) => (
								<li key={user._id} onClick={() => handleOnClick(user.email)} 
									className="hover:bg-[#0053A6] first:rounded-t-[5px] last:rounded-b-[5px] p-[8px] flex flex-row gap-[8px] items-center cursor-pointer">
									<div className="flex gap-[8px] flex-row items-center">
										<img className="bg-[hsl(0,0%,100%)]/[0.9] rounded-full w-[16px] h-[16px] mr-[5px]"  src={user.thumbnailUrl} alt="avatar"/>
										<span className="text-[14px] leading-[1.6]">{user.email}</span>
									</div>
								</li>
							))}
						</ul>
        )
    )
}
			
		</div>
			
	)
}

export default SearchSuggest
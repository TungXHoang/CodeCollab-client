import { useRef, useMemo, useEffect } from "react";
import _ from "lodash"


const useDebounce = (cb: () => void, waitTime:number) => {
	//init ref
	const ref = useRef<typeof cb>();

	useEffect(() => {
    ref.current = cb;
	}, [cb]);
	
	// creating debounced callback only once - on mount
	const debounceCallback = useMemo(() => {
		const func = () => {
			//ref.current is a reference to the latest callback
			ref.current?.();
		}
			// debounce the func that was created once, but has access to the latest callback
		return _.debounce(func, waitTime,{ 'maxWait': 7000 })
	}, [])
	
	return debounceCallback
}

export {useDebounce}
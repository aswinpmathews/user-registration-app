import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

type Thunk<Arg> = (arg: Arg) => any;

export function useThunk<Arg = void>(
    thunk: Thunk<Arg>
): [(arg?: Arg) => void, boolean, any] {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const runThunk = useCallback(
        (arg?: Arg) => {
            setIsLoading(true);
            setError(null);
            return dispatch(thunk(arg as Arg))
                .unwrap()              
                .catch((err: any) => {
                    setError(err.message ?? "Unknown Error")
                    throw err.message;
                })
                .finally(() => setIsLoading(false));
        },
        [dispatch, thunk]
    );

    return [runThunk, isLoading, error];
}




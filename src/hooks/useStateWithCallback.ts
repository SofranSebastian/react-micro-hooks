import { useState, useRef, useEffect } from 'react';

export function useStateWithCallback<T>(
    initialValue: T
): [
    T,
    (
        newValue: T | ((prevValue: T) => T),
        callback?: (newValue: T) => void
    ) => void
] {
    const [value, setValue] = useState<T>(initialValue);
    const callbackRef = useRef<((newValue: T) => void) | null>(null);

    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(value);
            callbackRef.current = null;
        }
    }, [value]);

    const setValueWithCallback = (
        newValue: T | ((prevValue: T) => T),
        callback?: (newValue: T) => void
    ) => {
        callbackRef.current = callback || null;
        setValue(newValue);
    };

    return [value, setValueWithCallback];
}

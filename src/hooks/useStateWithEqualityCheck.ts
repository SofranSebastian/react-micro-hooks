import { useState, useRef } from 'react';

export function useStateWithEqualityCheck<T>(
    initialValue: T,
    equalityFn: (a: T, b: T) => boolean = (a, b) =>
        JSON.stringify(a) === JSON.stringify(b)
) {
    const [value, setValue] = useState<T>(initialValue);
    const valueRef = useRef<T>(initialValue);

    const setValueWithCheck = (newValue: T | ((prevValue: T) => T)) => {
        const resolvedValue =
            typeof newValue === 'function'
                ? (newValue as Function)(value)
                : newValue;

        if (!equalityFn(valueRef.current, resolvedValue)) {
            valueRef.current = resolvedValue;
            setValue(resolvedValue);
        }
    };

    return [value, setValueWithCheck] as const;
}

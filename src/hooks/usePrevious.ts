import { useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<{ value: T; previous: T | undefined }>();

    if (!ref.current) {
        ref.current = { value, previous: undefined };
    } else if (ref.current.value !== value) {
        ref.current = {
            value,
            previous: ref.current.value,
        };
    }

    return ref.current?.previous;
}

import { useState, useCallback } from 'react';

export function useClipboard(timeout = 2000) {
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const copy = useCallback(
        async (text: string) => {
            try {
                await navigator.clipboard.writeText(text);
                setIsCopied(true);
                setError(null);

                setTimeout(() => setIsCopied(false), timeout);
            } catch (error) {
                setError(error as Error);
                setIsCopied(false);
            }
        },
        [timeout]
    );

    const read = useCallback(async () => {
        try {
            const text = await navigator.clipboard.readText();
            setError(null);
            return text;
        } catch (error) {
            setError(error as Error);
            return null;
        }
    }, []);

    return { isCopied, copy, read, error };
}

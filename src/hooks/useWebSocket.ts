import { useCallback, useEffect, useRef, useState } from 'react';

interface WebSocketOptions {
    onMessage?: (data: any) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onError?: (error: Event) => void;
    reconnect?: boolean;
    reconnectInterval?: number;
    reconnectAttempts?: number;
}

export function useWebSocket<T = any>(url: string, options: WebSocketOptions) {
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectCount = useRef(0);
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState<T | null>(null);

    const connect = useCallback(() => {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
            setIsConnected(true);
            reconnectCount.current = 0;
            options.onOpen?.();
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as T;
                setLastMessage(data);
                options.onMessage?.(event);
            } catch (error) {
                console.error('Failed to parse message:', error);
            }
        };

        ws.onclose = () => {
            setIsConnected(false);
            options.onClose?.();
            if (
                options.reconnect &&
                reconnectCount.current < (options.reconnectAttempts || 5)
            ) {
                reconnectCount.current++;
                setTimeout(connect, options.reconnectInterval || 3000);
            }
        };

        ws.onerror = (error) => {
            options.onError?.(error);
        };
    }, [url, options]);

    const sendMessage = useCallback((data: any) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(data));
        }
    }, []);

    const close = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.close();
        }
    }, []);

    useEffect(() => {
        connect();
        return () => close();
    }, [connect, close]);

    return { isConnected, lastMessage, sendMessage, close };
}

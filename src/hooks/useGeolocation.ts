import { useState, useEffect } from 'react';

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
    timestamp: number | null;
}

interface UseGeolocationOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
    watch?: boolean;
}

interface UseGeolocationReturn {
    position: GeolocationState;
    error: string | null;
    isLoading: boolean;
    isSupported: boolean;
}

export function useGeolocation(
    options: UseGeolocationOptions = {}
): UseGeolocationReturn {
    const {
        enableHighAccuracy = false,
        timeout = 10000,
        maximumAge = 0,
        watch = false,
    } = options;

    const [position, setPosition] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        timestamp: null,
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        if (typeof navigator === 'undefined' || !navigator.geolocation) {
            setError('Geolocation is not supported by this browser');
            setIsLoading(false);
            setIsSupported(false);
            return;
        }

        setIsSupported(true);

        const onSuccess = (position: globalThis.GeolocationPosition) => {
            setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude ?? null,
                altitudeAccuracy: position.coords.altitudeAccuracy ?? null,
                heading: position.coords.heading ?? null,
                speed: position.coords.speed ?? null,
                timestamp: position.timestamp,
            });
            setError(null);
            setIsLoading(false);
        };

        const onError = (error: GeolocationPositionError) => {
            let errorMessage = 'An unknown error occurred';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'User denied the request for Geolocation.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'The request to get user location timed out.';
                    break;
            }

            setError(errorMessage);
            setIsLoading(false);
        };

        const geoOptions: PositionOptions = {
            enableHighAccuracy,
            timeout,
            maximumAge,
        };

        let watchId: number | null = null;

        if (watch) {
            watchId = navigator.geolocation.watchPosition(
                onSuccess,
                onError,
                geoOptions
            );
        } else {
            navigator.geolocation.getCurrentPosition(
                onSuccess,
                onError,
                geoOptions
            );
        }

        return () => {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [enableHighAccuracy, timeout, maximumAge, watch]);

    return {
        position,
        error,
        isLoading,
        isSupported,
    };
}
'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { KakaoMapHandle, MapProps } from "@/types/types";

const KakaoMap = forwardRef<KakaoMapHandle, MapProps>(({ onSelectLocation, center }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const marker = useRef<any>(null);
    const geocoder = useRef<any>(null);

    const [initialCenter, setInitialCenter] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
            setInitialCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            },
            () => {
            setInitialCenter({ lat: 33.450701, lng: 126.570667 });
            }
        );
        } else {
        setInitialCenter({ lat: 33.450701, lng: 126.570667 });
        }
    }, []);

    useEffect(() => {
        if (!mapRef.current || !initialCenter) return;

        const loadMap = () => {
        const { kakao } = window as any;

        geocoder.current = new kakao.maps.services.Geocoder();

        const options = {
            center: new kakao.maps.LatLng(initialCenter.lat, initialCenter.lng),
            level: 3,
        };

        mapInstance.current = new kakao.maps.Map(mapRef.current, options);

        marker.current = new kakao.maps.Marker({
            position: options.center,
        });
        marker.current.setMap(mapInstance.current);

        kakao.maps.event.addListener(mapInstance.current, "click", (mouseEvent: any) => {
            const latlng = mouseEvent.latLng;
            const lat = latlng.getLat();
            const lng = latlng.getLng();

            geocoder.current.coord2Address(lng, lat, (result: any, status: string) => {
            if (status === kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                marker.current.setPosition(latlng);
                onSelectLocation(lat, lng, address);
            }
            });
        });

        geocoder.current.coord2Address(initialCenter.lng, initialCenter.lat, (result: any, status: string) => {
            if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            onSelectLocation(initialCenter.lat, initialCenter.lng, address);
            }
        });
        };

        if (!(window as any).kakao) {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services`;
        script.async = true;
        script.onload = () => {
            (window as any).kakao.maps.load(loadMap);
        };
        document.head.appendChild(script);
        } else {
        (window as any).kakao.maps.load(loadMap);
        }
    }, [initialCenter, onSelectLocation]);

    useEffect(() => {
        if (center && mapInstance.current && marker.current) {
        const { kakao } = window as any;
        const moveLatLng = new kakao.maps.LatLng(center.lat, center.lng);
        mapInstance.current.setCenter(moveLatLng);
        marker.current.setPosition(moveLatLng);
        }
    }, [center]);

    useImperativeHandle(ref, () => ({
        moveToAddress: (address: string) => {
        if (!geocoder.current || !mapInstance.current || !marker.current) return;

        geocoder.current.addressSearch(address, (result: any, status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
            const lat = result[0].y;
            const lng = result[0].x;
            const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
            mapInstance.current.setCenter(moveLatLng);
            marker.current.setPosition(moveLatLng);
            onSelectLocation(lat, lng, address);
            }
        });
        }
    }));

    return <div ref={mapRef} style={{ width: "100%", height: "400px", borderRadius: "0.2rem" }} />;
});

export default KakaoMap;
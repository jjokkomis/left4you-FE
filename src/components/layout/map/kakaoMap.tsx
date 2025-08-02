'use client';

import { useEffect, useRef } from 'react';

const KakaoMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        if (!(window as any).kakao) {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;
        script.async = true;
        script.onload = () => {
            (window as any).kakao.maps.load(() => {
            const container = mapRef.current!;
            const options = {
                center: new (window as any).kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };
            const map = new (window as any).kakao.maps.Map(container, options);

            // 마커 추가
            const markerPosition = new (window as any).kakao.maps.LatLng(33.450701, 126.570667);
            const marker = new (window as any).kakao.maps.Marker({
                position: markerPosition,
            });
            marker.setMap(map);
            });
        };
        document.head.appendChild(script);
        } else {
        (window as any).kakao.maps.load(() => {
            const container = mapRef.current!;
            const options = {
            center: new (window as any).kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
            };
            const map = new (window as any).kakao.maps.Map(container, options);

            const markerPosition = new (window as any).kakao.maps.LatLng(33.450701, 126.570667);
            const marker = new (window as any).kakao.maps.Marker({
            position: markerPosition,
            });
            marker.setMap(map);
        });
        }
    }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '400px', borderRadius: '0.2rem' }} />;
};

export default KakaoMap;
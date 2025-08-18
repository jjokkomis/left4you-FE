'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import type { KakaoMapHandle, MapProps } from "@/types/types";

const KakaoMap = forwardRef<KakaoMapHandle, MapProps & { height?: string }>(
  ({ onSelectLocation, center, height = "400px" }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const marker = useRef<any>(null);
    const geocoder = useRef<any>(null);

    const [initialCenter, setInitialCenter] = useState<{ lat: number; lng: number } | null>(null);

    // 초기 위치 설정
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setInitialCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => setInitialCenter({ lat: 33.450701, lng: 126.570667 })
        );
      } else {
        setInitialCenter({ lat: 33.450701, lng: 126.570667 });
      }
    }, []);

    // 지도 로드
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
        marker.current = new kakao.maps.Marker({ position: options.center });
        marker.current.setMap(mapInstance.current);

        // 지도 클릭 시 위치 선택
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

        // 초기 위치 주소 가져오기
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
        script.onload = () => (window as any).kakao.maps.load(loadMap);
        document.head.appendChild(script);
      } else {
        (window as any).kakao.maps.load(loadMap);
      }
    }, [initialCenter, onSelectLocation]);

    // 외부에서 center prop 변경 시 지도 이동
    useEffect(() => {
      if (center && mapInstance.current && marker.current) {
        const { kakao } = window as any;
        const moveLatLng = new kakao.maps.LatLng(center.lat, center.lng);
        mapInstance.current.setCenter(moveLatLng);
        marker.current.setPosition(moveLatLng);
      }
    }, [center]);

    // 외부 제어 메서드
    useImperativeHandle(ref, () => ({
      moveToAddress: (address: string) => {
        if (!geocoder.current || !mapInstance.current || !marker.current) return;

        geocoder.current.addressSearch(address, (result: any, status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const lat = parseFloat(result[0].y);
            const lng = parseFloat(result[0].x);
            const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
            mapInstance.current.setCenter(moveLatLng);
            marker.current.setPosition(moveLatLng);
            onSelectLocation(lat, lng, address);
          }
        });
      },
      moveToLatLng: (lat: number, lng: number) => {
        if (!mapInstance.current || !marker.current) return;

        const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
        mapInstance.current.setCenter(moveLatLng);
        marker.current.setPosition(moveLatLng);

        if (geocoder.current) {
          geocoder.current.coord2Address(lng, lat, (result: any, status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              onSelectLocation(lat, lng, address);
            }
          });
        }
      }
    }));

    return <div ref={mapRef} style={{ width: "100%", height: height, borderRadius: "0.2rem" }} />;
  }
);

export default KakaoMap;
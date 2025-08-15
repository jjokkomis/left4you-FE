"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import * as S from "./style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import type { KakaoMapHandle } from "@/types/types";

export default function Location() {
    const mapRef = useRef<KakaoMapHandle>(null);
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        if (!searchText.trim()) return;
        mapRef.current?.moveToAddress(searchText);
    };

    const moveToCurrentLocation = () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            mapRef.current?.moveToLatLng(lat, lng);
        });
        }
    };

    return (
        <S.Container>
        <S.TopBar>
            <S.Button onClick={handleSearch}>
                <Image src="/assets/search.svg" alt="검색" width={20} height={20} />
                <S.Input
                placeholder="검색하기"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                />
            </S.Button>
            <S.Button onClick={moveToCurrentLocation}>
                <Image src="/assets/flo.svg" alt="현재 위치" width={20} height={20}/>
                <S.Text> 현재위치 </S.Text>
            </S.Button>
        </S.TopBar>
        <S.MapWrapper>
            <KakaoMap height="90vh" onSelectLocation={() => {}} ref={mapRef} />
        </S.MapWrapper>
        </S.Container>
    );
}
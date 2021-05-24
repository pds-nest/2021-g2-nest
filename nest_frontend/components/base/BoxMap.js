import React, { useCallback, useEffect, useMemo, useState } from "react"
import Style from "./BoxMap.module.css"
import BoxFull from "./BoxFull"
import { MapContainer, TileLayer } from "react-leaflet"
import Coordinates from "../../objects/Coordinates"


export default function BoxMap(
    {
        mapViewHook,
        button,
        children,
        ...props
    }) {
    const [map, setMap] = useState(null)

    const onMapMove = useCallback(
        () => mapViewHook.setCenter(Coordinates.fromLatLng(map.getCenter())),
        [mapViewHook, map],
    )

    const onMapZoom = useCallback(
        () => mapViewHook.setZoom(map.getZoom()),
        [mapViewHook, map],
    )

    const mapContainer = useMemo(
        () => (
            <MapContainer
                center={[mapViewHook.center.lat, mapViewHook.center.lng]}
                zoom={mapViewHook.zoom}
                className={Style.MapContainer}
                whenCreated={setMap}
            >
                <TileLayer
                    attribution='(c) <a href="https://osm.org/copyright">OpenStreetMap contributors</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {children}
                <div className={"leaflet-top leaflet-right"}>
                    <div className={"leaflet-control"}>
                        {button}
                    </div>
                </div>
            </MapContainer>
        ),
        [mapViewHook],
    )

    useEffect(
        () => {
            if(map === null) {
                return
            }

            map.on("move", onMapMove)
            map.on("zoom", onMapZoom)

            return () => {
                map.off("move", onMapMove)
                map.off("zoom", onMapZoom)
            }
        },
        [map, mapViewHook],
    )

    return (
        <BoxFull
            childrenClassName={Style.BoxMapContents}
            {...props}
        >
            {mapContainer}
        </BoxFull>
    )
}

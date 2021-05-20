import React from "react"
import Style from "./BoxMap.module.css"
import BoxFull from "./BoxFull"
import { MapContainer, TileLayer } from "react-leaflet"


export default function BoxMap({
                                   setMap,
                                   startingPosition = { lat: 41.89309, lng: 12.48289 },
                                   startingZoom = 3,
                                   button,
                                   children,
                                   ...props
                               }) {
    return (
        <BoxFull
            childrenClassName={Style.BoxMapContents}
            {...props}
        >
            <MapContainer
                center={startingPosition}
                zoom={startingZoom}
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
        </BoxFull>
    )
}

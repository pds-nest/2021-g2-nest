import { useState } from "react"
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../utils/defaultMapLocation"
import osmZoomLevels from "../utils/osmZoomLevels"


export default function useMapView() {
    const [center, setCenter] = useState(DEFAULT_MAP_CENTER)
    const [zoom, setZoom] = useState(DEFAULT_MAP_ZOOM)
    const radius = osmZoomLevels[zoom]

    return {
        center,
        setCenter,
        zoom,
        setZoom,
        radius,
    }
}
import { useState } from "react"
import Coordinates from "../objects/Coordinates"
import MapArea from "../objects/MapArea"


/**
 * Hook which holds values required to create a {@link MapArea}.
 */
export default function useMapAreaState() {
    const [zoom, setZoom] = useState(3)
    const [center, setCenter] = useState(new Coordinates(0, 0))
    const mapArea = MapArea.fromZoomLevel(zoom, center)

    return {
        zoom,
        setZoom,
        center,
        setCenter,
        mapArea,
    }
}
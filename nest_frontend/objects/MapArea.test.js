import Coordinates from "./Coordinates"
import MapArea from "./MapArea"


test("MapArea can be constructed", () => {
    const mapArea = new MapArea(1000, new Coordinates(0.0, 0.0))
    expect(mapArea).toBeTruthy()
})

test("MapArea can be rendered to a spec-compatible string", () => {
    const mapArea = new MapArea(1000, new Coordinates(0.0, 0.0))
    expect(mapArea.toString()).toBe("< 1000 0.0000000 0.0000000")
})


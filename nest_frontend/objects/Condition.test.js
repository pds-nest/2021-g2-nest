import { Condition, ConditionHashtag, ConditionLocation, ConditionTime, ConditionUser } from "./Condition"
import TimeRay from "./TimeRay"
import MapArea from "./MapArea"
import Coordinates from "./Coordinates"


test("Condition can be constructed", () => {
    expect(new Condition(0, "hi")).toBeTruthy()
    expect(new Condition(0, "hi", 1)).toBeTruthy()
})

test("ConditionHashtag can be constructed", () => {
    expect(new ConditionHashtag("PdS2021")).toBeTruthy()
    expect(new ConditionHashtag("PdS2021", 1)).toBeTruthy()
})

test("ConditionUser can be constructed", () => {
    expect(new ConditionUser("USteffo")).toBeTruthy()
    expect(new ConditionUser("USteffo", 1)).toBeTruthy()
})

test("ConditionTime can be constructed", () => {
    const now = new Date()
    const timeRay = new TimeRay(true, now)

    expect(new ConditionTime(timeRay)).toBeTruthy()
    expect(new ConditionTime(timeRay, 1)).toBeTruthy()
})

test("ConditionLocation can be constructed", () => {
    const mapArea = new MapArea(1000, new Coordinates(0.000, 0.000))

    expect(new ConditionLocation(mapArea)).toBeTruthy()
    expect(new ConditionLocation(mapArea, 1)).toBeTruthy()
})

test("ConditionHashtag has the correct type", () => {
    expect(new ConditionHashtag("PdS2021").type).toBe(0)
})

test("ConditionUser has the correct type", () => {
    expect(new ConditionUser("USteffo").type).toBe(5)
})

test("ConditionTime has the correct type", () => {
    const now = new Date()
    const timeRay = new TimeRay(true, now)

    expect(new ConditionTime(timeRay).type).toBe(5)
})

test("ConditionLocation has the correct type", () => {
    const mapArea = new MapArea(1000, new Coordinates(0.000, 0.000))

    expect(new ConditionLocation(mapArea).type).toBe(3)
})

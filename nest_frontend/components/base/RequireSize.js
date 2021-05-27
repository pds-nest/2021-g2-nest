import React, { useState } from "react"
import { useWindowSize } from "@react-hook/window-size/throttled"
import Alert from "./Alert"
import useStrings from "../../hooks/useStrings"
import Button from "./Button"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import makeIcon from "../../utils/makeIcon"
import BodyFlex from "./layout/BodyFlex"


export default function RequireSize({ children, width, height, ...props }) {
    const [windowWidth, windowHeight] = useWindowSize()
    const [warn, setWarn] = useState(true)
    const strings = useStrings()

    if(warn && (windowWidth < width || windowHeight < height)) {
        return <BodyFlex {...props}>
            <Alert color={"Red"}>
                {strings.resolutionTooSmall}
            </Alert>
            <Button color={"Yellow"} onClick={() => setWarn(false)} style={{alignSelf: "center"}}>
                {makeIcon(faExclamationTriangle)} {strings.ignore}
            </Button>
        </BodyFlex>
    }

    return children
}

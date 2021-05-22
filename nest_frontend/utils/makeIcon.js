import React, { isValidElement } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {IconDefinition} from "@fortawesome/fontawesome-svg-core"


/**
 * Try to create an icon element based on what is passed to the function:
 * - If a {@link JSX.Element} is passed, a `<span>` element containing it will be created and returned.
 * - If a {@link IconDefinition} is passed, a `<span>` element containing a {@link FontAwesomeIcon} will be created
 *   and returned.
 * - If a falsy value is passed, `null` will be returned.
 *
 * @param icon - The icon value.
 * @param props - Props to pass to the span element when it is created.
 * @returns {JSX.Element|null}
 */
export default function makeIcon(icon, props) {
    if(isValidElement(icon)) {
        return <span {...props}>{icon}</span>
    }
    else if(icon) {
        return (
            <span {...props}><FontAwesomeIcon icon={icon}/></span>
        )
    }
    else {
        return null
    }
}

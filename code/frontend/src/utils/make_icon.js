import React, { isValidElement } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function make_icon(icon, className) {
    if(isValidElement(icon)) {
        return <span className={className}>icon</span>;
    }
    else if(icon) {
        return (
            <span className={className}><FontAwesomeIcon icon={icon}/></span>
        )
    }
    else {
        return null;
    }
}
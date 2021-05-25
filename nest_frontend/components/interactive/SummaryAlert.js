import React, { useContext } from "react"
import { faBell, faShare, faStar, faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import SummaryBase from "../base/summary/SummaryBase"
import SummaryLeft from "../base/summary/SummaryLeft"
import SummaryLabels from "../base/summary/SummaryLabels"
import SummaryButton from "../base/summary/SummaryButton"
import SummaryRight from "../base/summary/SummaryRight"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ContextUser from "../../contexts/ContextUser"
import useStrings from "../../hooks/useStrings"


/**
 * A {@link SummaryBase} representing a N.E.S.T. alert.
 *
 * @param alert - The alert to represent.
 * @param destroy - Async function with no parameters to destroy the alert from the frontend.
 * @param running - Whether another request is already running.
 * @param props - Additional props to pass to the summary.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SummaryAlert({ alert, destroy, running, ...props }) {
    const strings = useStrings()

    return (
        <SummaryBase {...props}>
            <SummaryLeft
                icon={faBell}
                title={alert.name}
            />
            <SummaryLabels
                upperLabel={strings.alertLimit}
                upperValue={alert.limit}
                lowerLabel={strings.alertWindow}
                lowerValue={alert.window_size}
            />
            {destroy ?
             <SummaryButton
                 color={"Red"}
                 icon={faTrash}
                 onClick={destroy}
                 disabled={running}
             >
                 {strings.delete}
             </SummaryButton>
            : null}
            <SummaryRight/>
        </SummaryBase>
    )
}

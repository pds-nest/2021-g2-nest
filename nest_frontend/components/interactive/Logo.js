import React, { useContext } from "react"
import Style from "./Logo.module.css"
import LogoDark from "../../media/LogoDark.png"
import LogoLight from "../../media/LogoLight.png"
import ContextTheme from "../../contexts/ContextTheme"
import classNames from "classnames"
import useStrings from "../../hooks/useStrings"


/**
 * The N.E.S.T. logo.
 *
 * It loads a different image based on the currently selected theme.
 *
 * @param className - Additional class(es) to add to the image.
 * @param props - Additional props to pass to the image.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Logo({ className, ...props }) {
    const { theme } = useContext(ContextTheme)
    const strings = useStrings()

    let logo
    if(theme === "ThemeDark") {
        logo = LogoDark
    }
    else if(theme === "ThemeLight") {
        logo = LogoLight
    }
    else {
        logo = "#"
    }

    return (
        <img
            src={logo}
            className={classNames(Style.Logo, className)}
            alt={strings.appName}
            title={strings.appFullName}
            {...props}
        />
    )
}

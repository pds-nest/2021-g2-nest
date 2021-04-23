import React, {useContext} from "react"
import Style from "./Logo.module.css"
import LogoDark from "../media/LogoDark.png"
import LogoLight from "../media/LogoLight.png"
import ContextTheme from "../contexts/ContextTheme"
import classNames from "classnames"


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
    // I have no idea why IntelliJ is complaining about this line
    // It's perfectly fine!
    const [theme, ] = useContext(ContextTheme)

    let logo;
    if(theme === "ThemeDark") {
        logo = LogoDark
    }
    else if(theme === "ThemeLight") {
        logo = LogoLight
    }
    else {
        throw new Error(`Unknown theme: ${theme}`)
    }

    return (
        <img src={logo} className={classNames(Style.Logo, className)} alt={"N.E.S.T."} {...props}/>
    )
}

import React, {useContext} from "react"
import LogoDark from "../media/LogoDark.png"
import LogoLight from "../media/LogoLight.png"
import ContextTheme from "../contexts/ContextTheme"


export default function Logo({ children, className, ...props }) {
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
        <img src={logo} alt={"N.E.S.T."} {...props}/>
    )
}

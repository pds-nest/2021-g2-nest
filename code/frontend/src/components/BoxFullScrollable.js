import React from "react"
import Style from "./BoxFullScrollable.module.css"
import classNames from "classnames"
import BoxFull from "./BoxFull"


/**
 * A {@link BoxFull} whose body does not grow automatically but instead supports scrolling.
 *
 * @param children - The contents of the box body.
 * @param childrenClassName - Additional class(es) added to the inner `<div>` acting as the body.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFullScrollable({ children, childrenClassName, ...props }) {
    return (
        <BoxFull childrenClassName={classNames(Style.BoxScrollableBody, childrenClassName)} {...props}>
            <div className={classNames(Style.ScrollContainer)}>
                {children}
            </div>
        </BoxFull>
    )
}

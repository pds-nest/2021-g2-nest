import React from "react"
import Style from "./BoxFullScrollable.module.css"
import classNames from "classnames"
import BoxFull from "./BoxFull"


/**
 * A {@link BoxFull} whose body does not grow automatically but instead supports scrolling.
 *
 * @todo Is there a way to allow the box body to grow automatically...?
 *
 * @param children - The contents of the box body.
 * @param childrenClassName - Additional class(es) added to the inner `<div>` acting as the body.
 * @param height - The fixed height of the box body.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFullScrollable({ children, childrenClassName, height, ...props }) {
    return (
        <BoxFull
            childrenClassName={classNames(Style.ScrollableBody, childrenClassName)}
            childrenProps={{"style": {"height": height}}}
            {...props}
        >
            {children}
        </BoxFull>
    )
}

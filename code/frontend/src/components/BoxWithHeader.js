import React, {isValidElement} from "react"
import Style from "./BoxWithHeader.module.css"
import classNames from "classnames"
import isString from "is-string"


export default function BoxWithHeader({ header, body, children, className, ...props }) {

    if(isValidElement(header) || isString(header)) {
        header = {
            children: header
        }
    }

    if(isValidElement(body) || isString(body)) {
        body = {
            children: body
        }
    }

    if(header === undefined) {
        header = {}
    }

    if(body === undefined) {
        body = {}
    }

    if(children) {

        if(body.children) {
            throw new Error("If directly passing `children` to BoxWithHeader, body.children should not be set.")
        }

        body["children"] = children
    }

    return (
        <div className={classNames(Style.BoxWithHeader, className)} {...props}>
            <div className={classNames(Style.BoxHeader, header.className)}>
                {header.children}
            </div>
            <div className={classNames(Style.BoxBody, body.className)}>
                {body.children}
            </div>
        </div>
    )
}

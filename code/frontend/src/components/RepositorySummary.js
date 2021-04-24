import React from "react"
import Style from "./RepositorySummary.module.css"
import classNames from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Button from "./Button"
import { faArchive, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"


export default function RepositorySummary({ className, icon, title, details, buttons, startDate, canDelete, canEdit, canArchive, ...props }) {
    return (
        <div className={classNames(Style.RepositorySummary, className)} {...props}>
            <div className={Style.Left}>
                <div className={Style.IconContainer}>
                    <FontAwesomeIcon icon={icon}/>
                </div>
                <div className={Style.Title}>
                    {title}
                </div>
                <div className={Style.StartDate}>
                    {startDate}
                </div>
            </div>
            <div className={Style.Middle}>
                {details}
            </div>
            <div className={Style.Right}>
                {canDelete ?
                    <Button color={"Red"} icon={faTrash}>Delete</Button>
                : null}
                {canEdit ?
                    <Button color={"Yellow"} icon={faPencilAlt}>Edit</Button>
                : null}
                {canArchive ?
                    <Button color={"Grey"} icon={faArchive}>Archive</Button>
                : null}
            </div>
        </div>
    )
}

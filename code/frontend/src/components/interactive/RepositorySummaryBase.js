import React from "react"
import Style from "./RepositorySummaryBase.module.css"
import classNames from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Button from "../base/Button"
import { faArchive, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"


/**
 * A long line representing a repository in a list.
 *
 * @param icon - The FontAwesome IconDefinition that represents the repository.
 * @param name - The title of the repository.
 * @todo What goes in the details field?
 * @param details - Whatever should be rendered in the details field.
 * @param start - The start date of the repository.
 * @param end - The end date of the repository.
 * @param isActive - Whether the repository is active or not.
 * @param canDelete - If the Delete button should be displayed or not.
 * @param canEdit - If the Edit button should be displayed or not.
 * @param canArchive - If the Archive button should be displayed or not.
 * @param className - Additional class(es) to be added to the outer box.
 * @param props - Additional props to pass to the outer box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function RepositorySummaryBase(
    { icon, name, details, start, end, isActive, canDelete, canEdit, canArchive, className, ...props }
) {
    return (
        <div className={classNames(Style.RepositorySummary, className)} {...props}>
            <div className={Style.Left}>
                <div className={Style.IconContainer}>
                    <FontAwesomeIcon icon={icon}/>
                </div>
                <div className={Style.Title}>
                    {name}
                </div>
                <div className={Style.StartDate}>
                    {start}
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
                    <Button color={"Grey"} icon={faArchive}>{isActive ? "Archive" : "Unarchive"}</Button>
                : null}
            </div>
        </div>
    )
}

import React from "react"
import Style from "./PageDashboard.module.css"
import classNames from "classnames"
import BoxHeader from "../components/BoxHeader"
import BoxFull from "../components/BoxFull"
import Checkbox from "../components/Checkbox"
import InputWithIcon from "../components/InputWithIcon"
import { faFolder, faPlus } from "@fortawesome/free-solid-svg-icons"
import Radio from "../components/Radio"
import Button from "../components/Button"
import FormLabelled from "../components/FormLabelled"
import FormLabel from "../components/FormLabel"


export default function PageDashboard({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageHome, className)} {...props}>
            <BoxHeader className={Style.Header}>
                Create a new repository
            </BoxHeader>
            <BoxFull className={Style.SearchByZone} header={
                <span><Checkbox/> Search by zone</span>
            }>
                🚧 Not implemented.
            </BoxFull>
            <BoxFull className={Style.SearchByHashtags} header={
                <span><Checkbox/> Search by hashtag</span>
            }>
                🚧 Not implemented.
            </BoxFull>
            <BoxFull className={Style.SearchByTimePeriod} header={
                <span><Checkbox/> Search by time period</span>
            }>
                🚧 Not implemented.
            </BoxFull>
            <BoxFull className={Style.CreateDialog} header={"Create repository"}>
                <FormLabelled>
                    <FormLabel htmlFor={"repo-name"} text={"Repository name"}>
                        <InputWithIcon id={"repo-name"} icon={faFolder}/>
                    </FormLabel>
                    <FormLabel htmlFor={"filter-mode"} text={"Add tweets if they satisfy"}>
                        <label>
                            <Radio name={"filter-mode"} value={"or"}/> At least one filter
                        </label>
                        &nbsp;
                        <label>
                            <Radio name={"filter-mode"} value={"and"}/> Every filter
                        </label>
                    </FormLabel>
                    <Button style={{"gridColumn": "1 / 3"}} icon={faPlus} color={"Green"}>
                        Create repository
                    </Button>
                </FormLabelled>
            </BoxFull>
        </div>
    )
}

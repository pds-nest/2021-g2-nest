import React from "react"
import Style from "./PageDashboard.module.css"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import BoxFull from "../components/base/BoxFull"
import InputWithIcon from "../components/base/InputWithIcon"
import { faFolder, faPlus } from "@fortawesome/free-solid-svg-icons"
import Radio from "../components/base/Radio"
import Button from "../components/base/Button"
import FormLabelled from "../components/base/FormLabelled"
import FormLabel from "../components/base/formparts/FormLabel"
import RepositoryEditor from "../components/providers/RepositoryEditor"
import BoxConditionHashtag from "../components/interactive/BoxConditionHashtag"
import BoxConditions from "../components/interactive/BoxConditions"
import BoxConditionDatetime from "../components/interactive/BoxConditionDatetime"
import BoxConditionMap from "../components/interactive/BoxConditionMap"
import BoxConditionUser from "../components/interactive/BoxConditionUser"


export default function PageDashboard({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageHome, className)} {...props}>
            <RepositoryEditor>
                <BoxHeader className={Style.Header}>
                    Create a new repository
                </BoxHeader>
                <BoxConditionMap className={Style.SearchByZone}/>
                <BoxConditionHashtag className={Style.SearchByHashtags}/>
                <BoxConditionUser className={Style.SearchByUser}/>
                <BoxConditionDatetime className={Style.SearchByTimePeriod}/>
                <BoxConditions className={Style.Conditions}/>
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
            </RepositoryEditor>
        </div>
    )
}

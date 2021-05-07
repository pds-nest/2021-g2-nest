import React from "react"
import Style from "./PageDashboard.module.css"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import RepositoryEditor from "../components/providers/RepositoryEditor"
import BoxConditionHashtag from "../components/interactive/BoxConditionHashtag"
import BoxConditions from "../components/interactive/BoxConditions"
import BoxConditionDatetime from "../components/interactive/BoxConditionDatetime"
import BoxConditionMap from "../components/interactive/BoxConditionMap"
import BoxConditionUser from "../components/interactive/BoxConditionUser"
import BoxRepositoryCreate from "../components/interactive/BoxRepositoryCreate"


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
                <BoxRepositoryCreate className={Style.CreateDialog}/>
            </RepositoryEditor>
        </div>
    )
}

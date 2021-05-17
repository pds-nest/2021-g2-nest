import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import FormLabelled from "../base/FormLabelled"
import FormLabel from "../base/formparts/FormLabel"
import InputWithIcon from "../base/InputWithIcon"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import ContextServer from "../../contexts/ContextServer"
import Localization from "../../Localization"


/**
 * A {@link BoxFull} allowing the user to select the backend server they want to login to.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxSetServer({ ...props }) {
    const { server, setServer } = useContext(ContextServer)

    return (
        <BoxFull header={Localization.server} {...props}>
            <FormLabelled>
                <FormLabel text={Localization.baseURL} htmlFor={"set-server-base-url"}>
                    <InputWithIcon
                        id={"set-server-base-url"}
                        type={"url"}
                        icon={faGlobe}
                        value={server}
                        onChange={e => setServer(e.target.value)}
                    />
                </FormLabel>
            </FormLabelled>
        </BoxFull>
    )
}

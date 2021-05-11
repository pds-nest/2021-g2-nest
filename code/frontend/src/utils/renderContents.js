import Loading from "../components/base/Loading"
import BoxAlert from "../components/base/BoxAlert"
import Starting from "../components/base/Starting"


export default function renderContents(requestHookResults, renderFunction) {
    const { data, error, loading } = requestHookResults

    if(loading) {
        return <Loading/>
    }
    if(error) {
        return <BoxAlert color={"Red"}>{error}</BoxAlert>
    }
    if(data) {
        return renderFunction(data)
    }
    return <Starting/>
}

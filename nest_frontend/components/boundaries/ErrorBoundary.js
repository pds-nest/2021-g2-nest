import React from "react"
import AlertError from "../interactive/AlertError"


export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null}
    }

    static getDerivedStateFromError(error) {
        // I'm not too sure on what this does
        return {error}
    }

    componentDidCatch(error, errorInfo) {
        console.error("Caught error ", error, " with info ", errorInfo)
        this.setState(state => state.error = error)
    }

    render() {
        if(this.state.error) {
            return <AlertError error={this.state.error}/>
        }
        return this.props.children
    }
}

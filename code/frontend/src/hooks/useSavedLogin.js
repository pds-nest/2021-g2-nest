import useLocalStorageState from "./useLocalStorageState"


/**
 * Hook to place at the root to generate the contents of {@link ContextLogin}.
 */
export default function useSavedLogin() {
    const [state, setState] = useLocalStorageState("login", null)

    const login = async (server, email, password) => {
        console.debug("Contacting server to login...")
        const response = await fetch(`${server}/api/login`, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        })

        console.debug("Decoding server response...")
        const data = await response.json()

        console.debug("Ensuring the request was a success...")
        if(data["result"] !== "success") {
            console.error(`Login failed: ${data["msg"]}`)
            return
        }

        console.debug("Storing login state...")
        setState({
            server: server,
            email: data["user"]["email"],
            isAdmin: data["user"]["isAdmin"],
            username: data["user"]["username"],
            token: data["access_token"],
        })
        console.debug("Stored login state!")

        console.info("Login successful!")
    }

    const logout = () => {
        console.debug("Clearing login state...")
        setState(null)
        console.debug("Cleared login state!")

        console.info("Logout successful!")
    }

    const fetch_unauth = async (path, init) => {
        return await fetch(`${state["server"]}${path}`, init)
    }

    const fetch_auth = async (path, init) => {
        if(typeof init["headers"] != "object") {
            init["headers"] = {}
        }
        if(state) {
            init["Authorization"] = `Bearer ${state["token"]}`
        }
        return await fetch_unauth(path, init)
    }

    return {state, login, logout, fetch_unauth, fetch_auth}
}
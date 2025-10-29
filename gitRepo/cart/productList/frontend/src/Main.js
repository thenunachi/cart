import { useState } from "react"
import App from "./App";
import LandingPage from "./LandingPage";

const Main = () => {
    const [user, setUser] = useState(null)
    console.log(user,"user from main.js")
    return (
        <>
            {!user ? (
                <LandingPage onLogin={setUser} />
            ) : (
                <App user={user} setUser={setUser} />
            )}
        </>
    )
}

export default Main
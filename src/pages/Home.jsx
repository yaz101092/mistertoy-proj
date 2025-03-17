// import { ToggleButton } from "../cmps/ToggleButton.jsx"


import { useState } from "react";

export function Home() {
    
    // const [isOn, setIsOn] = useState(false)

    return (
        <section className="home">
            <h1>Wellcom to Mister-Toy App!</h1>
            {/* <ToggleButton val={isOn} setVal={setIsOn} />
            {isOn && <img src="../assets/img/react.png" alt="" />} */}
        </section>
    )
}
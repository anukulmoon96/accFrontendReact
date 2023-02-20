import React, { useRef } from "react";
import IdleTimer from "react-idle-timer";
import  { Redirect } from 'react-router-dom';

function IdleTimerContainer(){
    const idleTimerRef = useRef(null)

     const onIdle = () => {
        sessionStorage.removeItem("userData")
         window.location.href = `/auth`;
     }

    return(
        <div>
            <IdleTimer ref={idleTimerRef} timeout={1800 * 1000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}

export default IdleTimerContainer

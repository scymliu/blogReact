import React from "react";
import './feature.css'
import GoTopIcon from '../img/gotop.png'

const GoTop = () => {

    const gototop=()=>{
        window.scrollTo(0, 0);
    }
    return(
        <div className="fix">
            <img src={GoTopIcon} onClick={gototop} />
        </div>
    )
}
export default GoTop;
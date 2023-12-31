import style from "./message.module.css";
import { useState, useEffect } from "react";

const Message = ({ type, msg }) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(!msg) {
            return;
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${style.message} ${style[type]}`}> {msg} </div>
            )}
        </>
    )
}

export default Message;
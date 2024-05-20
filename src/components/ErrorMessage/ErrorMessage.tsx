import css from "./ErrorMessage.module.css";
import React from 'react';
const Error = ():React.ReactElement => {
    return <p className={css["error"]}>Bad request or something went wrong with server.</p>
}
export default Error;
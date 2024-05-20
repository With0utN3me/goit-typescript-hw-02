import css from "./ErrorMessage.module.css"
const Error = () => {
    return <p className={css["error"]}>Bad request or something went wrong with server.</p>
}
export default Error;
import css from "./Loader.module.css"
import { TailSpin } from "react-loader-spinner";
const Loader = () => {
    return (
        <div className={css["load-wrapper"]}>
            <TailSpin
                visible={true}
                height="65"
                width="65"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="5"
                wrapperStyle={{}}
                wrapperClass=""
            />
            <p className={css["load-p"]}>Loading Photos...</p>
        </div>
    )
}
export default Loader;
import css from "./LoadMoreBtn.module.css"
type Props = {
    onClick: () => void;
}
const LoadMoreBtn = ({onClick}:Props) => {
    return (
        <div className={css["load-more-wrapper"]}>
            <button className={css["load-more"]} onClick={onClick}>Load more</button>
        </div>
    )
}
export default LoadMoreBtn;
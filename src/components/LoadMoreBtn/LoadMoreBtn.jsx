import css from "./LoadMoreBtn.module.css"
const LoadMoreBtn = ({onClick}) => {
    return (
        <div className={css["load-more-wrapper"]}>
            <button className={css["load-more"]} onClick={onClick}>Load more</button>
        </div>
    )
}
export default LoadMoreBtn;
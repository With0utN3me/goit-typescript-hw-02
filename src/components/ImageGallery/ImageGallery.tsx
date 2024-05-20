import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
type Props = {
    images: [...any];
    onClick: () => void;
    onImageClick: (T:string) => void;
}

const ImageGallery = ({ images, onClick, onImageClick }: Props) => {
    const handleClick = (imageId:string):void => {
        onClick();
        onImageClick(imageId);
    };

    return (
        <ul className={css["gallery"]}>
            {images.map(image => (
                <li key={image.id} onClick={() => handleClick(image.id)}>
                    <ImageCard
                        likes={image.likes}
                        photo={image.urls.small}
                        descr={image.description}
                    />
                </li>
            ))}
        </ul>
    );
};

export default ImageGallery;

import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onClick, onImageClick }) => {
    const handleClick = (imageId) => {
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

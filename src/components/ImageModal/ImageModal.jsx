import Modal from 'react-modal';
import css from "./ImageModal.module.css"
const ImageModal = ({ image, modalState, close, afterClose }) => {
    Modal.setAppElement('#root');
    return (
        <Modal
            parentSelector={() => document.querySelector('#root')}
            isOpen={modalState}
            onAfterClose={afterClose}
            onRequestClose={close}
            shouldCloseOnOverlayClick={true}
            className={css["modal"]}
        >
        <div className={css["modal-content-wrapper"]}>
            <div className={css['image-wrapper']}>
                <img className={css["modal-image"]} src={image.urls.regular} alt={image.alt_description}/>
            </div>
            <ul className={css["stast-list"]}>
                <li className={css["stats-item"]}>Likes: {image.likes}</li>
                <li className={css["stats-item"]}>Views: {image.views}</li>
                <li className={css["stats-item"]}>Author: {image.user.name}</li>
            </ul> 
        </div>
        </Modal>)
}
export default ImageModal;
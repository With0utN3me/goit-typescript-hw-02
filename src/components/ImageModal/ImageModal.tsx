import Modal from 'react-modal';
import css from "./ImageModal.module.css";
import React from 'react';

export type Photo = {
    alt_description: string;
    urls: {
        regular: string;
    };
    likes: number;
    views: number;
    user: {
        name: string;
    };
    [key: string]: any;
};
type Props = {
    photo: Photo;
    modalState: boolean;
    close: () => void;
    afterClose: () => void;
}
const ImageModal: React.FC<Props> = ({ photo, modalState, close, afterClose }) => {
    Modal.setAppElement('#root');
    return (
        <Modal
            parentSelector={() => document.querySelector('#root')!}
            isOpen={modalState}
            onAfterClose={afterClose}
            onRequestClose={close}
            shouldCloseOnOverlayClick={true}
            className={css["modal"]}
        >
        <div className={css["modal-content-wrapper"]}>
            <div className={css['image-wrapper']}>
                <img className={css["modal-image"]} src={photo.urls.regular} alt={photo.alt_description}/>
            </div>
            <ul className={css["stast-list"]}>
                <li className={css["stats-item"]}>Likes: {photo.likes}</li>
                <li className={css["stats-item"]}>Views: {photo.views}</li>
                <li className={css["stats-item"]}>Author: {photo.user.name}</li>
            </ul> 
        </div>
        </Modal>)
}
export default ImageModal;
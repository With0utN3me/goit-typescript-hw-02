import './App.css'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Error from './ErrorMessage/ErrorMessage';
import Loader from './Loader/Loader';
import axios from 'axios';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import { Photo } from './ImageModal/ImageModal';
type Images = {
    [key: string]: any;
}

const App = () => {
    const [photos, setPhotos] = useState<Images[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchTopic, setTopic] = useState<string>("");
    const [image, setImage] = useState<Photo | null>(null);

    const handleError = () => toast.error("Sorry, an error has occured.");

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const openModal = ():void => {
        setIsOpen(true);
    }
    const afterCloseModal = () => {
        setImage(null);
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    const baseURL= "https://api.unsplash.com/search/photos/?";
    const accessKey = "RBukxUK_I9GjSKnvHTgvdpwXFN5U9C58BKFGR3j6tnM";

    const handleSearch = async (topic:string) => {
        try {
            setError(false);
            setPage(1);
            setLoading(true);
            setTopic(topic);
            const response = await axios.get(baseURL, {
                params: {
                    client_id: accessKey,
                    query: topic,
                    page: 1,
                    per_page: 12
                }
            });
            setTotalPages(response.data.total_pages);
            if (response.data.results.length > 0) {
                setPhotos(response.data.results);
            } else {
                setPhotos([]);
                setError(true);
                handleError();
            }
        } catch (error) {
            setPhotos([]);
            console.log(error)
            setError(true);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    }
    const handleMoreClick = async () => {
        try {
            setPage(prev => prev + 1);
            setLoading(true);
            const response = await axios.get(baseURL, {
                params: {
                    client_id: accessKey,
                    query: searchTopic,
                    page: page + 1,
                    per_page: 12
                }
            });
            if (response.data.results.length > 0) {
                setPhotos(prevPhotos => [...prevPhotos, ...response.data.results]);
            } else {
                setPhotos([]);
                setError(true);
                handleError();
            }
        } catch (error) {
            setPhotos([]);
            console.log(error)
            setError(true);
            handleError();
        } finally {
            setLoading(false);
        }
    }
    const handleImageClick = async (imageId:string) => {
        try {
            const response = await axios.get(`https://api.unsplash.com/photos/${imageId}`, {
                params: {
                    client_id: accessKey,
                }
            });
            if (response.data) {
                setImage(response.data);
            }
        } catch (error) {
            console.log(error);
            handleError();
        }
    }
    return(
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <SearchBar onSearch={handleSearch}/>
            {error && <Error/>}
            {photos.length > 0 && <ImageGallery images={photos} onImageClick={handleImageClick} onClick={openModal}/>}
            {loading && <Loader />}
            {totalPages > 1 && totalPages > page && <LoadMoreBtn onClick={handleMoreClick}/>}
            {image && Object.keys(image).length > 0 && <ImageModal 
                photo={image}
                modalState={modalIsOpen}
                close={closeModal}
                afterClose={afterCloseModal}
            />}
        </>
    )
}
export default App;


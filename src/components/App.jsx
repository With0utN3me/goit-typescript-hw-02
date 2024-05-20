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

const App = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTopic, setTopic] = useState("");
    const [image, setImage] = useState({});

    const handleError = () => toast.error("Sorry, an error has occured.");

    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    }
    const afterCloseModal = () => {
        setImage({});
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    const baseURL= "https://api.unsplash.com/search/photos/?";
    const accessKey = "RBukxUK_I9GjSKnvHTgvdpwXFN5U9C58BKFGR3j6tnM";

    const handleSearch = async (topic) => {
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
    const handleImageClick = async (imageId) => {
        try {
            const response = await axios.get(`https://api.unsplash.com/photos/${imageId}`, {
                params: {
                    client_id: accessKey,
                }
            });
            if (response.data) {
                setImage(response.data)
            }
        } catch (error) {
            console.log(error)
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
            {Object.keys(image).length > 0 && <ImageModal 
                image={image}
                modalState={modalIsOpen}
                close={closeModal}
                afterClose={afterCloseModal}
            />}
        </>
    )
}
export default App;


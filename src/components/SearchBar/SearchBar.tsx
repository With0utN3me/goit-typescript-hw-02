import React, { useState } from 'react';
import toast from 'react-hot-toast';
import css from "./SearchBar.module.css"

type Props = {
    onSearch: (T:string) => void;
}
const SearchBar = ({ onSearch }: Props) => {
    const [topic, setTopic] = useState('');

    const handleWarning = () => toast("Please enter search term!", {
        icon: <img src="data:image/png;base64,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"></img>,
    });
    const handleSubmit = (evt:React.FormEvent) => {
        evt.preventDefault();
        
        if (topic.trim() === "") {
            handleWarning();
            return;
        }
        onSearch(topic);
        setTopic('');
    };

    const handleChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
        setTopic(evt.target.value);
    };

    return (
        <header className={css['header']}>
            <form className={css['search-form']} onSubmit={handleSubmit}>
                <button className={css['search-btn']} type="submit">&#x1f50d;</button>
                <input
                    className={css['search-input']}
                    id='search_bar'
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={topic}
                    onChange={handleChange}
                />
            </form>
        </header>
    );
};

export default SearchBar;

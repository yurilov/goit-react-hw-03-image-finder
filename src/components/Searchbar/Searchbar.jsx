import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends Component{
    state = {
        searchQuery: '',
    };

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.searchQuery.trim() === '') {
            toast.error('Please, enter search query');
            return;
        }

        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });
    };

    handleSearchQuery = e => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
    };

    render() {
        return (
            <>
                <header className={s.searchbar}>
                    <form className={s.form} onSubmit={this.handleSubmit}>
                        <button type="submit" className={s.button}>
                            <span className={s.buttonLabel}>Search</span>
                        </button>

                        <input
                            className={s.input}
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                            name="searchQuery"
                            onChange={this.handleSearchQuery}
                        />
                    </form>
                </header>
            </>
        );
    }
}


export default Searchbar;
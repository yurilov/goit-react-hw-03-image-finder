import propTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = ({onSubmit}) => {
    return (
            <>
               <header className={s.searchbar}>
                    <form className={s.form} onSubmit={onSubmit}>
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
                        />
                    </form>
                </header> 
            </>
        )
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default Searchbar;
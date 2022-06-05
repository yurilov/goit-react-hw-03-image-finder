import propTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button className={s.button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};

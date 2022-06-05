import propTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webImage, openModal, description }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.image}
        src={webImage}
        alt={description}
        onClick={openModal}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webImage: propTypes.string.isRequired,
  openModal: propTypes.func.isRequired,
  description: propTypes.string.isRequired,
};

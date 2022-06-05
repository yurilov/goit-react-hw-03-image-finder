import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={s.overlay} onClick={this.props.onClose}>
        <div className={s.modal}>
          <img
            src={this.props.largeImageURL}
            alt={this.props.description}
          />
        </div>
      </div>
    );
  }
}

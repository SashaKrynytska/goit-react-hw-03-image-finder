import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    tags: PropTypes.string,
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
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { src, tags } = this.props;

    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={src} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;

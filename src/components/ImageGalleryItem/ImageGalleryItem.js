import { Component } from 'react';
// import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  constructor(props) {
    super(props);

    this.src = props.src;
    this.alt = props.tags;

    this.state = {
      isModalOpen: false,
    };
  }

  handleClick = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  render() {
    const { src, tags } = this.props;
    const { isModalOpen } = this.state;

    return (
      <li className={css.ImageGalleryItem}>
        {isModalOpen && (
          <Modal onClose={this.handleClick} src={src} alt={tags} />
        )}
        <img
          className={css['ImageGalleryItem-image']}
          src={src}
          alt={tags}
          onClick={this.handleClick}
        />
      </li>
    );
  }
}

// ImageGalleryItem.propTypes = {
//   src: PropTypes.string.isRequired,
//   tags: PropTypes.string,
// };

export default ImageGalleryItem;

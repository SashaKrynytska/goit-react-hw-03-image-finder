import { Component } from 'react';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Modal from './Modal';
import fetchImages from '../galleryAPI';
import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImage: '',
    error: null,
  };

  // когда при обновлении запрос не равен между стейтами, делаем фетч
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }
  }

  // запрос из формы пишем в стейт
  onChangeQuery = query => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: query,
      error: null,
    });
  };

  getImages = async () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const { hits } = await fetchImages(searchQuery, currentPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
      }));

      if (currentPage !== 1) {
        this.scrollOnLoadButton();
      }
    } catch (error) {
      console.log('что-то пошло не так', error);
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  // пишем большое изображение в стейт и открываем модалку
  handleGalleryItem = largeImageURL => {
    this.setState({
      largeImage: largeImageURL,
      showModal: true,
    });
  };

  // Переключение модалки
  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImage: '',
    }));
  };

  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, isLoading, showModal } = this.state;
    const ShowLoadMore = images.length > 0 && images.length >= 12;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onChangeQuery} />
        {images.length < 1 && <h2>The gallery is empty - use Search!</h2>}
        <ImageGallery images={images} onClick={this.handleGalleryItem} />
        {isLoading && <Loader />}
        {showModal && <Modal onClose={this.toggleModal} />}
        {ShowLoadMore && <Button onClick={this.getImages} />}
      </div>
    );
  }
}

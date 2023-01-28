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
    page: 1,
    query: '',
    isLoading: false,
    showModal: false,
    totalImages: 0,
    largeImage: '',
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      console.log(prevState.page);
      console.log(this.state.page);
      this.getImages();
    }
  }

  // запрос из формы пишем в стейт
  onChangeQuery = query => {
    this.setState({
      images: [],
      page: 1,
      query: query,
      totalImages: 0,
    });
  };

  getImages = async () => {
    const { page, query } = this.state;
    this.setState({
      isLoading: true,
    });

    try {
      const response = await fetchImages(query, page);

      const dataImages = response.hits.map(({ id, tags, largeImageURL }) => ({
        id,
        tags,
        largeImageURL,
      }));

      this.setState(prevState => ({
        images: [...prevState.images, ...dataImages],
        totalImages: response.totalHits,
        error: '',
      }));

      if (page !== 1) {
        this.scrollOnLoadButton();
      }
    } catch (error) {
      this.setState({ error: 'Something wrong... Try again!' });
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

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, showModal, totalImages } = this.state;
    const showLoadMore = images.length !== totalImages && !isLoading;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onChangeQuery} />
        {images.length < 1 && <h2>The gallery is empty - use Search!</h2>}
        {images.length > 1 && (
          <ImageGallery images={images} onClick={this.handleGalleryItem} />
        )}
        {isLoading && <Loader />}
        {showModal && <Modal onClose={this.toggleModal} />}
        {showLoadMore && <Button onClick={this.loadMore} />}
      </div>
    );
  }
}

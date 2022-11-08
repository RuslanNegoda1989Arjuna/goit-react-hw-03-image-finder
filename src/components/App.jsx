import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchPictures from './Api/Api';
import { Div } from './App.styled';
import { LoadeMore } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spiner } from './Loader/Loader';
import Modal from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    gallery: [],
    isLoading: false,
    error: null,
    largeImage: '',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.search;
    const prevPage = prevState.page;

    const { search, page } = this.state;

    // перевірка чи змінився пошук і чи змінилась сторінка, якщо щось змінилось фетчим
    if (prevSearch !== search || prevPage !== page) {
      try {
        debugger;
        this.setState({ isLoading: true });

        const data = fetchPictures(search, page);
        data.then(data => {
          // Перевіряємо чи щось знайшли, якщо ні то повідомляємо
          if (data.hits.length === 0) {
            toast.error('Nothing is found !', {
              position: toast.POSITION.TOP_LEFT,
            });
          }

          this.setState(prevState => {
            return { gallery: prevState.gallery.concat(data.hits) };
          });
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  // Ф-ція на кнопка дозавантаження картинок
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // отримуємо значення з інпут форми пошуку
  onSearchValue = value => {
    if (value.value === '') {
      return toast.warn('Enter a word for search');
    } else if (value.value === this.state.search) {
      return;
    }

    this.setState({
      search: value.value,
      page: 1,
      gallery: [],
    });
  };

  // Modall
  openModal = index => {
    this.setState(({ gallery }) => ({
      showModal: true,
      largeImage: gallery[index].largeImageURL,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { toggleModal, openModal } = this;
    const { gallery, isLoading, showModal, largeImage } = this.state;
    return (
      <>
        <Div>
          <Searchbar onSubmit={this.onSearchValue} />
          {isLoading && <Spiner />}
          <ImageGallery gallery={gallery} openModal={openModal} />
          {showModal && (
            <Modal toggleModal={toggleModal} largeImage={largeImage} />
          )}
          <ToastContainer
            autoClose={2500}
            position="top-left"
            theme="colored"
          />
          {gallery.length >= 12 && <LoadeMore loadMore={this.loadMore} />}
        </Div>
      </>
    );
  }
}

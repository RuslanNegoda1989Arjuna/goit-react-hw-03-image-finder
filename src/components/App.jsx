import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchPictures from './Api/Api';
import { Div } from './App.styled';
import { LoadeMore } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spiner } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    gallery: [],
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.search;
    const prevPage = prevState.page;

    const { search, gallery, page } = this.state;

    // перевірка чи змінився пошук і чи змінилась сторінка, якщо щось змінилось фетчим
    if (prevSearch !== search || prevPage !== page) {
      try {
        this.setState({ isLoading: true });

        const data = fetchPictures(search, page);
        data.then(data => {
          // Перевіряємо чи щось знайшли, якщо ні то повідомляємо
          if (data.hits.length === 0) {
            toast.error('Nothing is found !', {
              position: toast.POSITION.TOP_LEFT,
            });
          }
          console.log('Кількість', data.hits.length);
          console.log('Загальна кількість', data.hits);
          console.log('Загальна кількість data', data.total);
          console.log('Загальна кількість галереї', gallery.length);

          this.setState(prevState => {
            return { gallery: prevState.gallery.concat(data.hits) };
          });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      } finally {
        this.setState({ isLoading: true });
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

  render() {
    const { gallery, isLoading } = this.state;
    return (
      <Div>
        <Searchbar onSubmit={this.onSearchValue} />
        {isLoading && <Spiner />}
        <ImageGallery gallery={gallery} />
        <ToastContainer autoClose={2500} position="top-left" theme="colored" />
        {gallery.length >= 12 && <LoadeMore loadMore={this.loadMore} />}
      </Div>
    );
  }
}

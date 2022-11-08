import { Component } from 'react';
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

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const prevPage = prevState.page;

    const { search, gallery, page } = this.state;

    // перевірка чи змінився пошук і чи змінилась сторінка, якщо щось змінилось фетчим
    if (prevSearch !== search || prevPage !== page) {
      this.setState({ isLoading: true });

      try {
        const data = fetchPictures(search, page);

        console.log(data);
        data.then(data => {
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
    this.setState({ search: value.value, page: 1, gallery: [] });
  };

  render() {
    const { search, gallery } = this.state;
    return (
      <Div>
        <Searchbar onSubmit={this.onSearchValue} />
        <ImageGallery gallery={gallery} />
        {this.state.isLoading && <Spiner />}
        {gallery.length >= 12 && <LoadeMore onClick={this.loadMore} />}
      </Div>
    );
  }
}

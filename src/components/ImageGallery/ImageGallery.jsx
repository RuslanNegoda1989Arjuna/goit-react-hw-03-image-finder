import axios from 'axios';
import { LoadeMore } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Spiner } from 'components/Loader/Loader';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    page: 1,
    gallery: [],
    isLoading: false,
  };

  async getPictures() {
    const config = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '30077123-b07f3bce85b956a1421c5c012',
        q: `${this.props.searchValue}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: `${this.state.page}`,
      },
    };

    const response = await axios(config);

    const data = response.data;
    return data;
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    // Умова чи змінились пропси, щоб не було зацикленості
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ page: 1, gallery: [] });
    }

    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      this.getPictures()
        .then(data => {
          this.setState(prevState => {
            return { gallery: prevState.gallery.concat(data.hits) };
          });
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    const { gallery } = this.state;
    return (
      <>
        {this.state.isLoading && <Spiner />}
        <Gallery>
          {gallery.map(({ id, webformatURL }) => {
            return (
              <ImageGalleryItem key={id} smallImg={webformatURL} id={id} />
            );
          })}
        </Gallery>
        <LoadeMore onClick={this.loadMore} />
      </>
    );
  }
}

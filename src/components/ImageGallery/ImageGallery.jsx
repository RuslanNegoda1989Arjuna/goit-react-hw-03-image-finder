import axios from 'axios';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    gallery: [],
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
        page: 1,
      },
    };

    const response = await axios(config);

    const data = response.data;
    return data;
  }

  componentDidUpdate(prevProps, prevState) {
    // Умова чи змінились пропси, щоб не було зацикленості
    if (prevProps.searchValue !== this.props.searchValue) {
      this.getPictures().then(data => {
        this.setState({ gallery: data.hits });
      });
    }
  }

  render() {
    const { gallery } = this.state;
    return (
      <Gallery>
        {gallery.map(({ id, webformatURL }) => {
          return <ImageGalleryItem key={id} smallImg={webformatURL} id={id} />;
        })}
      </Gallery>
    );
  }
}

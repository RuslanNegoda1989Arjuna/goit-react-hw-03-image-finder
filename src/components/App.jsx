import { Component } from 'react';
import { Div } from './App.styled';
// import { LoadeMore } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    search: '',
  };

  // отримуємо значення з інпут форми пошуку
  onSearchValue = value => {
    this.setState({ search: value.value });
  };

  render() {
    const { search } = this.state;
    return (
      <Div>
        <Searchbar onSubmit={this.onSearchValue} />
        <ImageGallery searchValue={search} />
      </Div>
    );
  }
}

import { Component } from 'react';
import { Div } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    search: '',
  };

  addContact = searchvalue => {
    const { search } = this.state;

    console.log('value search:', search);

    this.setState({ search: searchvalue });
    console.log('value search:', search);
  };

  render() {
    return (
      <Div>
        <Searchbar onSubmit={this.addContact} />
      </Div>
    );
  }
}

import { Component } from 'react';
import { Div } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar.styled';
export class App extends Component {
  state = {
    search: '',
  };

  addContact = searchvalue => {
    const { search } = this.state;

    this.setState({ search: searchvalue });
  };

  render() {
    return (
      <Div>
        <Searchbar onSubmit={this.addContact} />
      </Div>
    );
  }
}

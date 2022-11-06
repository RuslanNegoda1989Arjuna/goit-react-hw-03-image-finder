import { Component } from 'react';
import { Div } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar.styled';
export class App extends Component {
  state = {
    search: '',
  };

  render() {
    return (
      <div>
        <Div>
          <h1> Start working</h1>
          <Searchbar onSubmit={'hello'} />
        </Div>
      </div>
    );
  }
}

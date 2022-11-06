import { Component } from 'react';
import { Div } from './App.styled';
export class App extends Component {
  state = {
    search: '',
  };

  render() {
    return (
      <div>
        <Div>
          <h1> Start working</h1>
        </Div>
      </div>
    );
  }
}

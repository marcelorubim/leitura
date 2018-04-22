import React from 'react';
import ReactDOM from 'react-dom';
import Post from '../Post';
import { MemoryRouter } from 'react-router-dom'
import reducer from '../../reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(
    reducer
  )
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter >
        <Post post={{}} />
      </MemoryRouter>
    </Provider>
  ,div);
});
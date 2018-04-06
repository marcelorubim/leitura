import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore,applyMiddleware,compose  } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { BrowserRouter,Route } from 'react-router-dom'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunk,logger)
    )
)



ReactDOM.render(<Provider store={store}><BrowserRouter>
  <Route path="/:activeCategory?" component={App} />
</BrowserRouter></Provider>, document.getElementById('root'));
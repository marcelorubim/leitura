import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import ListPost from './ListPost';
import PostDetail from './PostDetail';
import { fetchCategories, selectCategory } from '../actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'



class App extends Component {
  state = {
    sortBy: 'voteScore'
  }
  sortBy = (e, { value }) => {
    this.setState({ sortBy: value })
  }

  componentDidMount() {
    const { receiveCategories} = this.props;
    receiveCategories();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/:activeCategory/:postId'>
            <PostDetail />
          </Route>
          <Route path="/:activeCategory?" component={ListPost}>
          </Route>

        </Switch>
      </div>
    );
  }
}
function mapStateToProps({ categories, posts, activeCategory }) {
  return {
    categories,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    receiveCategories: () => dispatch(fetchCategories()),
    changeCategory: (c) => dispatch(selectCategory(c))

  }
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));

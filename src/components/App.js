import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import Header from './Header';
import ListPost from './ListPost';
import PostDetail from './PostDetail';
import {fetchCategories,fetchPosts,selectCategory} from '../actions'
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
    const { receiveCategories, receivePosts, activeCategory, changeCategory } = this.props;
    receiveCategories();
    receivePosts();
    changeCategory(activeCategory);

  }
  render() {
    const { categories, changeCategory } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/postDetail/:postId?'>
            <PostDetail />
          </Route>
          <Route path="/:activeCategory?" component={ListPost}> 
          </Route>

        </Switch>
      </div>
        );
      }
    }
function mapStateToProps({categories, posts, activeCategory }) {
  return {
          categories,
        posts,
      }
    }
function mapDispatchToProps(dispatch) {
  return {
          receiveCategories: () => dispatch(fetchCategories()),
        receivePosts: () => dispatch(fetchPosts()),
        changeCategory: (c) => dispatch(selectCategory(c))
    
      }
    }
    export default withRouter(connect(
      mapStateToProps,
      mapDispatchToProps
    )(App));

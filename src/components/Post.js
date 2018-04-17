import React,{Component} from 'react';
import { Segment, Label,Button,Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { sendVotePost } from '../actions'
import { connect } from 'react-redux';
import { togglePostModal } from '../actions'

class Post extends Component {
  sendVote = (e,postId,option) => {   
    e.preventDefault(); 
    const { registerVotePost } = this.props
    registerVotePost(postId, { option })
  }
  render() {
    const { post, togglePostModal } = this.props
    return (
  <div>
      <Button.Group floated='right'>
        <Button primary icon onClick={(e) => this.sendVote(e,post.id, 'upVote')} >
          <Icon name='thumbs up'  />
        </Button>
        <Button primary icon onClick={(e) => this.sendVote(e,post.id, 'downVote')}>
          <Icon name='thumbs down'  />
        </Button>
        <Button primary icon onClick={(e) => togglePostModal(post.id)}>
          <Icon name='edit' />
        </Button>
        <Button primary icon>
          <Icon name='trash' />
        </Button>
      </Button.Group>
      <Link to={`/${post.category}/${post.id}`}><h2>{post.title}</h2></Link>
      <Segment.Group key={post.id}>
        <Segment>{post.body}</Segment>
        <Segment.Group horizontal>
          <Segment> <Label>
            Author
      <Label.Detail>{post.author}</Label.Detail>
          </Label></Segment>
          <Segment> <Label>
            Category
      <Label.Detail>{post.category}</Label.Detail>
          </Label></Segment>
          <Segment> <Label>
            Comments
      <Label.Detail>{post.commentCount}</Label.Detail>
          </Label></Segment>
          <Segment> <Label>
            Score
      <Label.Detail>{post.voteScore}</Label.Detail>
          </Label></Segment>
        </Segment.Group>
      </Segment.Group>
    </div>
    )
  }
}
function mapStateToProps(state, { post }) {
  return {
      post
  }
}
function mapDispatchToProps(dispatch) {
  return {
    togglePostModal: (postId) => dispatch(togglePostModal(postId)),
    registerVotePost: (postId, option) => dispatch(sendVotePost(postId, option))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
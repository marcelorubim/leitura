import React from 'react';
import { Segment, Label} from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  return (
    <div>
      <Link to={`/postDetail/${post.id}`}><h2>{post.title}</h2></Link>      
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
export default Post
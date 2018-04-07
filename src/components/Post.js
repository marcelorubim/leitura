import React from 'react';
import { Button,Segment,Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom'


const Post = ({ post }) => {
    return (
      <Segment.Group key={post.id}>
        <Segment>{post.title}
          <Button floated='right' size='mini' basic color='red'>Delete</Button>
          <Button floated='right' size='mini' basic color='blue'><Link to={`/postDetail/${post.id}`}>Open</Link></Button>
        </Segment>
        <Segment.Group>
          <Segment>{post.body}</Segment>
        </Segment.Group>
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
          <Segment><Button circular icon='thumbs up' /><Button circular icon='thumbs down' /></Segment>

        </Segment.Group>
      </Segment.Group>
    )
}
export default Post
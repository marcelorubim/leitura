import React from 'react';
import Post from './Post'
import { connect } from 'react-redux'


const ListPost = ({ posts, activeCategory }) =>
    (
        <div>
            {posts.filter(p => !p.deleted).filter(p => !activeCategory || p.category===activeCategory).map(p =>
                <Post key={p.id} post={p} />
            )}
        </div>
    )
function mapStateToProps({ posts, activeCategory }) {    
    return {
        posts: posts,
    }
}
export default connect(
    mapStateToProps
)(ListPost)
import React from 'react';
import Post from './Post'
import { connect } from 'react-redux'
import sortBy from 'sort-by';



const ListPost = ({ posts, activeCategory }) =>
    (
        <div>
            {posts.filter(p => !p.deleted).filter(p => !activeCategory || p.category===activeCategory).map(p =>
                <Post key={p.id} post={p} />
            )}
        </div>
    )
function mapStateToProps({ posts, activeCategory },{orderBy}) {    
    return {
        posts: posts.sort(sortBy(orderBy)),
    }
}
export default connect(
    mapStateToProps
)(ListPost)
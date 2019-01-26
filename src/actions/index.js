import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // Get all posts using the fetchPosts action creator
  await dispatch(fetchPosts());
  // Use lodash to get a list of unique user id's for the posts
  const userIds = _.uniq(_.map(getState().posts, 'userId'))
  // Loop through each user id to get the user information from fetchUser action creator
  userIds.forEach(id => dispatch(fetchUser(id)));

  // I could also use an advanced/alternative method using lodash:
  // _.chain(getState().posts)
  // .map('userId')
  // .uniq()
  // .forEach(id => dispatch(fecthUser(id)))
  // .value()
}

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response.data })
};


export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data })
};

// An alternative approach:
// export const fetchUser = (id) => dispatch => {
//   _fetchUser(id, dispatch);
// };
// const _fetchUser = _.memoize( async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`users/${id}`);
//   dispatch({ type: 'FETCH_USER', payload: response.data })
// });
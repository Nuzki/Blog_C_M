const fetch = require('node-fetch');

const resolvers = {
  Query: {
    posts: async (_, { limit, offset, tag }) => {
      let filter = '';
      if (tag) {
        filter = `(filter: { tags: { includes: [\"${tag}\"] } })`;
      }
      const query = `query { allPosts${filter} ${limit ? `(first: ${limit}${offset ? ", offset: " + offset : ''})` : ''} { nodes { id title content tags } } }`;
      const response = await fetch(POSTGRAPHILE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const { data } = await response.json();
      return data.allPosts.nodes;
    },
    post: async (_, { id }) => {
      const query = `query { postById(id: ${id}) { id title content tags } }`;
      const response = await fetch(POSTGRAPHILE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const { data } = await response.json();
      return data.postById;
    },
    comments: async (_, { post_id }) => {
      const query = `query { allComments(filter: { postId: { equalTo: ${post_id} } }) { nodes { id postId content createdAt } } }`;
      const response = await fetch(POSTGRAPHILE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const { data } = await response.json();
      return data.allComments.nodes.map(c => ({
        id: c.id,
        post_id: c.postId,
        content: c.content,
        created_at: c.createdAt
      }));
    },
  },
  Post: {
    comments: async (parent) => {
      const query = `query { allComments(filter: { postId: { equalTo: ${parent.id} } }) { nodes { id postId content createdAt } } }`;
      const response = await fetch(POSTGRAPHILE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const { data } = await response.json();
      return data.allComments.nodes.map(c => ({
        id: c.id,
        post_id: c.postId,
        content: c.content,
        created_at: c.createdAt
      }));
    }
  },
  Mutation: {
    addPost: async (_, { title, content, tags }) => {
      const mutation = `mutation { createPost(input: { post: { title: \"${title}\", content: \"${content}\", tags: ${tags ? JSON.stringify(tags) : '[]'} } }) { post { id title content tags } } }`;
      const response = await fetch(POSTGRAPHILE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation }),
      });
      const { data } = await response.json();
      return data.createPost.post;
    },
    updatePost: async (_, { id, title, content, tags }) => {
      let patch = [];
      if (title !== undefined) patch.push(`title: \"${title}\"`);
      if (content !== undefined) patch.push(`content: \"${content}\"`);
      if (tags !== undefined) patch.push(`tags: ${JSON.stringify(tags)}`);
      const mutation = `mutation { updatePostById(input: { id: ${id}, postPatch: { ${patch.join(', ')} } }) { post { id title content tags } } }`;
      const response = await fetch(POSTGRAPHILE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation }),
      });
      const { data } = await response.json();
      return data.updatePostById.post;
    },
    deletePost: async (_, { id }) => {
      const mutation = `mutation { deletePostById(input: { id: ${id} }) { deletedPostId } }`;
      const response = await fetch(POSTGRAPHILE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation }),
      });
      const { data } = await response.json();
      return !!data.deletePostById.deletedPostId;
    },
    addComment: async (_, { post_id, content }) => {
      const mutation = `mutation { createComment(input: { comment: { postId: ${post_id}, content: \"${content}\" } }) { comment { id postId content createdAt } } }`;
      const response = await fetch(POSTGRAPHILE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation }),
      });
      const { data } = await response.json();
      const c = data.createComment.comment;
      return {
        id: c.id,
        post_id: c.postId,
        content: c.content,
        created_at: c.createdAt
      };
    },
  },
};
module.exports = resolvers;

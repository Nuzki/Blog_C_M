const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    tags: [String]
    comments: [Comment]
  }
  type Comment {
    id: ID!
    post_id: ID!
    content: String!
    created_at: String
  }
  type Query {
    posts(limit: Int, offset: Int, tag: String): [Post]
    post(id: ID!): Post
    comments(post_id: ID!): [Comment]
  }
  type Mutation {
    addPost(title: String!, content: String!, tags: [String]): Post
    updatePost(id: ID!, title: String, content: String, tags: [String]): Post
    deletePost(id: ID!): Boolean
    addComment(post_id: ID!, content: String!): Comment
  }
`;

module.exports = typeDefs;
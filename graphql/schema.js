const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    input Data {
        email: String! 
    }

    type RootQuery {
        getUser(userInfo: Data): User!
        getUsers: [User]
    }

    type Post {
        _id: ID
        title: String!
        content: String!
        imageUr: String!
        creater: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }

    input UserData {
        email: String!
        name: String!
        password: String!
    }

    type RootMutation {
        createUser(userInput: UserData): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

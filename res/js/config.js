require('dotenv').config();
let token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

console.log(token);

export const config_data = {

    "query_function" : (username) => {
            let body = {
                query : `  query { 
                            user(login: ${username}) { 
                            name,
                                bio,
                                avatarUrl,
                                login,
                                repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
                                nodes {
                                    ... on Repository {
                                    name
                                    description
                                    updatedAt
                                    forks {
                                        totalCount
                                    }
                                    
                                    licenseInfo {
                                        name
                                    }
                                    stargazers {
                                        totalCount
                                      }
                                    primaryLanguage {
                                        name
                                    }
                                  }
                                }
                              }
                             }
                          }`
            }
          

          return body;
      },
      
    headers : {
        "Content-Type" : "application/json",
        Authorization : "bearer "+token
    },

    "baseUrl" : "https://api.github.com/graphql"

}


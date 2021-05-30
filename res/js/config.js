
export const config_data = {
    
    "git_data" : { 
                    token : "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",   
                    username : "desmondezo1" 
                },

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
      
    "headers" : {
        "Content-Type" : "application/json",
        Authorization : "Bearer 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"
    },

    "baseUrl" : "https://api.github.com/graphql"

}


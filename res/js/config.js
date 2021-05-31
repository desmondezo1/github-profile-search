import { GITHUB_PERSONAL_ACCESS_TOKEN } from "./keys.js";


console.log(GITHUB_PERSONAL_ACCESS_TOKEN);

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
        Authorization : "bearer "+GITHUB_PERSONAL_ACCESS_TOKEN
    },

    "baseUrl" : "https://api.github.com/graphql"

}


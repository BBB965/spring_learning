// cors 에러남

// const { Octokit } = require('@octokit/core');

// class GitHub {
//     constructor() {
//         this.token = '';
//     }

//     async getUser(user) {
//         // Octokit.js
//         // https://github.com/octokit/core.js#readme
//     //const {Octokit} = require("@octokit/core");
//     const octokit = new Octokit({
//         auth: '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'
//         })
  
//         const userRepsonse = await octokit.request('GET /users/{username}', {
//             username: user,
//             headers: {
//                 'X-GitHub-Api-Version': '2022-11-28'
//             }
//         });

//         const repoResponse = await octokit.requset('GET /users/{username}/repo', {
//             username : user,
//             headers: {
//                 'X-GitHub-Api-Version': '2022-11-28'
//             }
//         });

//         const userInfo = await userRepsonse.json()
//         const repo = await repoResponse.json()

//         console.log(userInfo)
//         console.log(repo)
//         return {
//             userInfo, repo
//         }
//     }
// }

class GitHub {
    constructor() {
      this.client_id = "298afac4b5bc721c9bc1";
      this.client_secret = "b9fb36198a91f52704ae47b5a6685d940afd0a6a";
      this.repos_count = 5;
      this.repos_sort = "created: asc";
    }
  
    async getUser(user) {
      const profileResponse = await fetch(
        `https://api.github.com/users/${user}?client_id=${
          this.client_id
        }&client_secret=${this.client_secret}`
      );
  
      const reposResponse = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=${
          this.repos_count
        }&&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${
          this.client_secret
        }`
      );
  
      const profile = await profileResponse.json();
      const repos = await reposResponse.json();
  
      return {
        // object short notation for profile: profile
        profile,
        repos
      };
    }
  }
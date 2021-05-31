


// Get the data previously stored in localstorage
function get_User_Data_From_Storage(){

    let data = JSON.parse(localStorage.getItem("Git-user-data"));

    if(!data){
        location.href = "index.html";
        return;
    }

    return data;
}


// show data to user 
function showuserdata(data) {

    let pageHead = document.querySelector("#header");
    let pageMain = document.querySelector("#main");
    let profileIcon = document.querySelector(".profile-icon");
    let repoCount = document.querySelector(".repo-count");
    let profileImg = document.querySelector(".img-wrapper");
    let profileName = document.querySelector(".name");
    let profileLoginName = document.querySelector(".login-name");
    let userBio = document.querySelector(".bio");
    let repos = document.querySelector(".repos");
    let repoTotalCount = document.querySelector(".repo-totalCount");
    

    console.log(data);

   
    profileIcon.innerHTML = ` <img src="${data.data.user?.avatarUrl}" alt="">`;
    repoCount.innerHTML = `<b>${ Object.keys(data.data.user?.repositories.nodes).length  }</b>`;
    repoTotalCount.innerHTML = `${ Object.keys(data.data.user?.repositories.nodes).length  }`;
    profileImg.innerHTML = 
    `   <img src="${data.data.user?.avatarUrl}" alt="">
        <span class="circle">
        <svg class="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z"></path></svg>
        </span>
        `;

    profileName.innerHTML = data.data.user?.name;
    profileLoginName.innerHTML = data.data.user?.login;
    userBio.innerHTML = data.data.user?.bio;
    repos.innerHTML = compileRepos();

    function getLanguageColor(language){
        let  color = "";
        switch (language) {
            case "HTML":
              color ="#e34c26";
              break;
            case "CSS": 
            color = "#563d7c";
            
            case "JavaScript": 
              color = "#f1e05a";
              break; 
            case "TypeScript":
              color = "#2b7489";
              break;
            default:
              color = "#e34c26";
          }

          return color;
    }

    function getDateDifference(date){
        let now = new Date();
        let oldDate = new Date(date);
        console.log(now);
        console.log(oldDate);

        let diff = ( now.getTime() - oldDate.getTime() ) / 1000;
        diff /= (60 * 60);

        // convert to days 
        if(diff >= 24 && diff <= 29 ){
            let num = +diff/24;
            // val = Math.abs(Math.round(num));
            return `${num} days`;
        }

        // // convert to months 
        // if(diff >= 30 && diff <= 364 ){
        //     let days = diff/24;
        //     let months = days / 30;
        //     val = Math.round(months);
        //     return `${val} months`;
        // }

        // convert to years 
        if(diff >= 365  ){
            let days = diff/24;
            let months = days / 30;
            let years = months / 12;
            val = Math.round(years);
            return `${val} years`;
        }

        return `${Math.round(diff)} hours`;
    
    }

    // loop through and combine repository data 
    function compileRepos(){
        let repoObject = data.data.user.repositories.nodes;
        let val = "";
        repoObject.map((repo)=>{
              val +=  `
                <div class="repo">
                        <div class="reponame">
                            <h3>${repo?.name}</h3>
                        </div>
                        <div class="repo-desc">
                            <p>${repo?.description}</p>
                        </div>
                        <div class="repo-stats">
                            <div class="repo-icons r-lang">
                                <span class="color-of-lang" style="background-color: ${getLanguageColor(repo.primaryLanguage?.name)}">
                                </span>
                             <span>
                             ${repo.primaryLanguage?.name}
                             </span>  
                            </div>
                            <div class="repo-icons r-star">
                                <span>
                                    <svg aria-label="stars" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-star">
                                        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                    </svg>
                                </span>
                                <span>
                                ${repo.stargazers?.totalCount}
                                </span>
                            </div>
                            <div class="repo-icons r-fork">
                                <span>
                                    <svg aria-label="fork" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-repo-forked">
                                        <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                                    </svg>
                                </span>

                                <span>
                                ${repo.forks?.totalCount}
                                </span>
                            </div>
                            <div class="repo-icons r-date">updated ${getDateDifference(repo.updatedAt)} ago</div>
                        </div>
                        <button class="star-btn" >
                           <span class="star-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5c-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1l-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2c17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9l183.7-179.1c5-4.9 8.3-11.3 9.3-18.3c2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7L323.1 772l36.1-210.3l-152.8-149L417.6 382L512 190.7L606.4 382l211.2 30.7l-152.8 148.9z" fill="grey"/><rect x="0" y="0" width="1024" height="1024" fill="rgba(0, 0, 0, 0)" /></svg>
                           </span>
                           <span>
                               Star
                           </span> 
                        </button>
                    </div>
                `

            })

            return val;
        
        
    }

   



}



showuserdata(get_User_Data_From_Storage());
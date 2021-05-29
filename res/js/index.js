import { config_data } from "./config.js";

const form = document.querySelector("#form");
const closeBtn = document.querySelector("#closeBtn");
const errorBox = document.getElementById("errorBox");




  // Gets the username from the input field 
  function getUsername (){
        let username = document.querySelector("#username").value;
        return JSON.stringify(username);
  };


  // Request and return usersdata from github graphql api
  async function getAndReturnUserData(username){
    let res = await fetch(config_data.baseUrl, {
      method: "POST",
      headers: config_data.headers,
      body: JSON.stringify(config_data.query_function(username))
    });

    let userdata = await res.json();

    if(userdata.errors){

      if(userdata.errors[0].type ="NOT_FOUND"){
        showErrors("😢 I'm sorry, I couldn't find that user");
      };
      return;
    }

    localStorage.setItem("Git-user-data", JSON.stringify(userdata) );
    console.log(userdata);
    location.href ="profile.html";
    return userdata;
  };


  // listen for form submission and send request
  form.addEventListener( "submit", (event) => {
      event.preventDefault();
      getAndReturnUserData(getUsername()).catch(e => showErrors("😬 I think something is wrong, Please try again"));
  });



// display error message 
function showErrors(message){
  let errorMsg = document.querySelector("#errorMsg");

    errorBox.style.display= "block";
    errorMsg.innerHTML = message;

    setTimeout(() => {
      errorBox.style.display= "none";
    }, 5000);
}

closeBtn.addEventListener("click", ()=>{
  errorBox.style.display= "none";
});















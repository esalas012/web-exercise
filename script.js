const buttons = document.querySelectorAll("button");
let checkbox1 = document.querySelector("#news-letter");
let checkboxes = document.querySelectorAll("input");

/*
*Adds Event listener to each check box
*Synchronizes checked and unchecked boxes
*/
checkboxes.forEach((checkbox)=>{
  checkbox.addEventListener("input", (e)=>{
    if(e.target.checked){
      checkboxes.forEach((cb)=>{
        cb.checked = true;
      })
    }
    else{
      checkboxes.forEach((cb)=>{
        cb.checked = false;
      })
    }
  })
})

/*
*Adds events listeners to the buttons in the page
*/
buttons.forEach(button=>{
  button.addEventListener("click", ()=>{
    /*
    *If the boxes have been checked and a message has not been posted
    *the following lines of code will run
    *and the data from the specified website will be posted on the site.
    */
    if(checkbox1.checked && !document.querySelector("#message1")){
      fetch("https://bl45immth4.execute-api.us-east-1.amazonaws.com/production/")
        .then((res)=>res.json())
        .then((res)=>{return JSON.parse(res.body)})
        .then((res)=>{
          checkboxes.forEach((cb)=>{
            cb.checked = false;
          })

          return res;
        })
        .then((res)=>{
            let message1= document.createElement("p");
            message1.style.backgroundColor="lightgreen";
            message1.style.paddingTop="4px";
            message1.style.paddingBottom="4px";
            message1.id = "message1";
            let message2=document.createElement("p");
            message2.style.backgroundColor="lightgreen";
            message2.style.paddingTop= "4px";
            message2.style.paddingBottom="4px";
            message2.id = "message2";
            message1.textContent = res.submitok;
            message2.textContent = res.submitok;
            document.querySelector(".buttonContainer1").appendChild(message1);
            document.querySelector(".buttonContainer2").appendChild(message2);
            alert(res.submitok);
        })
        .catch(function(){
          alert("System was unable to get the data requested");
        });
    }
    else if(checkbox1.checked){
      alert("Your spot has already been reserved");
    }
    else if(document.querySelector("#message1")){
      alert("Your spot has already been reserved");
    }
    else{
      alert("Check boxes to continue");
    }
  })
});

//Converts milliseconds into days, hours, minutes and seconds.
function msToTime(ms){
  let days = Math.floor(ms / 86400000);
  let hours = Math.floor(ms/3600000);
  let min = Math.floor(((ms/3600000) - hours) *60);
  let sec = Math.floor(((((ms/3600000) - hours) *60) - min) * 60);
  let hoursRemaining = hours-(days * 24);

  if(sec<10){
    sec=`0${sec}`;
  }
  if(min<10){
    min=`0${min}`;
  }
  if(hoursRemaining<10){
    hoursRemaining=`0${hoursRemaining}`;
  }
  if(days>0){
    return `${days} days - ${hoursRemaining}:${min}:${sec}`;
  }else{
    return `${hours-(days * 24)}:${min}:${sec}`;
  }

}
/*
*Creates a h2 tag that displays the time left.
*/
let timeTag = document.createElement("h2");
let todaysDate = new Date();
let fiveDaysFromNowMs = new Date().setDate(new Date().getDate() + 5);
let fiveDaysFromNow = new Date(new Date(fiveDaysFromNowMs).setHours(00,00,00));
let diffTime = Math.abs(fiveDaysFromNow - todaysDate);
time = msToTime(diffTime);
timeTag.textContent= time;
timeTag.style.textAlign = "center";
timeTag.style.fontSize = "1.5em";

//time is updated every second.
setInterval(function(){
  let timeTagSelector = document.querySelector("h2");
  todaysDate = new Date();
  fiveDaysFromNowMs = new Date().setDate(new Date().getDate() + 5);
  fiveDaysFromNow = new Date(new Date(fiveDaysFromNowMs).setHours(00,00,00));
  diffTime = Math.abs(fiveDaysFromNow - todaysDate);
  time = msToTime(diffTime);
  timeTagSelector.textContent= time;
}, 1000);
const timer =document.querySelector("#timer");
timer.appendChild(timeTag);

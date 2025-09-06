const BASE_URL = "https://v6.exchangerate-api.com/v6";

const dropdowns=document.querySelectorAll(".dropdown select");
const butn=document.querySelector("#btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdowns){
    for(code in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=code;
        newoption.value=code;
        if(select.name==="from" && code==="USD"){
            newoption.selected="selected"
        }
        else if(select.name==="to" && code==="INR"){
            newoption.selected="selected"
        }
        select.append(newoption);
     
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag=(element)=>{
    let currencyC=element.value;
    let countryCode=countryList[currencyC];    
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
    };





butn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amt = document.querySelector("input");
  let amtVal = amt.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amt.value = "1";
  }

  // Make sure both dropdowns have values like "USD", "INR"
  console.log("From:", fromCurr.value, "To:", toCurr.value);

  const URL = `${BASE_URL}/67ef200f4c009c0edce2ab64/pair/${fromCurr.value}/${toCurr.value}`;
  console.log("Fetching:", URL);

  let response = await fetch(URL);
  console.log("dfffff",response)
  let data = await response.json();
  console.log("API Response:", data);

  if (!data["conversion_rate"] || !data["base_code"]) {
    msg.innerText = "Error: Could not fetch exchange rate.";
    return;
  }

  let rate = data["conversion_rate"];
  console.log(rate);
  
  let finalAmount = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});


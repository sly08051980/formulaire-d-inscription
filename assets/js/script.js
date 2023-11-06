console.log("script Chargé");

    let zipadresse = document.getElementById("zipadresse").value;
    let zipville = document.querySelector("zipville");
    let zipcodepostal =document.querySelector("zipcodepostal")
    let change="";
    let apiUrl="";
    let test="";
    let li;

   let changezipadresse = document.getElementById("zipadresse");

    console.log("changezipadresse ", changezipadresse);
    changezipadresse.addEventListener("input", (eventInput) => {
         change = eventInput.target.value.length;
        console.log("change : ", change);
       
        const params = eventInput.target.value.split(" ").join("+");
        console.log("params : ", params);
        test = eventInput.target.value;
        nbrLetters(change, params); 
    })
 
async function nbrLetters(change, params,labels) {
    if (change > 4) {
        apiUrl ="https://api-adresse.data.gouv.fr/search/?q="+params;
        console.log(apiUrl);
        let dataFetchTer= await rechercheAdresse();
        console.log(dataFetchTer);
        rechercheDataFetcher(dataFetchTer)
        
    } 
}

function rechercheDataFetcher(dataFetchTer) {
    const labels = []; 
    for (const test of dataFetchTer.features) {
      labels.push(test.properties.label);
      console.log("resultat :",labels);
      listeLi(labels);
    }
    return labels;

}

function listeLi(labels) {
    let ul = document.querySelector("ul");
    ul.innerHTML="";
    for (let i = 0; i < labels.length; i++) {
       console.log("test li :",labels[i])
       li=document.createElement("li");
       li.innerHTML=labels[i];
       ul.appendChild(li);
    }
}

function clickLi(ul,li) {
    ul.addEventListener("click",function (e) {
        console.log("test li : " ,li.value);
        
    })
}

  function rechercheAdresse() {
    return new Promise((resolve) => {
        return resolve(
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                }
                
            }).then(function(response) {
            
                return response.json();
            })
        );
    });
}
console.log("script Chargé");

    let zipadresse = document.getElementById("zipadresse").value;
    let zipville = document.getElementById("zipville");
    let zipcodepostal =document.getElementById("zipcodepostal");
    let adresse = document.getElementById("zipadresse");
    let change="";
    let apiUrl="";
    let test="";
    let li;
    let city;
    let cityCode;
    let cityName;
    let livfac=document.getElementById("livfac");
    let livadresse = document.getElementById("liv_adresse");
    let livville = document.getElementById("liv_ville");
    let livcodepostal = document.getElementById("liv_codepostal");

    let ul = document.querySelector("ul");
    let changezipadresse = document.getElementById("zipadresse");

    console.log("changezipadresse ", changezipadresse);
    
    //#############################################################
    //ecouteur sur l adresse pour modifier les espace en +
    //#############################################################
    changezipadresse.addEventListener("input", (eventInput) => {
         change = eventInput.target.value.length;
        console.log("change : ", change);
       
        const params = eventInput.target.value.split(" ").join("+");
        console.log("params : ", params);
        test = eventInput.target.value;
        nbrLetters(change, params); 
    })
    //#############################################################
    //fonction pour faire appel a la fonction fetch suivant le nbr de lettre tapé
    //appel de la fonction dupliquer pour ecrire en simultané dans la livraison
    //#############################################################
async function nbrLetters(change, params) {
    if (change > 4) {
        apiUrl ="https://api-adresse.data.gouv.fr/search/?q="+params;
        console.log("api : " ,apiUrl);
        let dataFetchTer= await rechercheAdresse();
        console.log("data fetccher : ",dataFetchTer);
       
        rechercheDataFetcher(dataFetchTer); 
        
        ul.style.display="block"; 
        
        dupliquer() 
    } 
}
    //#############################################################
    //fonction pour récupérer les valeurs du tableau renvoyé de fetch
    //#############################################################
function rechercheDataFetcher(dataFetchTer) {
    const labels = [];

    city =[];
    cityCode=[];
    cityName=[];
    
    for (const recherche of dataFetchTer.features) {
    
     
      labels.push(recherche.properties.label);
      console.log("resultat :",labels);
      city.push(recherche.properties.city);
      console.log("city : " ,city);
       cityCode.push(recherche.properties.postcode);
      console.log("city code postal :",cityCode);
      cityName.push(recherche.properties.name);
      console.log("cityname : ",cityName);
      listeLi(labels);
     
    }
}
    //#############################################################
    //fonction pour créer la liste li et appel a la fonction click
    //#############################################################

function listeLi(labels) {
    ul.innerHTML="";
    for (let i = 0; i < labels.length; i++) {
       li=document.createElement("li");
       li.innerHTML=labels[i];
       li.setAttribute("id",[i]);
       ul.appendChild(li);

       clickLi(li,city,cityCode,cityName); 
    }  
}

    //#############################################################
    //gestion du click li pour intégrer dans les champs la valeur du li
    //ajout de dupliquer pour copier aussi dans le champs livraison 
    //remet le ul a "" et le fait disparaitre
    //#############################################################
function clickLi(li,city,cityCode,cityName) {
    li.addEventListener("click", (event) => {
        console.log("test : ",event.target.innerHTML);
        console.log("city : ", city);
        console.log("test city : ",city[li.id]);
        console.log("test cityCode : ",cityCode[li.id]);
        console.log("test cityName : ", cityName[li.id]);

        zipcodepostal.value = cityCode[li.id];
        zipville.value=city[li.id];
      
        adresse.value=cityName[li.id];
        dupliquer();
        ul.innerHTML = "";
        ul.style.display="none";      
      });  
}
    //#############################################################
    //fonction qui permet de copier la facturation sur la livraison si le bouton est coché
    //#############################################################
    
function dupliquer() {

    if (livfac.checked==true) {
        livadresse.value= adresse.value;
        livville.value =zipville.value;
        livcodepostal.value=zipcodepostal.value;     
    }

    livfac.addEventListener('change',function () {
        if (this.checked){
            livadresse.value= adresse.value;
            livville.value =zipville.value;
            livcodepostal.value=zipcodepostal.value; 
        }else{
            livadresse.value= "";
            livville.value ="";
            livcodepostal.value="";
        }
        
    })


}
dupliquer();

    //#############################################################
    //fonction fetch pour interroger l api
    //#############################################################
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
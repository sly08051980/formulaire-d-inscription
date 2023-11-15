import { v4 as uuidv4} from 'https://jspm.dev/uuid';
console.log(uuidv4());
console.log("script Chargé");

    let zipadresse = document.getElementById("zipadresse").value;
    let zipadresse1= document.getElementById("zipadresse");
    let zipville = document.getElementById("zipville");
    let zipcodepostal =document.getElementById("zipcodepostal");
    let adresse = document.getElementById("zipadresse");
    const validate = document.getElementById("validate");
    const civility =document.querySelector('input[name=choix]:checked');
    let nom =document.getElementById("nom");
    let prenom=document.getElementById("prenom");
    let email=document.getElementById("email")
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
    const URL_API = "https://api.jsonbin.io/v3";
    const API_KEY = '$2a$10$xKWiKj9TSsybUfnpPg87Ouv9o1lkVLt.0TBBDfOUcVCoDSPCWKQV2';
    let collectionRecord=""
    let records=[];
    let collection ;
    let collectionBins;
    let numberBins;
    let createJson ={};
    let myuuid = crypto.randomUUID();
    let count =0;
    let premierEnregistrement =0;


    


    
    //#############################################################
    //ecouteur sur l adresse pour modifier les espace en +
    //#############################################################
    changezipadresse.addEventListener("input", (eventInput) => {
         change = eventInput.target.value.length;
        // console.log("change : ", change);
       
        const params = eventInput.target.value.split(" ").join("+");
        // console.log("params : ", params);
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
        // console.log("api : " ,apiUrl);
        let dataFetchTer= await rechercheAdresse();
        // console.log("data fetccher : ",dataFetchTer);
       
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
    //   console.log("resultat :",labels);
      city.push(recherche.properties.city);
    //   console.log("city : " ,city);
       cityCode.push(recherche.properties.postcode);
    //   console.log("city code postal :",cityCode);
      cityName.push(recherche.properties.name);
    //   console.log("cityname : ",cityName);
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
        // console.log("test : ",event.target.innerHTML);
        // console.log("city : ", city);
        // console.log("test city : ",city[li.id]);
        // console.log("test cityCode : ",cityCode[li.id]);
        // console.log("test cityName : ", cityName[li.id]);

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

    //#############################################################
    //fonction fetch pour interroger l api
    //#############################################################




validate.addEventListener("click", function() {


    if(nom.value==="" || prenom.value ==="" || email.value==="" || zipadresse1.value==="" || zipville.value ==="" || zipcodepostal.value ==="" || livadresse.value ==="" || livcodepostal.value==="" || livcodepostal.value ===""){
        // console.log("remplir les champs ")
        window.alert("veuillez remplir les champs vide");
        
    }else{
        createJson=[{id : myuuid, sir_miss : civility ,name : nom.value,first_name : prenom.value,email : email.value,street : zipadresse1.value,city : zipville.value,postal_code : zipcodepostal.value,delivery_adress :[{street : livadresse.value,city : livville.value,postal_code:livcodepostal.value}]}]
        console.log(createJson);
        getReadCollection();
    }

console.log(civility);
  });

            //######################################################################################
            //pour créer un bins et mettre les premieres valeurs si pas de bins ds la collection
            //######################################################################################

            async function postCreateBin(createJson,collectionRecord){
                const req = await fetch(`${URL_API}/b`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Master-Key': API_KEY,
                      'X-Bin-Name' : 'cours-exo',
                       'X-Collection-Id' :collectionRecord,
                    },
                    body: JSON.stringify(createJson),
                  });
                  const jsonResponse = await req.json();
                  premierEnregistrement=1;
                  return jsonResponse;
            }

            //######################################################################################
            //pour lire la collection et récupéré la collection id
            //######################################################################################       

            async function getReadCollection(){
                const response = await fetch(`${URL_API}/c`, {
                    method: "GET",
                    headers: {
                      'X-Master-Key': API_KEY,
                    },
                  });
              
                   collection = await response.json();
                 console.log("Data:", collection);
                  collectionRecord = collection.map(record=>record.record)[0];
                  console.log("collectionRecord",collectionRecord)
                // const responseCreateBins = await postCreateBin(json,collectionRecord);
                  getFindBins(collectionRecord);
                  
                  return collection;
              }
            
                        //######################################################################################
                        //pour rechercher le bins de la collection et récupérer le bins id
                        //######################################################################################
            
            
            async function getFindBins(collectionRecord){
               
                    const response1 =await fetch(`${URL_API}/c/${collectionRecord}/bins`,{
                        method :"GET",
                        headers:{
                            'X-Master-Key':API_KEY,
                        },
                    });
                    // console.log("response1:",response1);
                    // console.log("srdtgh ",collectionRecord)
                    collectionBins=await response1.json();
                     
                    if (collectionBins.length===0 && count===0){
                        console.log("nullllllllllllllllllllllllllll")
                        count=count+1;
                      
                       postCreateBin(createJson,collectionRecord);
                        getReadCollection();
                        
                    }else{
                        count=count+1;
                        console.log("collection bins :" ,collectionBins);
                    
                        numberBins = collectionBins.map(bin=>bin.record);
                        console.log("number : "+numberBins);
                        getReadBins(numberBins)
                        return collectionBins;
                    }
            }
            
                        //######################################################################################
                        //pour lire le bins suivant l id et récupérer les donnée
                        //######################################################################################
            
            
            async function getReadBins(numberBins) {
              
                const response = await fetch(`${URL_API}/b/${numberBins}`, {
                  headers: {
                    'X-Master-Key': API_KEY,
                  },
                });

                  const readCollectionBins = await response.json();
                //   console.log("readBins record ", readCollectionBins.record);
                //   console.log("readCollectionBins : ", readCollectionBins);
                //   console.log("createJson : ",createJson);
                    records.push(createJson);
                    // console.log("records : ",records);
                    if(premierEnregistrement===0){
                        readCollectionBins.record.forEach(identite => {
                            records.push(identite);
                        });
                    }
                    
                    // records.push(readCollectionBins.record);
                    console.log("Tableau : ", records);
                    pushJson(records);
                    if(records.length>0){
                        console.log("reussit");
                       
                    }
                    // pushJson(records,createJson);
                    return readCollectionBins;
                    
              }
            
                        //######################################################################################
                        //pour ajouter des données dans le bins
                        //######################################################################################

            function pushJson(records) {
                console.log("records : ",records);
                // console.log("json : ",createJson);
                
                // records.push(createJson);
                // console.log()
                getAjoutBins(numberBins,records);
            }
            
            async function getAjoutBins(numberBins,records) {
                
               if (count>=1){
                const req = await fetch(`${URL_API}/b/${numberBins}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Master-Key': API_KEY,
                    },
                    
                    body: JSON.stringify(records),
                  });
                
                  const jsonResponse = await req.json();
                  return jsonResponse;
            }
        }

            // document.getElementById("delete").addEventListener("click",function(){

            //     console.log(records)
            //  const del=  records.filter((byid)=>byid.id ==='338f0594-2f5b-414c-bde9-478eb77c0c30');
            //  records=del;
            //  console.log(records)
            //  getAjoutBins(records);

            // })
                       
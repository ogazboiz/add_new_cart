import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// firebase-database.js
// const  = {
//     databaseURL: "https://playground-6276d-default-rtdb.firebaseio.com/shoppingList"
// }
const appSettings = {
    apiKey: "AIzaSyAm-erYMkpKujaSzayqXU98Yb4O6USBBIs",
    authDomain: "playground-6276d.firebaseapp.com",
    databaseURL: "https://playground-6276d-default-rtdb.firebaseio.com",
    projectId: "playground-6276d",
    storageBucket: "playground-6276d.appspot.com",
    messagingSenderId: "68077905857",
    appId: "1:68077905857:web:41b61d97bf32e596af3140"
  };

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
// console.log(app)

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
                                                                                                                                                        
    clearInputFieldEl() 
    
    // console.log(inputValue)
})


onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let shopArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        
    
        for (let index = 0; index < shopArray.length; index++) {
           let currentItem= shopArray[index]
           let currentItemID = currentItem[0]
           let currentItemValues= currentItem[1]
            
    
           appendItemToShoppingList(currentItem)
    
    
    
        }
    }
    else{
        shoppingListEl.innerHTML= "nothing is found..."
    }
    
   
    
})

function clearInputFieldEl() {
    inputFieldEl.value = "" 
}
function appendItemToShoppingList(item) {
    // shoppingListEl.innerHTML  += `<li>${str}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let  newEl = document.createElement("li")

    newEl.classList.add("item-button")
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function(){

        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB )
        console.log(itemID)
    })
    shoppingListEl.append(newEl)
}
function clearShoppingListEl(){
    shoppingListEl.innerHTML =  ""
}  


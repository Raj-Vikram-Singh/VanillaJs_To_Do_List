const toDoList = document.getElementById("toDoList");
let newToDoItem =  document.getElementById("inputToDo");

let EntierList = [];
let id =0;

const CHECK = "fa-check-square-o";
const UNCHECK = "fa-square-o";
const LineThrough = "linethrough";
 
// function to render the view for the the new lists added.
function showItem(task, id, done){ 
   
    let Complete = done ?  CHECK : UNCHECK ;
    let Line = done ? LineThrough:"";

    let newList = ` <li class = "newList"> 
                        <i class ="fa ${Complete} check" id = ${id} title = "check"></i>
                        <p class = "text ${Line}"> ${task} </p>
                        <i class ="fa fa-trash delete" title = "delete" id = ${id}></i>
                    </li> `;

    if(task){ 

        toDoList.insertAdjacentHTML("afterbegin",newList); 
        
        EntierList.push({taskName: task, id: id, done: false})
        
        setLocalStorage(EntierList);
    }
    newToDoItem.value="";

    
}

// function to add the new list using a button
function saveItemButton(){

    let task = newToDoItem.value;
    showItem(task, id, false);
    id++;
}


// event listener to add the new list when the user hits Enter.
document.addEventListener("keyup", function(event){
    let task = newToDoItem.value.trim();
    if(event.keyCode == 13){
        showItem(task, id, false);
        id++;
    }

});

// function to delete a list item
function deleteItem(element){
     element.parentNode.parentNode.removeChild(element.parentNode); 
     
     EntierList =  EntierList.filter(item => item.id != element.id);
        setLocalStorage(EntierList);
}

// function to mark as complete a list item.
function checkItem(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LineThrough);
    
    for(i=0 ; i< EntierList.length ; i++){
    if(element.id == EntierList[i].id){
        EntierList[i].done = EntierList[i].done ? false : true;
    }
    }
    setLocalStorage(EntierList);
}

// event listener to delete and check a list item
toDoList.addEventListener("click", function(event){
    let element = event.target;

    if(element.title === "delete"){
        deleteItem(element);
    }
    else if(element.title === "check"){
        checkItem(element);

    }

    console.log(JSON.stringify(EntierList));

});

// functions to set and get value in Local Storage
function setLocalStorage(list){
    localStorage.setItem("taskList", JSON.stringify(list));
}

function getLocalStorage(){

  return JSON.parse(localStorage.getItem("taskList"));

}

// function to render the list by accessing Local Storage.
function persistingSession(){
    
    let storedList = getLocalStorage();
        if(!storedList){
            id = 0;
        }

       else {
            id = storedList.length;       

            storedList.forEach(element => {
                console.log("This is the stored List  " + element.taskName);
                showItem(element.taskName, element.id, element.done);
                
            });
       }
}


   window.onload= persistingSession;

//    function to empty the local storage and refresh the page.
   function refresh(){
       localStorage.clear();
       location.reload();
   }

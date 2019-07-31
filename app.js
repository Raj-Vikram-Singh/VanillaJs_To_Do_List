const toDoList = document.getElementById("toDoList");
let newToDoItem =  document.getElementById("inputToDo");

let EntierList = [];
let id =0;

const CHECK = "fa-check-square-o";

const UNCHECK = "fa-square-o";

const LineThrough = "linethrough";
 

function showItem(task, id, done){ 
    // let task = newToDoItem.value;

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

function saveItemButton(){
    let task = newToDoItem.value;

    showItem(task, id, false);
    
     id++;



}


document.addEventListener("keyup", function(event){
    let task = newToDoItem.value.trim();
    if(event.keyCode == 13){
        showItem(task, id, false);

        // EntierList.push({taskName: task, id: id, done: false})
        id++;

        // setLocalStorage(EntierList);
    }

});


let filteredList = EntierList;
function deleteItem(element){
     element.parentNode.parentNode.removeChild(element.parentNode); 
     
     filteredList =  filteredList.filter(item => item.id != element.id);
        setLocalStorage(filteredList);
}

function checkItem(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LineThrough);
    EntierList[element.id].done = EntierList[element.id].done ? false : true;
    setLocalStorage(EntierList);
}

toDoList.addEventListener("click", function(event){
    let element = event.target;

    if(element.title === "delete"){
        deleteItem(element);
    }
    else if(element.title === "check"){
        checkItem(element);

    }

    console.log(JSON.stringify(EntierList));

})


function setLocalStorage(list){
    localStorage.setItem("taskList", JSON.stringify(list));
}

function getLocalStorage(){

  return JSON.parse(localStorage.getItem("taskList"));

}

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

   function refresh(){
       localStorage.clear();
       location.reload();
   }

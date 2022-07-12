//Loading Trainers
var retrievedTrainersObject = localStorage.getItem("localTrainersArray");
var retrievedTrainersArray = JSON.parse(retrievedTrainersObject);

//Loading Courses
var retrievedCoursesObject =localStorage.getItem("localCoursesArray");
var retrievedCoursesArray = JSON.parse(retrievedCoursesObject);



var indexTrainers ;
var indexCourses;

//FUNCTIONS ABOUT Trainers
//This is the function used to print the stored values names of the trainers array
function editTrainer(){
    // <label for = "trainer"> Choose one trainer : </label>

    let printTrainers = `
    <select name = "trainers" id="editFormTrainers" onChange="updateTrainers() ">
    <option value="none" selected disabled hidden>Select a Trainer</option>`;
    for(let i=0 ;i<retrievedTrainersArray.length;i++){
        printTrainers +=`<option>${retrievedTrainersArray[i].firstNameTrainer} ${retrievedTrainersArray[i].lastNameTrainer} </option>`;
    }

    printTrainers += `</select>`;
    document.getElementById("trainerList").innerHTML= printTrainers ;
}
editTrainer();


//This is the function used to select the object that we want to edit
//We select this object based on the values of the trainer name 
//We return the index that this object has in the array
//It also prints the properties of the selected object
function updateTrainers(){

let select = document.getElementById("editFormTrainers");

var giveMeTheElementT;
let option =select.options[select.selectedIndex].text;
for(let i=0 ; i<retrievedTrainersArray.length ; i++){
    
    giveMeTheElementT = retrievedTrainersArray[i]
    if(option ==`${giveMeTheElementT.firstNameTrainer} ${giveMeTheElementT.lastNameTrainer}` ){
       indexTrainers = i ; 
       console.log(retrievedTrainersArray[indexTrainers].firstNameTrainer);
       console.log(retrievedTrainersArray[indexTrainers].lastNameTrainer);
       console.log(retrievedTrainersArray[indexTrainers].trainersSubjects);
document.getElementById("printFirstNameTrainer").value = retrievedTrainersArray[indexTrainers].firstNameTrainer;
document.getElementById("printLastNameTrainer").value= retrievedTrainersArray[indexTrainers].lastNameTrainer;
document.getElementById("printTrainerSubjects").value= retrievedTrainersArray[indexTrainers].trainersSubjects;


    
    return indexTrainers ;
}
}
}







//This is the function that we use to resubmit the values 
//from the form, to the object that we have chosen to edit
function submitEdditedTrainer(){

//Check if the inputs are null
var interimFirstNameTrainer = document.getElementById("fnameTrainer").value;

var interimLastNameTrainer = document.getElementById("lnameTrainer").value;

var interimTrainerSubject= document.getElementById("subjectsSelection").value;

if(interimFirstNameTrainer =="" || interimLastNameTrainer =="" || interimTrainerSubject=="none")
{
    alert("You cannot have empty fields!");
    location.reload();
}
else{

    var k = 0 
    var l = 0;
    if(retrievedCoursesArray == undefined)
    {
        alert("Please add a course first");
        location.reload();
    }
    else{
        scanTheCourses(k,l);
    
    retrievedTrainersArray[indexTrainers].firstNameTrainer = document.getElementById("fnameTrainer").value;
    retrievedTrainersArray[indexTrainers].lastNameTrainer = document.getElementById("lnameTrainer").value;
    retrievedTrainersArray[indexTrainers].trainersSubjects = document.getElementById("subjectsSelection").value;
    event.preventDefault();
    saveTrainerArray(retrievedTrainersArray,retrievedCoursesArray);
    }

    
}
    function scanTheCourses(k,l){
        try{
            
            console.log("Hello from try");
            
            console.log("K is "+ k);
            console.log("l is "+ l);
            let findTheTrainer=retrievedCoursesArray[k].trainerPerCourse[l];
            let findTheTrainerLastEl=retrievedCoursesArray[k].trainerPerCourse[l+1];
            console.log(`${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}` );
            console.log(`${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`);
            console.log(`${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`== `${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}`);
            console.log(`${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`||`${findTheTrainerLastEl.firstNameTrainer} ${findTheTrainerLastEl.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`);
            if(`${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`||`${findTheTrainerLastEl.firstNameTrainer} ${findTheTrainerLastEl.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`)
            {   console.log("I am in the first if");
            
            if(`${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}`==`${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`)
                   {console.log("I am in the second if");
                   retrievedCoursesArray[k].trainerPerCourse[l].firstNameTrainer = document.getElementById("fnameTrainer").value;
                   retrievedCoursesArray[k].trainerPerCourse[l].lastNameTrainer = document.getElementById("lnameTrainer").value;
                   retrievedCoursesArray[k].trainerPerCourse[l].trainersSubjects = document.getElementById("subjectsSelection").value;
                   console.log(retrievedCoursesArray[k].trainerPerCourse);
   
                   //We increment k because each trainer can only be once in each course
                   l=0;
                   scanTheCourses(k+1,l);
               
                   }
                   if(`${findTheTrainerLastEl.firstNameTrainer} ${findTheTrainerLastEl.lastNameTrainer}`==`${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`)
                   {console.log("I am in the third if");


                   retrievedCoursesArray[k].trainerPerCourse[l+1].firstNameTrainer = document.getElementById("fnameTrainer").value;
                   retrievedCoursesArray[k].trainerPerCourse[l+1].lastNameTrainer = document.getElementById("lnameTrainer").value;
                   retrievedCoursesArray[k].trainerPerCourse[l+1].trainersSubjects = document.getElementById("subjectsSelection").value;

                  
                   console.log(retrievedCoursesArray[k].trainerPerCourse);
                   
                   l=0;
                   scanTheCourses(k+1,l);
                   }
                   
               }
               else{
                   console.log("Hello from first else");
                   l=l+1;
                   console.log("K is "+ k);
                   console.log("l is "+ l);
                    
                    console.log(l);
                    console.log( retrievedCoursesArray[k].trainerPerCourse.length - 1);
                   if(l== retrievedCoursesArray[k].trainerPerCourse.length - 1 )
                   {   k=k+1;
                       console.log("Testing if we have arrived at the end of the trainerPerCourse in this course");
                       if(retrievedCoursesArray[k]==undefined)
                       {
                           console.log("I am in the first if of else");
                        //   return retrievedCoursesArray;
                          
                           // console.log(retrievedArray);
                           // console.log(filtered);
                           
       
                       }
                       else{
                           //we reset the trainerPerCOurseArray counter
                           //so that when we jump to the next course in the coursesArray
                           //we start searching the studentPerCourse array of this course from index 0
                           
                           l=0;
                           scanTheCourses(k,l);
   
                       }
                   }
                       else{
                           
   
                           if(retrievedCoursesArray[k]==undefined)
                           {
                               console.log("I am in the first if of else");
                               
                            //   return retrievedCoursesArray;
                               // console.log(retrievedArray);
                               // console.log(filtered);
                               
           
                           }
                           
                          
                           else{ 
                               scanTheCourses(k,l);
                           }
                          
       
                       }
               }
           }
            
       catch{
           console.log("Hello from catch");
           console.log(k);
           console.log(retrievedCoursesArray[k]==undefined);
           if(retrievedCoursesArray[k]==undefined)
         {
             console.log("Am I in the end game");
           alert("The trainer is safe to be edited now ");
          
                           // console.log(retrievedArray);
                           // console.log(filtered);
                       return retrievedCoursesArray;
                       }
                       else{
                           console.log("");
                           l=0;
                           console.log(k);
                           scanTheCourses(k+1,l);
                       
                       
                   }
               }
            }    

//Save the eddited values in the trainers array


    

}

function deleteTrainer(){
    var k = 0 
    var l = 0;

    if(retrievedCoursesArray == undefined)
    {
        alert("You need to add a course first!");
        location.reload;
    }
    else{
        scanTheCourses(k,l);
        let filtered = retrievedTrainersArray.filter(function (nonZeroElements) { return nonZeroElements != null;});
        retrievedTrainersArray = filtered;
    saveTrainerArray(retrievedTrainersArray,retrievedCoursesArray);
    }
    

    function scanTheCourses(k,l){
        try{
            
            console.log("Hello from try");
            
            console.log("K is "+ k);
            console.log("l is "+ l);
            let findTheTrainer=retrievedCoursesArray[k].trainerPerCourse[l];
            let findTheTrainerLastEl=retrievedCoursesArray[k].trainerPerCourse[l+1];
            console.log(`${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}` );
            console.log(`${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`);
            console.log(`${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`== `${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}`);
            console.log(`${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`||`${findTheTrainerLastEl.firstNameTrainer} ${findTheTrainerLastEl.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`);
            if(`${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`||`${findTheTrainerLastEl.firstNameTrainer} ${findTheTrainerLastEl.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`)
            {   console.log("I am in the first if");
            
            if(`${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}`==`${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`)
            {console.log("I am in the second if");
            retrievedCoursesArray[k].trainerPerCourse.splice(l,1);
            let filteredArray = retrievedCoursesArray[k].trainerPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
                retrievedCoursesArray[k].trainerPerCourse = filteredArray;
            console.log(retrievedCoursesArray[k].trainerPerCourse);
            
            //We increment k because each trainer can only be once in each course
            l=0;
            scanTheCourses(k+1,l);
        }
        if(`${findTheTrainerLastEl.firstNameTrainer} ${findTheTrainerLastEl.lastNameTrainer}`==`${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`)
        {console.log("I am in the third if");
        retrievedCoursesArray[k].trainerPerCourse.splice(l+1,1);
        console.log(retrievedCoursesArray[k].trainerPerCourse);
        let filteredArray = retrievedCoursesArray[k].trainerPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
                retrievedCoursesArray[k].trainerPerCourse = filteredArray;
        l=0;
        scanTheCourses(k+1,l);
    }
    
}
else{
    console.log("Hello from first else");
    l=l+1;
    console.log("K is "+ k);
    console.log("l is "+ l);
    
    console.log(l);
    console.log( retrievedCoursesArray[k].trainerPerCourse.length - 1);
    if(l== retrievedCoursesArray[k].trainerPerCourse.length - 1 )
                   {   k=k+1;
                    console.log("Testing if we have arrived at the end of the trainerPerCourse in this course");
                    if(retrievedCoursesArray[k]==undefined)
                    {
                        console.log("I am in the first if of else");
                        return retrievedCoursesArray;
                        
                        // console.log(retrievedArray);
                        // console.log(filtered);
                        
                        
                    }
                    else{
                        //we reset the trainerPerCOurseArray counter
                        //so that when we jump to the next course in the coursesArray
                        //we start searching the studentPerCourse array of this course from index 0
                        
                        l=0;
                        scanTheCourses(k,l);
                        
                    }
                }
                else{
                    
                    
                    if(retrievedCoursesArray[k]==undefined)
                    {
                        console.log("I am in the first if of else");
                        
                        return retrievedCoursesArray;
                        // console.log(retrievedArray);
                        // console.log(filtered);
                        
                        
                    }
                    
                    
                    else{ 
                        scanTheCourses(k,l);
                    }
                    
                    
                }
            }
        }
        
        catch{
            console.log("Hello from catch");
            console.log(k);
            console.log(retrievedCoursesArray[k]==undefined);
            if(retrievedCoursesArray[k]==undefined)
            {
                console.log("Am I in the end game");
                alert("The trainer is safe to be deleted now ");
                
                // console.log(retrievedArray);
                // console.log(filtered);
                return retrievedCoursesArray;
            }
            else{
                console.log("");
                l=0;
                console.log(k);
                scanTheCourses(k+1,l);
                
                
            }
        }
    }    
    
   
}

function saveTrainerArray(retrievedTrainersArray,retrievedCoursesArray){
    localStorage.setItem("localCoursesArray",JSON.stringify(retrievedCoursesArray));
    localStorage.setItem("localTrainersArray",JSON.stringify(retrievedTrainersArray));
    alert("The database was updated!");
    location.reload();
}
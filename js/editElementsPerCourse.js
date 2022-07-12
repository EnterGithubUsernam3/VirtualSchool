//First of all we are loading the arrays are stored at the local memory

//Loading Courses
var retrievedCoursesObject = localStorage.getItem("localCoursesArray");
var retrievedCoursesArray = JSON.parse(retrievedCoursesObject);


//Loading Students
var retrievedObject =localStorage.getItem("localStudentsArray");
var retrievedArray = JSON.parse(retrievedObject);

//Loading Trainers
var retrievedTrainersObject = localStorage.getItem("localTrainersArray");
var retrievedTrainersArray = JSON.parse(retrievedTrainersObject);

//Loading Assignments
var retrievedAssObject = localStorage.getItem("localAssignmentArray");
var retrievedAssArray = JSON.parse(retrievedAssObject);



//Indecess to load specific items
var indexAssi ;
var index ;
var indexCourses ;
var indexTrainers ;



//FUNCTIONS ABOUT COURSES
//This is the function used to print the stored values names of the courses array
function editCourses(){
        
    try{
    let printCourses = `<label for = "courses"> Choose one course : </label>
    <select name = "courses" id="editFormCourses" onChange="updateCourses()">
    <option value="none" selected disabled hidden>Select a Course</option>`;
    for(let i=0 ;i<retrievedCoursesArray.length;i++){
        printCourses +=`<option>${retrievedCoursesArray[i].title}</option>`;
    }
    printCourses += `</select>`;
    document.getElementById("selectorEle").innerHTML= printCourses ;
}
catch{
    alert("You have not entered any courses yet.Please add some courses in the database");
}
}


function updateCourses(){
    
    let select = document.getElementById("editFormCourses");
    
    var giveMeTheElementCourses;
    let option =select.options[select.selectedIndex].text;
    for(let i=0 ; i<retrievedCoursesArray.length ; i++){
        
        giveMeTheElementCourses = retrievedCoursesArray[i]
        if(option ==`${giveMeTheElementCourses.title}`){
            indexCourses = i ; 
            
            
            
            return indexCourses ;
        }
        
        
    }
}


function edit(){
    
    
    let printStudents = `<label for = "students"> Choose one student : </label>
    <select name = "students" id="editFormStudents" onChange="update() ">
    <option value="none" selected disabled hidden>Select a Student</option>`;
    for(let i=0 ;i<retrievedArray.length;i++){
        printStudents +=`<option>${retrievedArray[i].firstName} ${retrievedArray[i].lastName} </option>`;
    }
    
    printStudents += `</select>`;
    document.getElementById("selectorEle").innerHTML += `<div id="seperator"> ${printStudents} </div> `
}


function editAssi(){
    let printAssignments = `<label for = "assignments"> Choose one assignment : </label>
    <select name = "assignments" id="editFormAssignments" onChange="updateAssi() ">
    <option value="none" selected disabled hidden>Select an Assignment</option>`;
    for(let i=0 ;i<retrievedAssArray.length;i++){
        printAssignments +=`<option>${retrievedAssArray[i].titleAssignment}  </option>`;
    }
    
    printAssignments += `</select>`;
    document.getElementById("selectorEle").innerHTML += `<div id="seperator"> ${printAssignments} </div> `;
}

function update(){
    
    let select = document.getElementById("editFormStudents");
    
    var giveMeTheElement;
    let option =select.options[select.selectedIndex].text;
    for(let i=0 ; i<retrievedArray.length ; i++){
        
        giveMeTheElement = retrievedArray[i]
        if(option ==`${giveMeTheElement.firstName} ${giveMeTheElement.lastName}` ){
            index = i ; 
            
            
            
            return index ;
        }
        
        
    }
    
}

function updateAssi(){
    
    let select = document.getElementById("editFormAssignments");
    
    var giveMeTheElementAssi;
    let option =select.options[select.selectedIndex].text;
    for(let i=0 ; i<retrievedAssArray.length ; i++){
        
        giveMeTheElementAssi = retrievedAssArray[i]
        if(option ==`${giveMeTheElementAssi.titleAssignment}` ){
            indexAssi = i ; 
            
            
            
            return indexAssi ;
        }
        
    }
}

function editTrainer(){
    
    
    let printTrainers = `<label for = "trainer"> Choose one trainer : </label>
    <select name = "trainers" id="editFormTrainers" onChange="updateTrainers() ">
    <option value="none" selected disabled hidden>Select a Trainer</option>`;
    for(let i=0 ;i<retrievedTrainersArray.length;i++){
        printTrainers +=`<option>${retrievedTrainersArray[i].firstNameTrainer} ${retrievedTrainersArray[i].lastNameTrainer} </option>`;
    }
    
    printTrainers += `</select>`;
    
    document.getElementById("selectorEle").innerHTML += `<div id="seperator"> ${printTrainers} </div> `
}



function updateTrainers(){
    
    let select = document.getElementById("editFormTrainers");
    
    var giveMeTheElementT;
    let option =select.options[select.selectedIndex].text;
    for(let i=0 ; i<retrievedTrainersArray.length ; i++){
        
        giveMeTheElementT = retrievedTrainersArray[i]
        if(option ==`${giveMeTheElementT.firstNameTrainer} ${giveMeTheElementT.lastNameTrainer}` ){
            indexTrainers = i ; 
            
            
            
            
            return indexTrainers ;
        }
    }
}



function printInfoAboutCourse(){

    let printElement=`<table id="tableOfInformation"> <tr> <th>Course Title </th> <th>Course source</th> <th>Course type</th>  <th>Start date</th> <th>End date</th> <th>Students per course </th> <th> Trainers per course </th> <th>Assignment per course </th>  </tr>`;
        for(let i in retrievedCoursesArray)
        {   let j=k=l=0;
            let stPerCourse=`<select size=4 id="studentsPerCourse">` ;
            let trPerCourse=`<select size=4 >` ;
            let assiPerCourse =`<select size=4 ">` ;
            if(retrievedCoursesArray[i].studentPerCourse[j] == undefined)
            {   
                stPerCourse = "empty";
            }
            else{
                for(j in retrievedCoursesArray[i].studentPerCourse)
                {
                    stPerCourse+=`<option>${retrievedCoursesArray[i].studentPerCourse[j].firstName} ${retrievedCoursesArray[i].studentPerCourse[j].lastName} </option>`
                }
                stPerCourse+=`</select>`
               
            }
            if(retrievedCoursesArray[i].trainerPerCourse[k] == undefined)
            {
                 trPerCourse = "empty";
            }
            
            else{
                for(j in retrievedCoursesArray[i].trainerPerCourse)
                {
                    trPerCourse+=`<option>${retrievedCoursesArray[i].trainerPerCourse[j].firstNameTrainer} ${retrievedCoursesArray[i].trainerPerCourse[j].lastNameTrainer} </option>`
                }
                trPerCourse+=`</select>`
    
            }
    
    
            if(retrievedCoursesArray[i].assignmentPerCourse[k] == undefined)
            {
                assiPerCourse = "empty";
            }
    
    
            else{
                for(j in retrievedCoursesArray[i].assignmentPerCourse)
                {
                    assiPerCourse+=`<option>${retrievedCoursesArray[i].assignmentPerCourse[j].titleAssignment}</option>`
                }
                trPerCourse+=`</select>`
    
            }
            printElement+=`<tr> <td>${retrievedCoursesArray[i].title} </td> <td>${retrievedCoursesArray[i].source} </td> <td>${retrievedCoursesArray[i].type} </td> <td>${retrievedCoursesArray[i].startingDate} </td> <td>${retrievedCoursesArray[i].endDate} </td> <td>${stPerCourse}</td> <td>${trPerCourse} </td> <td>${assiPerCourse} </td>
            
            </tr>` 
        }
        printElement+=`</table>`;
        document.getElementById("printInfo").innerHTML=printElement;
      
    }


function removeStudentPerCourse(){
    
    let k = 0 ;
    scanTheArrayStudents(k);

    function scanTheArrayStudents(k)
    {console.log("I am in the scanTheArray");
    try{
        
            let findTheStudent=retrievedCoursesArray[indexCourses].studentPerCourse[k];
            let findTheStudentLastEl=retrievedCoursesArray[indexCourses].studentPerCourse[k+1];
        if(`${findTheStudent.firstName} ${findTheStudent.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`)
        {   
            retrievedCoursesArray[indexCourses].studentPerCourse.splice(k,1);
            let filteredArray = retrievedCoursesArray[indexCourses].studentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
    
            retrievedCoursesArray[indexCourses].studentPerCourse = filteredArray;
            alert("The student was removed from the course");

        }
        else if(`${findTheStudentLastEl.firstName} ${findTheStudentLastEl.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`)
        {

            retrievedCoursesArray[indexCourses].studentPerCourse.splice(k+1,1);
            let filteredArray = retrievedCoursesArray[indexCourses].studentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
        
            retrievedCoursesArray[indexCourses].studentPerCourse = filteredArray;
            alert("The student was removed from the course");
        }
        else{
            let l=k+1;
            console.log(l);
            
            if(l==retrievedCoursesArray[indexCourses].studentPerCourse.length - 1 ){
                
                
                alert("This student is not in the course ");
            }
            else{
                
            scanTheArrayStudents(l);

        }
        }
    }
    catch{
        alert("This student is not in the course");
    }
}
}


function removeTrainerPerCourse(){
    let k = 0 ;
    
    
    scanTheArray(k);

   
    function scanTheArray(k)
    {let findTheTrainer=retrievedCoursesArray[indexCourses].trainerPerCourse[k];
    {let findTheTrainerLastEl=retrievedCoursesArray[indexCourses].trainerPerCourse[k+1];

       
        
        console.log("I am in the scanTheArray");
        try{
            
        if(`${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`)
        {   
            retrievedCoursesArray[indexCourses].trainerPerCourse.splice(k,1);
            let filteredArray = retrievedCoursesArray[indexCourses].trainerPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
    
            retrievedCoursesArray[indexCourses].trainerPerCourse = filteredArray;
            alert("The trainer was removed from the course");
        }
        else if(`${findTheTrainerLastEl.firstNameTrainer} ${findTheTrainerLastEl.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`)
        {
            retrievedCoursesArray[indexCourses].trainerPerCourse.splice(k+1,1);
            let filteredArray = retrievedCoursesArray[indexCourses].trainerPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
    
            retrievedCoursesArray[indexCourses].trainerPerCourse = filteredArray;
            alert("The trainer was removed from the course");
        }
        else{
            let l=k+1;
            console.log(l);
            console.log("I am in the else ");
            if(l==retrievedCoursesArray[indexCourses].trainerPerCourse.length - 1  ){
               alert("This trainer is not in the course");

                           }
            else{
                console.log("I am in the else else ");
            scanTheArray(l);

        }
        }
    }
    catch{
        alert("This trainer is not in the course");
    }
}
}
}



function removeAssignmentsPerCourse(){
    let k = 0 ;
    scanTheArrayAssi(k);

    function scanTheArrayAssi(k)
    {let findTheAssignment=retrievedCoursesArray[indexCourses].assignmentPerCourse[k];
        let findTheAssignmentLastEl=retrievedCoursesArray[indexCourses].assignmentPerCourse[k+1];
        console.log("I am in the scanTheArray");
        try{
        if(`${findTheAssignment.titleAssignment} ${findTheAssignment.descriptionAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment} ${retrievedAssArray[indexAssi].descriptionAssignment}`)
        {   
            retrievedCoursesArray[indexCourses].assignmentPerCourse.splice(k,1);
            let filteredArray = retrievedCoursesArray[indexCourses].assignmentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
    
            retrievedCoursesArray[indexCourses].assignmentPerCourse = filteredArray;
            alert("The assignment was removed from the course");
        }

        else if (`${findTheAssignmentLastEl.titleAssignment} ${findTheAssignmentLastEl.descriptionAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment} ${retrievedAssArray[indexAssi].descriptionAssignment}`)
        {
            
            retrievedCoursesArray[indexCourses].assignmentPerCourse.splice(k+1,1);
            let filteredArray = retrievedCoursesArray[indexCourses].assignmentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
    
            retrievedCoursesArray[indexCourses].assignmentPerCourse = filteredArray;
            alert("The assignment was removed from the course");
        }

        else{
            let l=k+1;
            console.log(l);
            console.log("I am in the else ");
            
            if(l==retrievedCoursesArray[indexCourses].assignmentPerCourse.length - 1 ){
             alert("The assignment is not in the course");
            }
            else{
                console.log("I am in the else else ");
            scanTheArrayAssi(l);

        }
        }
    }
    catch{
        
    alert("The assignment is not in the course");
    }
}
}
function saveTheCourses(retrievedCoursesArray)
{
    localStorage.setItem("localCoursesArray",JSON.stringify(retrievedCoursesArray));
    location.reload();
}
function compositeFunction()
{
    removeStudentPerCourse();
    removeTrainerPerCourse();
    removeAssignmentsPerCourse();
    saveTheCourses(retrievedCoursesArray);
}


printInfoAboutCourse();
editCourses();
edit();
editTrainer();
editAssi();
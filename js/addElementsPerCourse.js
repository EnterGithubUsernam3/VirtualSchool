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
var indexComplex;
var studentsPerCourse;
var trainersPerCourse;
var assignmentsPerCourse;




//The functions that provide the lists

function editCourses(){
        

    let printCourses = `<label for = "courses"> Choose one course : </label>
    <select name = "courses" id="editFormCourses" onChange="updateCourses()">
    <option value="none" selected disabled hidden>Select a Course</option>`;
    try{
    for(let i=0 ;i<retrievedCoursesArray.length;i++){
        printCourses +=`<option>${retrievedCoursesArray[i].title}</option>`;
    }
    printCourses += `</select>`;
    document.getElementById("coursesList").innerHTML= printCourses ;
}
catch{
    alert("You have not entered any courses yet.Please add some courses in the database");
}
}

editCourses();

function editAssi(){
        
try{


    let printAssignments = `<label for = "assignments"> Choose one assignment : </label>
    <select name = "assignments" id="editFormAssignments" onChange="updateAssi() ">
    <option value="none" selected disabled hidden>Select an Assignment</option>`;
    for(let i=0 ;i<retrievedAssArray.length;i++){
        printAssignments +=`<option>${retrievedAssArray[i].titleAssignment}  </option>`;
    }

    printAssignments += `</select>`;
    document.getElementById("assignmentsList").innerHTML= printAssignments ;
}
catch{
    alert("You haven't entered any assignments yet. Please add some assignments in the database");
}
}
editAssi();

function edit(){
        
try{


    let printStudents = `<label for = "students"> Choose one student : </label>
    <select name = "students" id="editFormStudents" onChange="update() ">
    <option value="none" selected disabled hidden>Select a Student</option>`;
    for(let i=0 ;i<retrievedArray.length;i++){
        printStudents +=`<option>${retrievedArray[i].firstName} ${retrievedArray[i].lastName} </option>`;
    }

    printStudents += `</select>`;
    document.getElementById("studentsList").innerHTML= printStudents ;
}
catch{
    alert("You haven't entered any students in the database yet.Please add some students first!");
}
}
edit();
function editTrainer(){
        
try{

    var printTrainers = `<label for = "trainer"> Choose one trainer : </label>
    <select name = "trainers" id="editFormTrainers" onChange="updateTrainers() ">
    <option value="none" selected disabled hidden>Select a Trainer</option>`;
    for(let i=0 ;i<retrievedTrainersArray.length;i++){
        printTrainers +=`<option>${retrievedTrainersArray[i].firstNameTrainer} ${retrievedTrainersArray[i].lastNameTrainer} </option>`;
}
}
catch{
    alert("You haven't entered any trainers yet.Please add some trainers in the database");
}


    printTrainers += `</select>`;
    document.getElementById("trainersList").innerHTML= printTrainers ;
}
editTrainer();

//The functions that load the index of the specific object in the array

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

//Bellow are the functions that create the composite courses objects

//We have 3 functions that push each object(assignment,trainer,student) to the correct arrays in the courses object
//We also have a 4th function that performs the other 3 functions altogether
//assignment per course array 
//student per course array
//trainer per course array
function pushStudentsPerCourse(){
      
        //Validation that the student that we want to enter 
        //at the studentPerCourse array, is not in the array already



        let k = 0 ;
        scanTheArrayStudents(k);

        //This is a recursive function with the intent of 
        //scaning the array that is saved at the property
        //studentPerCourse
        //If the element is encountered then we notify the user 
        //If it is not then we add the element

        //We will need to add a try catch because in the case that the studentPerCourse array is empty an error occurs.
        function scanTheArrayStudents(k)
        {console.log("I am in the scanTheArray");
        try{
            
                let findTheStudent=retrievedCoursesArray[indexCourses].studentPerCourse[k];
                let findTheStudentLastEl=retrievedCoursesArray[indexCourses].studentPerCourse[k+1];
            if(`${findTheStudent.firstName} ${findTheStudent.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`||`${findTheStudentLastEl.firstName} ${findTheStudentLastEl.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`)
            {   
                alert("The student is already in the course");
            }
            else{
                let l=k+1;
                console.log(l);
                
                if(l==retrievedCoursesArray[indexCourses].studentPerCourse.length - 1 ){
                    retrievedCoursesArray[indexCourses].studentPerCourse.push(retrievedArray[index]);
                    

                    //These lines of code exist to filteroutAny null elements that are trying to pass by
                    // var filtered = retrievedCoursesArray[indexCourses].studentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
                    // retrievedCoursesArray[indexCourses].studentPerCourse = filtered;
                    alert("Student added to the course");
                }
                else{
                    
                scanTheArrayStudents(l);

            }
            }
        }
        catch{
          
            updateCourses();
            console.log(indexCourses);
            retrievedCoursesArray[indexCourses].studentPerCourse.push
        (retrievedArray[index]);
        alert("Student added to the course");
        }
    }
    }

function pushTrainersPerCourse(){
    let k = 0 ;
    
    
    scanTheArray(k);

    //This is a recursive function with the intent of 
    //scaning the array that is saved at the property
    //trainerPerCourse
    //If the element is encountered then we notify the user 
    //If it is not then we add the element

    //We will need to add a try catch because in the case that the trainerPerCourse array is empty an error occurs.
    function scanTheArray(k)
    {let findTheTrainer=retrievedCoursesArray[indexCourses].trainerPerCourse[k];
    {let findTheTrainerLastEl=retrievedCoursesArray[indexCourses].trainerPerCourse[k+1];
        console.log(k);
       
        
        console.log("I am in the scanTheArray");
        try{
            
        if(`${findTheTrainer.firstNameTrainer} ${findTheTrainer.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`||`${findTheTrainerLastEl.firstNameTrainer} ${findTheTrainerLastEl.lastNameTrainer}`== `${retrievedTrainersArray[indexTrainers].firstNameTrainer} ${retrievedTrainersArray[indexTrainers].lastNameTrainer}`)
        {   
            alert("The trainer is already in the course");
        }
        else{
            let l=k+1;
            console.log(l);
            console.log("I am in the else ");
            if(l==retrievedCoursesArray[indexCourses].trainerPerCourse.length - 1  ){
                retrievedCoursesArray[indexCourses].trainerPerCourse.push(retrievedTrainersArray[indexTrainers]);

                
                console.log("I am in the else if ");
                alert("Trainer added to the course");
            }
            else{
                console.log("I am in the else else ");
            scanTheArray(l);

        }
        }
    }
    catch{
        
        retrievedCoursesArray[indexCourses].trainerPerCourse.push
    (retrievedTrainersArray[indexTrainers]);
    alert("Trainer added to the course");
    }
}
}
}


function pushAssignmentsPerCourse(){
    let k = 0 ;
    scanTheArrayAssi(k);

    //This is a recursive function with the intent of 
    //scaning the array that is saved at the property
    //assignmentPerCourse
    //If the element is encountered then we notify the user 
    //If it is not then we add the element

    //We will need to add a try catch because in the case that the assignmentPerCourse array is empty an error occurs.
    function scanTheArrayAssi(k)
    {let findTheAssignment=retrievedCoursesArray[indexCourses].assignmentPerCourse[k];
        let findTheAssignmentLastEl=retrievedCoursesArray[indexCourses].assignmentPerCourse[k+1];
        console.log("I am in the scanTheArray");
        try{
        if(`${findTheAssignment.titleAssignment} ${findTheAssignment.descriptionAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment} ${retrievedAssArray[indexAssi].descriptionAssignment}`||`${findTheAssignmentLastEl.titleAssignment} ${findTheAssignmentLastEl.descriptionAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment} ${retrievedAssArray[indexAssi].descriptionAssignment}`)
        {   
            alert("The assignment is already in the course");
           
        }
        else{
            let l=k+1;
            console.log(l);
            console.log("I am in the else ");
            
            if(l==retrievedCoursesArray[indexCourses].assignmentPerCourse.length - 1 ){
                console.log(retrievedCoursesArray[indexCourses].assignmentPerCourse.length -1);
                retrievedCoursesArray[indexCourses].assignmentPerCourse.push(retrievedAssArray[indexAssi]);
                console.log("I am in the else if ");
                alert("Assignment added to the course");
            }
            else{
                console.log("I am in the else else ");
            scanTheArrayAssi(l);

        }
        }
    }
    catch{
        retrievedCoursesArray[indexCourses].assignmentPerCourse.push
    (retrievedAssArray[indexAssi]);
    alert("Assignement added to the course");
    }
}
}

function createCompositeCourse(){
    
    pushStudentsPerCourse();
    pushTrainersPerCourse();
    pushAssignmentsPerCourse();
    saveCourseArray(retrievedCoursesArray);
// }
}







//Save the changes that were made to the courses objects in the local memomry
function saveCourseArray(retrievedCoursesArray){
    //Filter the studentPercourses,trainerPercourses and assignementPercourses array
    //This happens so that when one of the  pushStudentsPerCourse();
   // pushTrainersPerCourse()
    //pushAssignmentsPerCourse(), functions encounter an element that 
    //you can already find in the StudentPerCourse,trainerPerCourses and assignementPercourses arrays.
    //In those cases they push a null object in the arrays which messes up with our database
    let filteredStudents=retrievedCoursesArray[indexCourses].studentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null
    } );


    retrievedCoursesArray[indexCourses].studentPerCourse= filteredStudents
    
    ;
    let filteredTrainers=retrievedCoursesArray[indexCourses].trainerPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});

    retrievedCoursesArray[indexCourses].trainerPerCourse = filteredTrainers;
    let filteredAssignments = retrievedCoursesArray[indexCourses].assignmentPerCourse.filter(function (nonZeroElements){
        return nonZeroElements != null;
    
    });
    retrievedCoursesArray[indexCourses].assignmentPerCourse = filteredAssignments;

  console.log(retrievedCoursesArray); 
    
    localStorage.setItem("localCoursesArray",JSON.stringify(retrievedCoursesArray));
    alert("The database was updated!");
    location.reload();
}

//The function that prints the table with the information 

//I had to create two tables in order for me to print all the available information
//The first table contains all the information about each course 
//as well as studentpercourse , assignmentpercourse and trainerspercourse
//The second one contains the information about assignments per student
function printInfoAboutCourse(){
let assiPerStudent= `<table id="tableComplex"> <tr> <th>Student name </th> `
for(i in retrievedArray)
{
    assiPerStudent+=` <td> ${retrievedArray[i].firstName} ${retrievedArray[i].lastName} </td>`
}
assiPerStudent+=`</tr> <tr><th> Assignments per student </th>`;
for (i in retrievedArray)
{
    if (retrievedArray[i].assignmentPerStudent[0] == undefined )
    {
        assiPerStudent+=`<td> empty </td>`;
    }
    else
    {   
        assiPerStudent+=`<td> <ul>`
        for(j in retrievedArray[i].assignmentPerStudent)
        {   
            assiPerStudent+=`<li> ${retrievedArray[i].assignmentPerStudent[j].titleAssignment} </li>`;

        }
        assiPerStudent+=`</ul> </td>`;
    }
}
assiPerStudent+=`</tr></table>`;
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
    document.getElementById("printTheElements").innerHTML=printElement;
  
    document.getElementById("printAssiPerStudent").innerHTML=assiPerStudent;
}
printInfoAboutCourse();


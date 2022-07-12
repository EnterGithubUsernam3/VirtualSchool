//Navigation Functions
function openAboutUs(){
window.open("aboutus.html","_self");
}

function openHomePage(){
    window.open("index.html","_self");
}
function openContactUs(){
    window.open("contactus.html","_self")
}


function openAdminpage(){
    var userInput = prompt("Please enter the password for the site");
    if(userInput === "password"){
        window.open("admin.html","_self")
    }
    else{
        alert("The password that you have entered is incorrect");
    }
}



//Creating the student objects and saving them in an array
var arrayOfStudents = [];


//This is the function that submits the new Student object in the array
function submitStudent() {
    function Student (firstName,lastName,dateOfBirth,tuitions){
        this.firstName = firstName ;
        this.lastName = lastName ;
        this.dateOfBirth = dateOfBirth ;
        this.tuitions = tuitions;
        this.assignmentPerStudent = [];
    }

    const newStudent = new Student (document.getElementById("fname").value,document.getElementById("lname").value,document.getElementById("dob").value,document.getElementById("tuit").value); 
    try{        //validation that we do not push empty elements
                if(newStudent.firstName==""||newStudent.lastName==""||newStudent.dateOfBirth==""||newStudent.tuitions==""){
                    alert("You cannot have empty fields");
                    location.reload();
                }
                //To try βρίσκεται για να πίασει το error όταν 
                //εισάγουμε τον πρώτο student και το localStudentsArray είναι empty
                else{
                    //φορτώνουμε το localStudentsArray
                    var retrievedObject =localStorage.getItem("localStudentsArray");
                    arrayOfStudents = JSON.parse(retrievedObject);
                    arrayOfStudents.push(newStudent);
                    event.preventDefault();
                    alert("Please push the save button,right after you press submit, to save the changes at the local database");
                   
                }
                }
    catch{
        if(newStudent.firstName==""||newStudent.lastName==""||newStudent.dateOfBirth==""||newStudent.tuitions==""){
            alert("You cannot have empty fields");
            location.reload();
        }
        else{arrayOfStudents=[];
            arrayOfStudents.push(newStudent);
            event.preventDefault();  
            alert("Please push the save button,right after you press submit, to save the changes at the local database");
              }
        
    }
    
    console.log(newStudent.firstName,newStudent.lastName,newStudent.dateOfBirth,newStudent.tuitions);//For debuging purposes   
    console.log(arrayOfStudents);
    // saveStudentArray(arrayOfStudents);
}
//This is the function used to save this array in local storage 
function saveStudentArray(arrayOfStudents){
    if(arrayOfStudents[0] === undefined)
    {
        alert("You must first submit a student in order to save one ");
        
    }
    else{
    localStorage.setItem("localStudentsArray",JSON.stringify(arrayOfStudents));
    alert("The database was updated!");
    location.reload();
    }
}

var arrayOfCourses = [] ;

//This is the function that submits the new Course object in the array
function submitCourse() {
    function Course (title,source,type,startingDate,endDate){
        this.title = title ;
        this.source = source ;
        this.type = type ;
        this.startingDate = startingDate;
        this.endDate = endDate;
        this.studentPerCourse=[];
        this.trainerPerCourse=[];
        this.assignmentPerCourse=[];
    }
    console.log("I am in courses");
    const newCourse = new Course (document.getElementById("cTitle").value,document.getElementById("cSource").value,document.getElementById("cType").value,document.getElementById("cStartDate").value,document.getElementById("cEndDate").value); 
    
    //Validation that the start date is not after the end date 
    //Since this is a 3 months course we need to tanke this into account as well 
    let checkStartDate = new Date(newCourse.startingDate);
    let checkEndDate = new Date(newCourse.endDate);

    if(checkStartDate.getFullYear()>checkEndDate.getFullYear())
    {
        alert("The start date cannot be after the end date");
        location.reload();
    }
    else{
            if(Math.abs(checkEndDate.getMonth()-checkStartDate.getMonth())<3 && checkStartDate.getFullYear()-checkEndDate.getFullYear() == 0  )
            {
                alert("The course is at least 3 months long");
                location.reload();
            }
            else if( Math.abs(checkEndDate.getMonth() - checkStartDate.getMonth())>9)
            {
                alert("The course is at least 3 months long");
                location.reload();
            }
            else{
                    

                   

    try{
        //Validation that empty elements will not be pushed in the array
        if(newCourse.title==""||newCourse.source==""||newCourse.type==""||newCourse.startingDate==""||newCourse.endDate=="")
        {
            alert("You cannot have empty fields");
            location.reload();
        }
        else
       {
            var retrievedCourseObject =localStorage.getItem("localCoursesArray");
            arrayOfCourses = JSON.parse(retrievedCourseObject);
            arrayOfCourses.push(newCourse);
            event.preventDefault();
            alert("Please push the save button,right after you press submit, to save the changes at the local database");
            
            }
        
    }
    
    catch{
        
        //Validation that empty elements will not be pushed in the array
        if(newCourse.title==""||newCourse.source==""||newCourse.type==""||newCourse.startingDate==""||newCourse.endDate=="")
        {
            alert("You cannot have empty fields");
            location.reload();
        }
        else{
           
        arrayOfCourses=[];
        arrayOfCourses.push(newCourse);
        event.preventDefault();
        alert("Please push the save button,right after you press submit, to save the changes at the local database");
       
        
        }
}
            }
    
    console.log(newCourse.title,newCourse.source,newCourse.type,newCourse.startingDate,newCourse.endDate);//For debuging purposes   
    console.log(arrayOfCourses);
    // event.preventDefault();
    // saveCourseArray(arrayOfCourses);
            }
}


//This is the function to save the courses array
function saveCourseArray(arrayOfCourses){
    if(arrayOfCourses[0] === undefined)
    {
        alert("You must first submit a course in order to save it !");
    }
    else{

        localStorage.setItem("localCoursesArray",JSON.stringify(arrayOfCourses));
        alert("The database was updated!");
        location.reload();
    }
}


//initializing the arrayofΤrainers 
var arrayOfTrainers = [] ;
var select= document.getElementById("subjectsSelection");
var option ;
//This is the function to update the selection element in the trainers form
//I added the try catch here because this script is used for multiple html files, that returned errors
function update(){
    
    option =select.options[select.selectedIndex].text;
    return option;
    
}
//this is the function that submits the trainer
function submitTrainer() {
    function Trainer (firstNameTrainer,lastNameTrainer,trainersSubjects){
        this.firstNameTrainer = firstNameTrainer ;
        this.lastNameTrainer = lastNameTrainer ;
        this.trainersSubjects = trainersSubjects ;
        
    }
    
    
     
    const newTrainer = new Trainer (document.getElementById("fTrainerName").value,document.getElementById("lTrainerName").value, update()); 
    try{
        //Validation that we do not push empty elements
        if(newTrainer.firstNameTrainer == ""||newTrainer.lastNameTrainer == ""||newTrainer.trainersSubjects =="Select a Subject")
        {
            alert("You cannot have empty fields");
            location.reload();
        }
        //To try βρίσκεται για να πίασει το error όταν 
        //εισάγουμε τον πρώτο trainer και το localTrainersArray είναι empty

        else{
                var retrievedTrainerObject =localStorage.getItem("localTrainersArray");
                arrayOfTrainers = JSON.parse(retrievedTrainerObject);
                arrayOfTrainers.push(newTrainer);
                event.preventDefault();        
                alert("Please push the save button,right after you press submit, to save the changes at the local database");
                
            }
        }
    catch
    {

        //Validation that we do not push empty elements
        if(newTrainer.firstNameTrainer == ""||newTrainer.lastNameTrainer == ""||newTrainer.trainersSubjects == "Select a Subject")
        {
            alert("You cannot have empty fields");
            location.reload();
        }
        else{
        arrayOfTrainers=[];
        arrayOfTrainers.push(newTrainer);
        event.preventDefault();
        alert("Please push the save button,right after you press submit, to save the changes at the local database");
            }
}
    console.log(newTrainer.firstNameTrainer,newTrainer.lastNameTrainer,newTrainer.trainersSubjects);//For debuging purposes   
    console.log(arrayOfTrainers);
    // event.preventDefault();
    // saveTrainerArray(arrayOfTrainers);
}
//This is the function used to save this trainers array in local storage 
function saveTrainerArray(arrayOfTrainers){
    if(arrayOfTrainers[0] === undefined)
    {
        alert("You must submit a trainer first in order to save him in to the database!");
    }
    else{

        localStorage.setItem("localTrainersArray",JSON.stringify(arrayOfTrainers));
        alert("The database was updated!");
        location.reload();
    }
}


//initializing arrayOfAssignments
var arrayOfAssignments = [];


//function that submits the Assignment array
function submitAssignment(){
    function Assignment(titleAssignment,descriptionAssignment,assignmentSubDate,assignmentOralMark,assignmentTotalMark){
        this.titleAssignment = titleAssignment;
        this.descriptionAssignment = descriptionAssignment;
        this.assignmentSubDate = assignmentSubDate;
        this.assignmentOralMark = assignmentOralMark;
        this.assignmentTotalMark = assignmentTotalMark;

        
    }
    
    const newAssignment = new Assignment(document.getElementById("aTitle").value,document.getElementById("aDescription").value,document.getElementById("aSubDate").value,parseInt(document.getElementById("aOralMark").value),parseInt(document.getElementById("aTotMark").value));
    
    console.log(newAssignment.assignmentTotalMark);//debugging
    console.log(newAssignment.assignmentOralMark);

    //validation that the oral mark cannot be larger than 10
    if(newAssignment.assignmentOralMark>10)
    {
        alert("The maximum grade for oral mark is 10");
        location.reload();
    }
    //validation that the total mark cannot be larger than 20
    else if(newAssignment.assignmentTotalMark>20)
    {
        alert("The maximum grade for total mark is 20");
        location.reload();
    }
    //validation that the oralMark is not larger than the totalMark 
    else if(parseInt(document.getElementById("aTotMark").value) < parseInt(document.getElementById("aOralMark").value))
    {
        alert("The oral mark cannot be larger than the total mark");
        location.reload();
    }
    try{
        //validation οτί δεν θα πάρουμε empty elements
        if(newAssignment.titleAssignment==""||newAssignment.descriptionAssignment==""||newAssignment.assignmentSubDate==""||isNaN(newAssignment.assignmentOralMark)||isNaN(newAssignment.assignmentTotalMark)){
            alert("You cannot have empty fields");
            location.reload();

        }
        else{
            var retrievedAssignmentObject =localStorage.getItem("localAssignmentArray");
            arrayOfAssignments = JSON.parse(retrievedAssignmentObject);
            arrayOfAssignments.push(newAssignment);
            // event.preventDefault();
            // alert("Please push the save button,right after you press submit, to save the changes at the local database");
            
        }
        }
        catch{

            //validation οτί δεν θα πάρουμε empty elements
                    if(newAssignment.titleAssignment==""||newAssignment.descriptionAssignment==""||newAssignment.assignmentSubDate==""||isNaN(newAssignment.assignmentOralMark)||isNaN(newAssignment.assignmentTotalMark)){
                        alert("You cannot have empty fields");
                        location.reload();

                    }
                    else{

                        arrayOfAssignments=[];
                        console.log(arrayOfAssignments);
                        arrayOfAssignments.push(newAssignment);
                        alert("Please push the save button,right after you press submit, to save the changes at the local database");
                        event.preventDefault();
                        
                    }
            
        } 
 
        // event.preventDefault();
        // saveAssignmentArray(arrayOfAssignments);
}
//The function that saves the assignments
function saveAssignmentArray(arrayOfAssignments){
    if(arrayOfAssignments[0] === undefined)
    {
        alert("You must submit an assignmet first in order to save it ! ");
    }
    else{

        localStorage.setItem("localAssignmentArray",JSON.stringify(arrayOfAssignments));
        alert("The database was updated!");
        location.reload();
    }
}
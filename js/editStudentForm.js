//First of all we are loading the arrays are stored at the local memory

//Loading Students
var retrievedObject =localStorage.getItem("localStudentsArray");
var retrievedArray = JSON.parse(retrievedObject);
//Loading Courses
var retrievedCoursesObject =localStorage.getItem("localCoursesArray");
var retrievedCoursesArray = JSON.parse(retrievedCoursesObject);



//Load indeces
var index ;
var indexCourses;



edit();

//FUNCTIONS ABOUT STUDENTS
//This is the function used to print the stored values names of the students array
function edit(){
        

        let printStudents = `<select name = "students" id="editFormStudents"  onChange="update() ">
        <option value="none" selected disabled hidden>Select a student to edit</option>`;
        for(let i=0 ;i<retrievedArray.length;i++){
            printStudents +=`<option>${retrievedArray[i].firstName} ${retrievedArray[i].lastName} </option>`;
        }

        printStudents += `</select>`;
        document.getElementById("studentList").innerHTML= printStudents ;
    }


//This is the function used to select the object that we want to edit
//We select this object based on the values of the first and last name
//We return the index that this object has in the array
//It also prints the properties of the selected object
function update(){
    
    let select = document.getElementById("editFormStudents");
   
    var giveMeTheElement;
    let option =select.options[select.selectedIndex].text;
    for(let i=0 ; i<retrievedArray.length ; i++){
        
        giveMeTheElement = retrievedArray[i]
        if(option ==`${giveMeTheElement.firstName} ${giveMeTheElement.lastName}` ){
           index = i ; 
          
    document.getElementById("printFirstName").value= retrievedArray[index].firstName;
    document.getElementById("printLastName").value= retrievedArray[index].lastName;
    document.getElementById("printDateOfBirth").value= retrievedArray[index].dateOfBirth;
    document.getElementById("printTuitions").value= retrievedArray[index].tuitions;
        
        return index ;
    }
    
   
}

}


//This is the function that we use to resubmit the values 
//from the form, to the object that we have chosen to edit
//Also we locate every student that is in a studentPerCourseArray and we change their values as well
function submitEdditedStudent(){
    var k = 0 
    var l = 0;

    //Θα βάλουμε προσωρινές τιμές που θα παίρνουν τα inputs από το form ώστε να επιβεβαιώσουμε πως δεν θα περαστούν μηδενικές τιμές 
var interimFirstName = document.getElementById("fnameE").value;

var interimLastName = document.getElementById("lnameE").value;
var interimDob = document.getElementById("dobE").value;
var interimTuitions = document.getElementById("tuitE").value;
if(interimFirstName == ""||interimLastName == ""||interimDob == ""||interimTuitions == "")
{
    alert("You cannot have empty fields");
    location.reload();
}
else{
    if(retrievedCoursesArray == undefined)
    {
       alert("You need to insert a course first!");
       location.reload();
    }
    else{

    
    scanTheCourses(k,l);
    retrievedArray[index].firstName = document.getElementById("fnameE").value;
    retrievedArray[index].lastName = document.getElementById("lnameE").value;
    retrievedArray[index].dateOfBirth = document.getElementById("dobE").value;
    retrievedArray[index].tuitions = document.getElementById("tuitE").value;
    event.preventDefault();
    console.log(retrievedArray);
    console.log(retrievedCoursesArray);

    saveStudentArray(retrievedArray,retrievedCoursesArray);
    }

}
    function scanTheCourses(k,l){
        try{
            
            console.log("Hello from try");
            
            console.log("K is "+ k);
            console.log("l is "+ l);
            let findTheStudent=retrievedCoursesArray[k].studentPerCourse[l];
            let findTheStudentLastEl=retrievedCoursesArray[k].studentPerCourse[l+1];
            if(`${findTheStudent.firstName} ${findTheStudent.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`||`${findTheStudentLastEl.firstName} ${findTheStudentLastEl.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`)
            {   console.log("I am in the first if");
            
                if((`${findTheStudent.firstName} ${findTheStudent.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`))
                {console.log("I am in the second if");
                retrievedCoursesArray[k].studentPerCourse[l].firstName = document.getElementById("fnameE").value;
                retrievedCoursesArray[k].studentPerCourse[l].lastName = document.getElementById("lnameE").value;
                retrievedCoursesArray[k].studentPerCourse[l].dateOfBirth= document.getElementById("dobE").value;
                retrievedCoursesArray[k].studentPerCourse[l].tuitions= document.getElementById("tuitE").value;
                console.log(retrievedCoursesArray[k].studentPerCourse[l]);

                //We increment k because each student can only be once in each course
                l=0;
                scanTheCourses(k+1,l);
                }
                if(`${findTheStudentLastEl.firstName} ${findTheStudentLastEl.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`)
                {console.log("I am in the third if");
                retrievedCoursesArray[k].studentPerCourse[l+1].firstName = document.getElementById("fnameE").value;
                retrievedCoursesArray[k].studentPerCourse[l+1].lastName = document.getElementById("lnameE").value;
                retrievedCoursesArray[k].studentPerCourse[l+1].dateOfBirth= document.getElementById("dobE").value;
                retrievedCoursesArray[k].studentPerCourse[l+1].tuitions= document.getElementById("tuitE").value;
                console.log(retrievedCoursesArray[k].studentPerCourse[l+1]);
                
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
                 console.log( retrievedCoursesArray[k].studentPerCourse.length - 1);
                if(l== retrievedCoursesArray[k].studentPerCourse.length - 1 )
                {   k=k+1;
                    console.log("Testing if we have arrived at the end of the studentPerCourse in this course");
                    if(retrievedCoursesArray[k]==undefined)
                    {
                        console.log("I am in the first if of else");
                       return retrievedCoursesArray;
                       
                        // console.log(retrievedArray);
                        // console.log(filtered);
                        
    
                    }
                    else{
                        //we reset the studentPerCOurseArray counter
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
        alert("The student is updated in all the courses that he participates in  ");
       
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
    
    

function saveStudentArray(retrievedArray,retrievedCoursesArray){
    localStorage.setItem("localStudentsArray",JSON.stringify(retrievedArray));
    localStorage.setItem("localCoursesArray",JSON.stringify(retrievedCoursesArray));
    alert("The database was updated!");
    location.reload();
}

//In this function we need to make certain that when a student gets deleted, 
//He gets deleted from every studentPerCOurseArray that he can be found in as well
function deleteStudent(){
 var k = 0 
 var l = 0;

 if(retrievedCoursesArray == undefined)
 {
     alert("You need to add a course first!");
     location.reload();
 }
 else{
    scanTheCourses(k,l);

 console.log(retrievedCoursesArray);
        delete retrievedArray[index];
        
        var filtered = retrievedArray.filter(function (nonZeroElements) { return nonZeroElements != null;});
        retrievedArray = filtered;
        alert("Student deleted!");
        saveStudentArray(retrievedArray,retrievedCoursesArray);
 }
 
    function scanTheCourses(k,l){
        try{
            
            console.log("Hello from try");
            
            console.log("K is "+ k);
            console.log("l is "+ l);
            let findTheStudent=retrievedCoursesArray[k].studentPerCourse[l];
            let findTheStudentLastEl=retrievedCoursesArray[k].studentPerCourse[l+1];
            if(`${findTheStudent.firstName} ${findTheStudent.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`||`${findTheStudentLastEl.firstName} ${findTheStudentLastEl.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`)
            {   console.log("I am in the first if");
            
                if((`${findTheStudent.firstName} ${findTheStudent.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`))
                {console.log("I am in the second if");
                retrievedCoursesArray[k].studentPerCourse.splice(l,1);
                let filteredArray = retrievedCoursesArray[k].studentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
                retrievedCoursesArray[k].studentPerCourse = filteredArray;
                console.log(retrievedCoursesArray[k].studentPerCourse);

                //We increment k because each student can only be once in each course
                l=0;
                scanTheCourses(k+1,l);
                }
                else if(`${findTheStudentLastEl.firstName} ${findTheStudentLastEl.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`)
                {console.log("I am in the third if");
                retrievedCoursesArray[k].studentPerCourse.splice(l+1,1);
                console.log(retrievedCoursesArray[k].studentPerCourse);
                let filteredArray = retrievedCoursesArray[k].studentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
                retrievedCoursesArray[k].studentPerCourse = filteredArray;
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
                 console.log( retrievedCoursesArray[k].studentPerCourse.length - 1);
                if(l== retrievedCoursesArray[k].studentPerCourse.length - 1 )
                {   k=k+1;
                    console.log("Testing if we have arrived at the end of the studentPerCourse in this course");
                    if(retrievedCoursesArray[k]==undefined)
                    {
                        console.log("I am in the first if of else");
                       return retrievedCoursesArray;
                       
                        // console.log(retrievedArray);
                        // console.log(filtered);
                        
    
                    }
                    else{
                        //we reset the studentPerCOurseArray counter
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
        alert("The student is safe to be deleted now ");
       
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
        
        // return retrievedCoursesArray;
        
    }


//END OF STUDENTS FUNCTIONS




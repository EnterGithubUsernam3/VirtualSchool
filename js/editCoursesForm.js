//Loading Courses
var retrievedCoursesObject = localStorage.getItem("localCoursesArray");
var retrievedCoursesArray = JSON.parse(retrievedCoursesObject);

var indexCourses ;

//FUNCTIONS ABOUT COURSES
//This is the function used to print the stored values names of the courses array
function editCourses(){
        

    let printCourses = `<label for = "courses"> Choose one course : </label>
    <select name = "courses" id="editFormCourses" onChange="updateCourses()">
    <option value="none" selected disabled hidden>Select a Course</option>`;
    for(let i=0 ;i<retrievedCoursesArray.length;i++){
        printCourses +=`<option>${retrievedCoursesArray[i].title}</option>`;
    }
    printCourses += `</select>`;
    document.getElementById("coursesList").innerHTML= printCourses ;
}

editCourses();

//This is the function used to select the object that we want to edit
//We select this object based on the values of the title of the course
//We return the index that this object has in the array
//It also prints the properties of the selected object
function updateCourses(){
    
    let select = document.getElementById("editFormCourses");
   
    var giveMeTheElementCourses;
    let option =select.options[select.selectedIndex].text;
    for(let i=0 ; i<retrievedCoursesArray.length ; i++){
        
        giveMeTheElementCourses = retrievedCoursesArray[i]
        if(option ==`${giveMeTheElementCourses.title}`){
           indexCourses = i ; 
          
    document.getElementById("printCoursesTitle").value= retrievedCoursesArray[indexCourses].title;
    document.getElementById("printCoursesSource").value= retrievedCoursesArray[indexCourses].source;
    document.getElementById("printCoursesType").value= retrievedCoursesArray[indexCourses].type;
    document.getElementById("printCoursesStartDate").value= retrievedCoursesArray[indexCourses].startingDate;
    document.getElementById("printCoursesEndDate").value= retrievedCoursesArray[indexCourses].endDate;

        return indexCourses ;
    }
    
   
}

}


//This is the function that we use to resubmit the values 
//from the form, to the object that we have chosen to edit
function submitEdditedCourse(){
    let checkStartDate = new Date(document.getElementById("cStartDate").value);
    let checkEndDate = new Date(document.getElementById("cEndDate").value);
    //Verify that we will not accept empty inputs 
    let interimTitle = document.getElementById("cTitle").value;
    let interimSource = document.getElementById("cSource").value;
    let interimType= document.getElementById("cType").value;
    let interimStDate = document.getElementById("cStartDate").value;
    let interimEndDate= document.getElementById("cEndDate").value;
    if(interimTitle==""||interimSource==""||interimType==""||interimStDate==""||interimEndDate=="")
    {
        alert("You cannot have empty fields");
        location.reload();
    }
    else{
        if(checkStartDate.getFullYear()>checkEndDate.getFullYear())
    {
        alert("The start date cannot be after the end date");
        location.reload();
    }
    else{
            if(Math.abs(checkEndDate.getMonth()-checkStartDate.getMonth())<3 && checkStartDate.getFullYear()-checkEndDate.getFullYear() == 0)
            {
                alert("The course is at least 3 months long");
                location.reload();
            }
            else{

    retrievedCoursesArray[indexCourses].title = document.getElementById("cTitle").value;
    retrievedCoursesArray[indexCourses].source = document.getElementById("cSource").value;
    retrievedCoursesArray[indexCourses].type = document.getElementById("cType").value;
    retrievedCoursesArray[indexCourses].startingDate = document.getElementById("cStartDate").value;
    retrievedCoursesArray[indexCourses].endDate = document.getElementById("cEndDate").value;
}
    }
    saveCourseArray(retrievedCoursesArray);

    }
    
}
function saveCourseArray(retrievedCoursesArray){
    localStorage.setItem("localCoursesArray",JSON.stringify(retrievedCoursesArray));
    alert("The database was updated!");
    location.reload();
}
//The function works properly.
//However after every change in the array 
//you need to save those changes on the local storage.
//The only issue that we are facing 
//is that after the course is deleted
//the page needs to be reloaded ,
//in order for the elements in the selection element to be updated
function deleteCourse(){
    delete retrievedCoursesArray[indexCourses];
    
    var filteredCourses = retrievedCoursesArray.filter(function (nonZeroElements) { return nonZeroElements != null;});
    retrievedCoursesArray = filteredCourses;
    // console.log(retrievedArray);
    // console.log(filtered);
    alert("Course deleted!");
    saveCourseArray(retrievedCoursesArray);

}


//END OF Courses FUNCTIONS
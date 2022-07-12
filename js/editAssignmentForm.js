//Loading Assignments
var retrievedAssObject = localStorage.getItem("localAssignmentArray");
var retrievedAssArray = JSON.parse(retrievedAssObject);

var retrievedCoursesObject = localStorage.getItem("localCoursesArray");
var retrievedCoursesArray = JSON.parse(retrievedCoursesObject);

var retrievedObject =localStorage.getItem("localStudentsArray");
var retrievedArray = JSON.parse(retrievedObject);

var indexAssi ;


//FUNCTIONS FOR ASSIGNMENTS
function editAssi(){
        

    let printAssignments = `<label for = "assignments"> Choose one assignment : </label>
    <select name = "assignments" id="editFormAssignments" onChange="updateAssi() ">
    <option value="none" selected disabled hidden>Select an Assignment</option>`;
    for(let i=0 ;i<retrievedAssArray.length;i++){
        printAssignments +=`<option>${retrievedAssArray[i].titleAssignment}  </option>`;
    }

    printAssignments += `</select>`;
    document.getElementById("assignmentList").innerHTML= printAssignments ;
}
editAssi();
//This function prints the properties of the selected object as well as 
//gets the index of the object inside the array
function updateAssi(){
    
    let select = document.getElementById("editFormAssignments");
   
    var giveMeTheElementAssi;
    let option =select.options[select.selectedIndex].text;
    for(let i=0 ; i<retrievedAssArray.length ; i++){
      
        giveMeTheElementAssi = retrievedAssArray[i]
        if(option ==`${giveMeTheElementAssi.titleAssignment}` ){
           indexAssi = i ; 
        
    document.getElementById("printATitle").value= retrievedAssArray[indexAssi].titleAssignment;
    document.getElementById("printADescription").value= retrievedAssArray[indexAssi].descriptionAssignment;
    document.getElementById("printSubDate").value= retrievedAssArray[indexAssi].assignmentSubDate;
    document.getElementById("printOralMark").value= retrievedAssArray[indexAssi].assignmentOralMark;
    document.getElementById("printTotMark").value= retrievedAssArray[indexAssi].assignmentTotalMark;
        
        return indexAssi ;
    }
    
}
}


function submitEdditedAssignment(){

    let interimAssiTitle = document.getElementById("aTitle").value;
    let interimAssiDesc = document.getElementById("aDescription").value;
    let interimSubDate = document.getElementById("aSubDate").value;
    let interimOralMark= parseInt(document.getElementById("aOralMark").value);
    let interimTotalMark= parseInt(document.getElementById("aTotMark").value);

    if(interimOralMark > 10)
    {
        alert("The oral mark cannot be greater than 10");
        location.reload();
    }
    else if(interimTotalMark > 20)
    {
        alert("The total mark cannot be greater than 20");
        location.reload();
    }
    else if(interimOralMark > interimTotalMark)
    {
        alert("The oral mark cannot be greater than the total mark");
        location.reload();
    }
    


    else if(interimAssiTitle == ""||interimAssiDesc == "" || interimSubDate == "" ||isNaN(interimOralMark)  ||isNaN(interimTotalMark) )
    {
        alert("You cannot have empty fields");
        location.reload();
    }
    
    
    else{

        var k=0;
        var l=0;
        var o=0;
        var p=0;
        if(retrievedCoursesArray == undefined || retrievedArray == undefined)
        {
         alert("You need to enter a student and a course first");
         location.reload();
        }
        else{
            scanTheCourses(k,l);
            scanTheStudents(o,p);
    
            retrievedAssArray[indexAssi].titleAssignment = document.getElementById("aTitle").value;
            retrievedAssArray[indexAssi].descriptionAssignment = document.getElementById("aDescription").value;
            retrievedAssArray[indexAssi].assignmentSubDate = document.getElementById("aSubDate").value;
            retrievedAssArray[indexAssi].assignmentOralMark = parseInt(document.getElementById("aOralMark").value);
            retrievedAssArray[indexAssi].assignmentTotalMark = parseInt(document.getElementById("aTotMark").value);
           
    
            saveAssignmentArray(retrievedAssArray,retrievedArray,retrievedCoursesArray);
        }
        
        }

        function scanTheStudents(o,p){
            try{
                
                console.log("Hello from try");
                
                console.log("o is "+ o);
                console.log("p is "+ p);
                let findTheAssignment=retrievedArray[o].assignmentPerStudent[p];
                let findTheAssignmentLastEl=retrievedArray[o].assignmentPerStudent[p+1];
                if(`${findTheAssignment.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`||`${findTheAssignmentLastEl.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`)
                {   console.log("I am in the first if");
                
                    if((`${findTheAssignment.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`))
                    {console.log("I am in the second if");
                   


                    retrievedArray[o].assignmentPerStudent[p].titleAssignment = document.getElementById("aTitle").value;
                    retrievedArray[o].assignmentPerStudent[p].descriptionAssignment = document.getElementById("aDescription").value;
                    retrievedArray[o].assignmentPerStudent[p].assignmentSubDate = document.getElementById("aSubDate").value;
                    retrievedArray[o].assignmentPerStudent[p].assignmentOralMark =parseInt(document.getElementById("aOralMark").value);
                    retrievedArray[o].assignmentPerStudent[p].assignmentTotalMark =parseInt(document.getElementById("aTotMark").value);




                    console.log(retrievedArray[o].assignmentPerStudent);
    
                    //We increment k because each assignment can only be once in each student
                    p=0;
                    scanTheStudents(o+1,p);
                    }
                    else if(`${findTheAssignmentLastEl.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`)
                    {console.log("I am in the third if");

                    retrievedArray[o].assignmentPerStudent[p+1].titleAssignment = document.getElementById("aTitle").value;
                    retrievedArray[o].assignmentPerStudent[p+1].descriptionAssignment = document.getElementById("aDescription").value;
                    retrievedArray[o].assignmentPerStudent[p+1].assignmentSubDate = document.getElementById("aSubDate").value;
                    retrievedArray[o].assignmentPerStudent[p+1].assignmentOralMark =parseInt(document.getElementById("aOralMark").value);
                    retrievedArray[o].assignmentPerStudent[p+1].assignmentTotalMark = parseInt(document.getElementById("aTotMark").value);


                  
                    p=0;
                    scanTheStudents(o+1,p);
                    }
                    
                }
                else{
                    console.log("Hello from first else");
                    p=p+1;
                    console.log("o is "+ o);
                    console.log("p is "+ p);
                     
                     
                     console.log( retrievedArray[o].assignmentPerStudent.length - 1);
                    if(p == retrievedArray[o].assignmentPerStudent.length - 1 )
                    {   o=o+1;
                        console.log("Testing if we have arrived at the end of the assignmentPerStudent in this student");
                        if(retrievedArray[o]==undefined)
                        {
                            console.log("I am in the first if of else");
                           return retrievedArray;
                           
                            
                            
        
                        }
                        else{
                            //we reset the assignmentPerStudent Array counter
                            //so that when we jump to the next student in the studentsArray
                            //we start searching the assignmentPerStudent array of this student from index 0
                            
                            p=0;
                            scanTheStudents(o,p);
    
                        }
                    }
                        else{
                            
    
                            if(retrievedArray[o]==undefined)
                            {
                                console.log("I am in the first if of else");
                                
                               return retrievedArray;
                                
                                
            
                            }
                            
                           
                            else{ 
                                scanTheStudents(o,p);
                            }
                           
        
                        }
                }
            }
             
        catch{
            console.log("Hello from catch");
            console.log(o);
            console.log(retrievedArray[o]==undefined);
            if(retrievedArray[o]==undefined)
          {
              console.log("Am I in the end game");
            
           
                            
                        return retrievedArray;
                        }
                        else{
                            console.log("");
                            p=0;
                            console.log(o);
                            scanTheStudents(o+1,p);
                        
                        
                    }
                }
            }
    
    
        function scanTheCourses(k,l){
            try{
                
                console.log("Hello from try");
                
                console.log("K is "+ k);
                console.log("l is "+ l);
                let findTheAssignment=retrievedCoursesArray[k].assignmentPerCourse[l];
                let findTheAssignmentLastEl=retrievedCoursesArray[k].assignmentPerCourse[l+1];
                if(`${findTheAssignment.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`||`${findTheAssignmentLastEl.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`)
                {   console.log("I am in the first if");
                
                    if((`${findTheAssignment.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`))
                    {console.log("I am in the second if");
                    retrievedCoursesArray[k].assignmentPerCourse[l].titleAssignment = document.getElementById("aTitle").value;
                    retrievedCoursesArray[k].assignmentPerCourse[l].descriptionAssignment = document.getElementById("aDescription").value;
                    retrievedCoursesArray[k].assignmentPerCourse[l].assignmentSubDate = document.getElementById("aSubDate").value;
                    retrievedCoursesArray[k].assignmentPerCourse[l].assignmentOralMark = parseInt(document.getElementById("aOralMark").value);
                    retrievedCoursesArray[k].assignmentPerCourse[l].assignmentTotalMark = parseInt(document.getElementById("aTotMark").value);

                    console.log(retrievedCoursesArray[k].assignmentPerCourse);
    
                    //We increment k because each assignment can only be once in each course
                    l=0;
                    scanTheCourses(k+1,l);
                    }
                    if(`${findTheAssignmentLastEl.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`)
                    {console.log("I am in the third if");
                    retrievedCoursesArray[k].assignmentPerCourse[l+1].titleAssignment = document.getElementById("aTitle").value;
                    retrievedCoursesArray[k].assignmentPerCourse[l+1].descriptionAssignment = document.getElementById("aDescription").value;
                    retrievedCoursesArray[k].assignmentPerCourse[l+1].assignmentSubDate = document.getElementById("aSubDate").value;
                    retrievedCoursesArray[k].assignmentPerCourse[l+1].assignmentOralMark = parseInt(document.getElementById("aOralMark").value);
                    retrievedCoursesArray[k].assignmentPerCourse[l+1].assignmentTotalMark =parseInt(document.getElementById("aTotMark").value);
                   
                    ;
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
                     console.log( retrievedCoursesArray[k].assignmentPerCourse.length - 1);
                    if(l == retrievedCoursesArray[k].assignmentPerCourse.length - 1 )
                    {   k=k+1;
                       
                        if(retrievedCoursesArray[k]==undefined)
                        {
                            console.log("I am in the first if of else");
                           return retrievedCoursesArray;
                           
                            // console.log(retrievedArray);
                            // console.log(filtered);
                            
        
                        }
                        else{
                            //we reset the assignmnentPerCOurseArray counter
                            //so that when we jump to the next course in the coursesArray
                            //we start searching the assignmentPerCourse array of this course from index 0
                            
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
            alert("The assignment is safe to be edited now  ");
           
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
    
    
    function saveAssignmentArray(retrievedAssArray,retrievedArray,retrievedCoursesArray){
        localStorage.setItem("localAssignmentArray",JSON.stringify(retrievedAssArray));
        localStorage.setItem("localStudentsArray",JSON.stringify(retrievedArray));
        localStorage.setItem("localCoursesArray",JSON.stringify(retrievedCoursesArray));
        alert("The database was updated!");
        location.reload();

    }

    


//We need to locate and delete the assignments that have been entered in 
//courses and in students
function deleteAssignment(){
    var k=0;
    var l=0;
    var o=0;
    var p=0;
// These two are the functions that scan both the courses and the 
//students to find if the desired(to be deleted) assignment is in any of them
if(retrievedArray == undefined || retrievedCoursesArray == undefined)
{
    alert("You need to enter a stundent and a course first");
    location.reload();
}

else{
    scanTheStudents(o,p);
    scanTheCourses(k,l);
    delete retrievedAssArray[indexAssi];
    // console.log("I am in the delete ");
    var filteredAssignment = retrievedAssArray.filter(function (nonZeroElements) { return nonZeroElements != null;});
    retrievedAssArray = filteredAssignment;
    // console.log(retrievedArray);
    // console.log(filtered);
    alert("Assignment deleted!");
    saveAssignmentArray(retrievedAssArray,retrievedArray,retrievedCoursesArray);
    event.preventDefault();

}
    


    function scanTheStudents(o,p){
        try{
            
            console.log("Hello from try");
            
            console.log("o is "+ o);
            console.log("p is "+ p);
            let findTheAssignment=retrievedArray[o].assignmentPerStudent[p];
            let findTheAssignmentLastEl=retrievedArray[o].assignmentPerStudent[p+1];
            if(`${findTheAssignment.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`||`${findTheAssignmentLastEl.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`)
            {   console.log("I am in the first if");
            
                if((`${findTheAssignment.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`))
                {console.log("I am in the second if");
                retrievedArray[o].assignmentPerStudent.splice(p,1);
                let filteredArray = retrievedArray[o].assignmentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
                retrievedArray[o].assignmentPerCourse = filteredArray;
                console.log(retrievedArray[o].assignmentPerStudent);

                //We increment k because each assignment can only be once in each student
                p=0;
                scanTheStudents(o+1,p);
                }
                if(`${findTheAssignmentLastEl.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`)
                {console.log("I am in the third if");
                retrievedArray[o].assignmentPerStudent.splice(p+1,1);
                let filteredArray = retrievedArray[o].assignmentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
                retrievedArray[o].assignmentPerCourse = filteredArray;
                console.log(retrievedArray[o].assignmentPer);
                ;
                p=0;
                scanTheStudents(o+1,p);
                }
                
            }
            else{
                console.log("Hello from first else");
                p=p+1;
                console.log("o is "+ o);
                console.log("p is "+ p);
                 
                 
                 console.log( retrievedArray[o].assignmentPerStudent.length - 1);
                if(p == retrievedArray[o].assignmentPerStudent.length - 1 )
                {   o=o+1;
                    console.log("Testing if we have arrived at the end of the assignmentPerStudent in this student");
                    if(retrievedArray[o]==undefined)
                    {
                        console.log("I am in the first if of else");
                       return retrievedArray;
                       
                        
                        
    
                    }
                    else{
                        //we reset the assignmentPerStudent Array counter
                        //so that when we jump to the next student in the studentsArray
                        //we start searching the assignmentPerStudent array of this student from index 0
                        
                        p=0;
                        scanTheStudents(o,p);

                    }
                }
                    else{
                        

                        if(retrievedArray[o]==undefined)
                        {
                            console.log("I am in the first if of else");
                            
                           return retrievedArray;
                            
                            
        
                        }
                        
                       
                        else{ 
                            scanTheStudents(o,p);
                        }
                       
    
                    }
            }
        }
         
    catch{
        console.log("Hello from catch");
        console.log(o);
        console.log(retrievedArray[o]==undefined);
        if(retrievedArray[o]==undefined)
      {
          console.log("Am I in the end game");
        
       
                        
                    return retrievedArray;
                    }
                    else{
                        console.log("");
                        p=0;
                        console.log(o);
                        scanTheStudents(o+1,p);
                    
                    
                }
            }
        }


    function scanTheCourses(k,l){
        try{
            
            console.log("Hello from try");
            
            console.log("K is "+ k);
            console.log("l is "+ l);
            let findTheAssignment=retrievedCoursesArray[k].assignmentPerCourse[l];
            let findTheAssignmentLastEl=retrievedCoursesArray[k].assignmentPerCourse[l+1];
            if(`${findTheAssignment.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`||`${findTheAssignmentLastEl.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`)
            {   console.log("I am in the first if");
            
                if((`${findTheAssignment.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`))
                {console.log("I am in the second if");
                retrievedCoursesArray[k].assignmentPerCourse.splice(l,1);
                let filteredArray = retrievedCoursesArray[k].assignmentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
                retrievedCoursesArray[k].assignmentPerCourse = filteredArray;
                console.log(retrievedCoursesArray[k].assignmentPerCourse);

                //We increment k because each assignment can only be once in each course
                l=0;
                scanTheCourses(k+1,l);
                }
                if(`${findTheAssignmentLastEl.titleAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment}`)
                {console.log("I am in the third if");
                retrievedCoursesArray[k].assignmentPerCourse.splice(l+1,1);
                let filteredArray = retrievedCoursesArray[k].assignmentPerCourse.filter(function (nonZeroElements) { return nonZeroElements != null;});
                retrievedCoursesArray[k].assignmentPerCourse = filteredArray;
                console.log(retrievedCoursesArray[k].studentPerCourse);
                ;
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
                 console.log( retrievedCoursesArray[k].assignmentPerCourse.length - 1);
                if(l == retrievedCoursesArray[k].assignmentPerCourse.length - 1 )
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
                        //we reset the assignmnentPerCOurseArray counter
                        //so that when we jump to the next course in the coursesArray
                        //we start searching the assignmentPerCourse array of this course from index 0
                        
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
        alert("The assignment is safe to be deleted now ");
       
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

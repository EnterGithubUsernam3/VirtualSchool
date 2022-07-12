//First of all we are loading the arrays are stored at the local memory


//Loading Students
var retrievedObject =localStorage.getItem("localStudentsArray");
var retrievedArray = JSON.parse(retrievedObject);

//Loading Assignments
var retrievedAssObject = localStorage.getItem("localAssignmentArray");
var retrievedAssArray = JSON.parse(retrievedAssObject);


//Indecess to load specific items
var indexAssi ;
var index ;
var assignPerStudent;


//The functions that provide the lists of students and assignments
function edit(){
        

    let printStudents = `<label for = "students"> Choose one student : </label>
    <select name = "students" id="editFormStudents" onChange="update() ">
    <option value="none" selected disabled hidden>Select a Student</option>`;
    for(let i=0 ;i<retrievedArray.length;i++){
        printStudents +=`<option>${retrievedArray[i].firstName} ${retrievedArray[i].lastName} </option>`;
    }

    printStudents += `</select>`;
    document.getElementById("studentsList").innerHTML= printStudents ;
}
edit();


function editAssi(){
        

    let printAssignments = `<label for = "assignments"> Choose one assignment : </label>
    <select name = "assignments" id="editFormAssignments" onChange="updateAssi() ">
    <option value="none" selected disabled hidden>Select an Assignment</option>`;
    for(let i=0 ;i<retrievedAssArray.length;i++){
        printAssignments +=`<option>${retrievedAssArray[i].titleAssignment}  </option>`;
    }

    printAssignments += `</select>`;
    document.getElementById("assignmentsList").innerHTML= printAssignments ;
}
editAssi();


//The functions that load the index of the specific object in the array


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


function update(){
    
    let select = document.getElementById("editFormStudents");
   
    var giveMeTheElement;
    let option =select.options[select.selectedIndex].text;
    console.log(option.firstName);
    for(let i=0 ; i<retrievedArray.length ; i++){
        
        giveMeTheElement = retrievedArray[i];
       console.log(`${giveMeTheElement.firstName} ${giveMeTheElement.lastName}`);
       console.log(option == `${giveMeTheElement.firstName} ${giveMeTheElement.lastName}`);
        if(option ==`${giveMeTheElement.firstName} ${giveMeTheElement.lastName}` ){
           index = i ; 
          
  
        return index ;
    }
    
   
}

}


//The function that assigns assignments per student


function pushAssignmentsPerStudent(){
    let k = 0 ;
    scanTheArrayAssi(k);

    //This is a recursive function with the intent of 
    //scaning the array that is saved at the property
    //assignmentPerStudent
    //If the element is encountered then we notify the user 
    //If it is not then we add the element

    //We will need to add a try catch because in the case that the assignmentPerStudent array is empty an error occurs.
    function scanTheArrayAssi(k)
    {
    try{
        let findTheAssignment=retrievedArray[index].assignmentPerStudent[k];
        let findTheAssignmentLastEl=retrievedArray[index].assignmentPerStudent[k+1];
        console.log("I am in the scanTheArray");

        if(`${findTheAssignment.titleAssignment} ${findTheAssignment.descriptionAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment} ${retrievedAssArray[indexAssi].descriptionAssignment}`||`${findTheAssignmentLastEl.titleAssignment} ${findTheAssignmentLastEl.descriptionAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment} ${retrievedAssArray[indexAssi].descriptionAssignment}`)
        {   
            alert("The assignment is already assigned at this student");
           
        }
        else{
            let l=k+1;
            console.log(l);
            console.log("I am in the else ");
            
            if(l==retrievedArray[index].assignmentPerStudent.length - 1 ){
              
                retrievedArray[index].assignmentPerStudent.push(retrievedAssArray[indexAssi]);
                console.log("I am in the else if ");
                alert("Assignment added to the student");
            }
            else{
                console.log("I am in the else else ");
            scanTheArrayAssi(l);

        }
        }
    }
    catch{
        retrievedArray[index].assignmentPerStudent.push
    (retrievedAssArray[indexAssi]);
    alert("Assignment added to the student");
    }
    }
    saveStudentArray(retrievedArray);
}



function saveStudentArray(retrievedArray)
{
    //Filter the assignmentPerStudent array 
    //We filter this array because when we choose to add an assignment that is already in one student
    //a null object is pushed in the assignmentPerStudent array
    //This is why we filter the array

    let filteredStudents = retrievedArray[index].assignmentPerStudent.filter(function (nonZeroElements) {
        return nonZeroElements != null;
    });
retrievedArray[index].assignmentPerStudent=filteredStudents;

localStorage.setItem("localStudentsArray",JSON.stringify(retrievedArray));
alert("The database was updated ");
location.reload();
}

function printInfo()
{
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
   
        
        document.getElementById("printAssiperStudent").innerHTML=assiPerStudent;
    }

    printInfo();

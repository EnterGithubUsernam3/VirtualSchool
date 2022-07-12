//Loading Students
var retrievedObject = localStorage.getItem("localStudentsArray");
var retrievedArray = JSON.parse(retrievedObject);

//Loading Assignments
var retrievedAssObject = localStorage.getItem("localAssignmentArray");
var retrievedAssArray = JSON.parse(retrievedAssObject);

var index;
var indexAssi;
function edit(){
    
    
    let printStudents = `<label for = "students"> Choose one student : </label>
    <select name = "students" id="editFormStudents" onChange="update() ">
    <option value="none" selected disabled hidden>Select a Student</option>`;
    for(let i=0 ;i<retrievedArray.length;i++){
        printStudents +=`<option>${retrievedArray[i].firstName} ${retrievedArray[i].lastName} </option>`;
    }
    
    printStudents += `</select>`;
    document.getElementById("selectorEle").innerHTML= printStudents ;
}

edit();

editAssi();
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

function printInfoAboutStudents(){
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
   
        
        document.getElementById("printInfo").innerHTML=assiPerStudent;
    }
    printInfoAboutStudents();

   

function removeAssignmentFromStudent(){
let k = 0 ;
scanTheArrayAssi(k);
saveStudentArray(retrievedArray);



function scanTheArrayAssi(k)
{   let findTheAssignment=retrievedArray[index].assignmentPerStudent[k];
    let findTheAssignmentLastEl=retrievedArray[index].assignmentPerStudent[k+1];
    console.log("I am in the scanTheArray");
    try{
        if(`${findTheAssignment.titleAssignment} ${findTheAssignment.descriptionAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment} ${retrievedAssArray[indexAssi].descriptionAssignment}`)
        {  
            
            retrievedArray[index].assignmentPerStudent.splice(k,1);
            let filteredArray = retrievedArray[index].assignmentPerStudent.filter(function (nonZeroElements) { return nonZeroElements != null;});
        
        
        retrievedArray[index].assignmentPerStudent = filteredArray;
        alert("Assignment removed from student");
        return retrievedArray;
        
    }
    else if (`${findTheAssignmentLastEl.titleAssignment} ${findTheAssignmentLastEl.descriptionAssignment}`== `${retrievedAssArray[indexAssi].titleAssignment} ${retrievedAssArray[indexAssi].descriptionAssignment}`)
    {
        
        retrievedArray[index].assignmentPerStudent.splice(k+1,1);
        console.log(retrievedArray[index].assignmentPerStudent);
        let filteredArray = retrievedArray[index].assignmentPerStudent.filter(function (nonZeroElements) { return nonZeroElements != null;});
        
        retrievedArray[index].assignmentPerStudent = filteredArray;
        
        alert("Assignment removed from student");
        return retrievedArray;
    }
    else{
        let l=k+1;
        console.log(l);
        console.log("I am in the else ");
        
        if(l==retrievedArray[index].assignmentPerStudent.length - 1 ){
            
            alert("No such assignment into this student");
        }
        else{
            
        scanTheArrayAssi(l);

    }
    }
}
catch{
    alert("No such assignment into this student");
}
}
}


function saveStudentArray(retrievedArray){
    localStorage.setItem("localStudentsArray",JSON.stringify(retrievedArray));
    
    alert("The database was updated!");
    location.reload();
}

       
    
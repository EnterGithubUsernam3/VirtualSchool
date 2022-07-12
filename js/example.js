var k = 0 ;
function scanTheArray(k)
{let findTheStudent=retrievedCoursesArray[indexCourses].studentPerCourse[k];
    if(`${findTheStudent.firstName} ${findTheStudent.lastName}`== `${retrievedArray[index.firstName]} ${retrievedArray[index.lastName]}`)
    {
        alert("The student is already in the course");
    }
    else{
        let l=k+1;
        if(l==retrievedCoursesArray[indexCourses].studentPerCourse.length){
            retrievedCoursesArray[indexCourses].trainerPerCourse.push(retrievedTrainersArray[indexTrainers]);
            alert("Student added to the course");
        }
        else{
        scanTheArray(l);

    }
    }
}


let k = 0 ;
let l = 0;
function scanTheCourses(k,l){
    try{let findTheStudent=retrievedCoursesArray[k].studentPerCourse[l];
        let findTheStudentLastEl=retrievedCoursesArray[k].studentPerCourse[l+1];
        if(`${findTheStudent.firstName} ${findTheStudent.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`||`${findTheStudentLastEl.firstName} ${findTheStudentLastEl.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`)
        {   console.log("I am in the first if");
            if((`${findTheStudent.firstName} ${findTheStudent.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`))
            {console.log("I am in the second if");
            retrievedCoursesArray[k].studentPerCourse[l].splice(l,1);
            }
            if(`${findTheStudentLastEl.firstName} ${findTheStudentLastEl.lastName}`== `${retrievedArray[index].firstName} ${retrievedArray[index].lastName}`)
            {console.log("I am in the second if");
            retrievedCoursesArray[k].studentPerCourse[l].splice(l+1,1);
            }
        }
        else{
            let j=l+1;
            if(j== retrievedCoursesArray[k].studentPerCourse.length -1 )
            {
                if(retrievedCoursesArray[k]==undefined)
                {
                    alert("The student is not assigned to any courses");
                    delete retrievedArray[index];
    
                    var filtered = retrievedArray.filter(function (nonZeroElements) { return nonZeroElements != null;});
                    retrievedArray = filtered;
                    // console.log(retrievedArray);
                    // console.log(filtered);
                    alert("Student deleted!");

                }
                else{
                    scanTheCourses(k+1,l);

                }
            }
        }}
        
catch{
    if(retrievedCoursesArray[k]==undefined)
  {
    alert("The student is not assigned to any courses");
    delete retrievedArray[index];
    
    var filtered = retrievedArray.filter(function (nonZeroElements) { return nonZeroElements != null;});
    retrievedArray = filtered;
                    // console.log(retrievedArray);
                    // console.log(filtered);
    alert("Student deleted!");
                }
    else{
        l=0;
        scanTheCourses(k+1,l);
    }

                
            }
        }    
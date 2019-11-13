const addSectionDisplay = document.querySelector(".addSection");
const verifySectionButton = document.querySelector("#verifySectionButton");
const addSectionButton = document.querySelector("#addSectionButton");
const addSection = document.querySelector(".addDummySection");
const courseDetails = document.querySelector("#courseDetails");
const addCourseButton = document.querySelector("#addCourseButton");
const getInformation = document.querySelector("#getInformation");
const sectionInformation = document.getElementById("sections");
const dummySection = document.querySelector(".dummySection");

assignFunctions();

let course = [];

addCourseButton.onclick = () => {
    let courseName = getInformation.childNodes[1].childNodes[1].value;
    let departmentName = getInformation.childNodes[3].childNodes[1].innerHTML;
    let [year, semester] = getInformation.childNodes[5].childNodes[1].innerHTML.split('-');
    let courseIC = getInformation.childNodes[7].childNodes[1].innerHTML;

    if(courseName){

        let course1 = new Course(courseName, courseIC, departmentName, year, semester);
        course.push(course1);

        let parentElem = getInformation.parentElement;
        getInformation.remove();
        addCourseButton.remove();

        let newInformation = document.createElement("div");
        newInformation.innerHTML = `<div>
            <p>Course Name = ${course1.courseName}</p>
            <p>Department = ${course1.departmentName}</p>
            <p>Course IC = ${course1.courseIC}</p>
            <p>Semester = ${course1.year}-${course1.semester}</p>
        </div>`;
        parentElem.appendChild(newInformation);

        sectionInformation.style.display = "block";

        sectionList.push(...getData(departmentName, year, semester));
        createInitialConfiguration(sectionList);

        for(let section of sectionList){
            if(section)
                displaySection(section);
        }

        // Add the course to the db
    }
    else{
        alert("Please fill in all details");    
    }
}

addSectionDisplay.onclick = () => {
    document.querySelector(".addDummySection").style["display"] = "block";  
    addSectionButton.disabled = true;  
}

verifySectionButton.onclick = () => {
    let sectionNumber = addSection.children[0].childNodes[1].value;
    let sectionInstructors = addSection.children[2].value;
    let classRoom = addSection.children[3].children[0].innerHTML;
    let days = [];
    for(day of addSection.children[4].children){
        if(day.checked)
            days.push(day.nextSibling.nodeValue);
    }
    let startingHour = addSection.children[5].value;
    let endingHour = addSection.children[6].value;

    let tempSection = new Section(course[0].courseName, sectionInstructors, course[0].courseIC, course[0].departmentName, days, `${startingHour}-${endingHour}`, classRoom, course[0].year, course[0].semester);
    tempSection.sectionNumber = sectionNumber;
    if(checkForClashes(tempSection)){
        addSectionToTable(tempSection);
        addSectionButton.disabled = false;
        sectionList[sectionNumber - 1] = tempSection;
        console.log(sectionList);
    }
    else{
        alert("Clashes are detected, please recheck your section");
        addSectionButton.disabled = true;
    }
}

addSectionButton.onclick = () => {

    displaySection(sectionList[addSection.children[0].childNodes[1].value - 1]);
    addSection.style["display"] = "none";

    for(let section of sectionList){
        if(section)
            sectionInformation.lastChild.remove();
    }
    for(let section of sectionList){
        if(section)
            displaySection(section);
    }

    //add section to the course in DB 
}

function displaySection(newSection){
    let tempSection = dummySection.cloneNode(true);

    tempSection.children[0].children[0].innerHTML = `Section ${newSection.sectionNumber}`;
    tempSection.children[1].children[1].innerHTML += newSection.sectionInstructors;
    tempSection.children[1].children[2].innerHTML += newSection.sectionDays;
    tempSection.children[1].children[3].innerHTML += newSection.sectionHours;
    tempSection.children[1].children[4].innerHTML += newSection.sectionClassRoom;

    tempSection.style.display = "block";

    tempSection.getElementsByClassName("deleteSection")[0].onclick = () => {
        tempSection.remove();
        sectionList.splice(newSection.sectionNumber - 1, newSection.sectionNumber - 1);
        deleteSectionFromTable(newSection);
    }

    tempSection.getElementsByClassName("modifySection")[0].onclick = () => {
        let modifyView = addSection.cloneNode(true);
        modifyView.children[2].value = newSection.sectionInstructors;
        modifyView.children[3].children[0].innerHTML = newSection.sectionClassRoom;
        for(day of modifyView.children[4].children){
            if(newSection.sectionDays.includes(day.nextSibling.nodeValue))
                day.checked = true;
        }
        [modifyView.children[5].value, modifyView.children[6].value] = newSection.sectionHours.split('-');

        console.log(modifyView.children);

        modifyView.children[7].children[1].onclick = () => {
            deleteSectionFromTable(newSection);
            let sectionInstructors = modifyView.children[0].value;
            let classRoom = modifyView.children[1].children[0].innerHTML;
            let days = [];
            for(day of modifyView.children[2].children){
                if(day.checked)
                    days.push(day.nextSibling.nodeValue);
            }
            let startingHour = modifyView.children[3].value;
            let endingHour = modifyView.children[4].value;

            let tSection = new Section(course[0].courseName, sectionInstructors, course[0].courseIC, course[0].departmentName, days, `${startingHour}-${endingHour}`, classRoom);
            tSection.sectionNumber = newSection.sectionNumber;

            if(checkForClashes(tSection)){
                addSectionToTable(tSection);
                addSectionButton.disabled = false;
                sectionList[newSection.sectionNumber - 1] = tSection;
            }
            else{
                alert("Clashes are detected, please recheck your section");
                addSectionButton.disabled = true;
            }
            
        }

        modifyView.children[7].children[0].onclick = () => {
            modifyView.style["display"] = "none";
            tempSection.style.display = "none";
            for(let section of sectionList){
                if(section)
                    sectionInformation.lastChild.remove();
            }
            for(let section of sectionList){
                if(section)
                    displaySection(section);
            }

            // change the course details in db here
        }

        assFunc(modifyView.children[3]);
        modifyView.children[0].remove();
        modifyView.children[0].remove();
        modifyView.style.display = "block";
        modifyView.style.marginLeft = "-0.5em";

        tempSection.children[1].remove();
        tempSection.appendChild(modifyView);
    }

    sectionInformation.append(tempSection);

}
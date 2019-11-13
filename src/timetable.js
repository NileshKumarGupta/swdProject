const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Hours = ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10"]

const timeTableContainer = document.querySelector(".timeTable");

let sectionList = new Array(16); //Only for the time being


//Creates initial configuration of the table
function createInitialConfiguration(requiredSections) {
    for (let i = 0; i < 77; i++) {
        let divToBeAdded = document.createElement("div");
        divToBeAdded.instances = 0;
        timeTableContainer.appendChild(divToBeAdded);
    }

    timeTableContainer.childNodes[1].innerHTML = "Time/Day";
    for (let i = 2; i < 8; i++)
        timeTableContainer.childNodes[i].innerHTML = Days[i - 2];
    for (let i = 0; i < 10; i++)
        timeTableContainer.childNodes[((i + 1) * 7) + 1].innerHTML = Hours[i];

    for (let section of requiredSections) {
        if(!section)
            continue;
        for (let day of section.sectionDays) {
            [hourStart, hourEnd] = section.sectionHours.split("-");
            let targetColumn = Days.indexOf(day) + 1;
            let targetRowStart = Hours.indexOf(hourStart) + 1;
            let targetRowEnd = Hours.indexOf(hourEnd);
            for (let currentRow = targetRowStart; currentRow <= targetRowEnd; currentRow++) {
                targetIndex = targetColumn + 1 + (currentRow * 7);
                timeTableContainer.childNodes[targetIndex].innerHTML += section.displayInformation() + "<br>";
                timeTableContainer.childNodes[targetIndex].instances += 1;
                if (timeTableContainer.childNodes[targetIndex].instances > 1)
                    timeTableContainer.childNodes[targetIndex].style["background-color"] = "lavender";
            }
        }
    }
};

function getData(departmentName, year, semester) {
    // fetch data of coursed with help of departmentName, year, semester and then find respective sections

    // Dummy Sections
    let dSection1 = new Section("A", "B1", "C", "E", ["Monday", "Wednesday", "Friday"], "h2-h5", "LT3", 2, 1);
    let dSection2 = new Section("A", "B2", "C", "E", ["Tuesday", "Thursday", "Saturday"], "h4-h6", "LT4", 2, 1);
    let dSection3 = new Section("A", "B3", "C", "E", ["Tuesday", "Thursday", "Saturday"], "h8-h10", "CC", 2, 1);

    dSection1.sectionNumber = 1;
    dSection2.sectionNumber = 2;
    dSection3.sectionNumber = 3;

    sectionList[dSection1.sectionNumber - 1] = dSection1;
    sectionList[dSection2.sectionNumber - 1] = dSection2;
    sectionList[dSection3.sectionNumber - 1] = dSection3;

    //should return an array of all the required sections
    return [];

};


//displays new Section to the table
function addSectionToTable(tempSection) {
    for (let day of tempSection.sectionDays) {
        [hourStart, hourEnd] = tempSection.sectionHours.split("-");
        let targetColumn = Days.indexOf(day) + 1;
        let targetRowStart = Hours.indexOf(hourStart) + 1;
        let targetRowEnd = Hours.indexOf(hourEnd);
        for (let currentRow = targetRowStart; currentRow <= targetRowEnd; currentRow++) {
            targetIndex = targetColumn + 1 + (currentRow * 7);
            timeTableContainer.childNodes[targetIndex].innerHTML += tempSection.displayInformation() + "<br>";
            timeTableContainer.childNodes[targetIndex].instances += 1;
            if (timeTableContainer.childNodes[targetIndex].instances > 1)
                timeTableContainer.childNodes[targetIndex].style["background-color"] = "lavender";
        }
    }
};

// implemented on veriifyDetrails.onclick()
function checkForClashes(newSection){
    let allowed = true;
    for(let day of newSection.sectionDays){
        [hourStart, hourEnd] = newSection.sectionHours.split("-");
        let targetColumn = Days.indexOf(day) + 1;
        let targetRowStart = Hours.indexOf(hourStart) + 1;
        let targetRowEnd = Hours.indexOf(hourEnd);
        for (let currentRow = targetRowStart; currentRow <= targetRowEnd; currentRow++) {
            targetIndex = targetColumn + 1 + (currentRow * 7);
            targetSlot = timeTableContainer.childNodes[targetIndex];
            if(targetSlot.instances > 0){
                let instr = Array.from(targetSlot.getElementsByClassName('sectionInstructor'));
                for(let i = 0; i < instr.length; i++)
                    instr[i] = instr[i].innerHTML;
                let classrooms = Array.from(targetSlot.getElementsByClassName('classRoom'));
                for(let i = 0; i < classrooms.length; i++)
                    classrooms[i]= classrooms[i].innerHTML;

                for(let inst of instr){
                    for(let cls of classrooms){
                        if(inst.includes(newSection.sectionInstructors) || cls.includes(newSection.sectionClassRoom)){
                            allowed = false;
                            break;
                        }
                    }
                    if(!allowed)
                        break;
                }
            }
        }
    }
    return(allowed);
}

//Delete section from the table
function deleteSectionFromTable(doomedSection){
    for(let day of doomedSection.sectionDays){
        [hourStart, hourEnd] = doomedSection.sectionHours.split("-");
        let targetColumn = Days.indexOf(day) + 1;
        let targetRowStart = Hours.indexOf(hourStart) + 1;
        let targetRowEnd = Hours.indexOf(hourEnd);
        for (let currentRow = targetRowStart; currentRow <= targetRowEnd; currentRow++) {
            targetIndex = targetColumn + 1 + (currentRow * 7);
            targetSlot = timeTableContainer.childNodes[targetIndex];
            targetSlot.innerHTML = targetSlot.innerHTML.replace(doomedSection.displayInformation() + "<br>", "");
            targetSlot.instances--;
        }
    }
}

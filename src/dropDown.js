const dropDownMenu = Array.from(document.getElementsByClassName("dropDownMenu"));

//below functions assign dropdown functionality of all dropdown menu's

function  assignFunctions(){
    for(let instance of dropDownMenu){
        instance.childNodes[1].onclick = () =>{
            instance.childNodes[3].style["position"] = "absolute";
            instance.childNodes[3].style["display"] = "block";
        }

        for(let child of instance.childNodes[3].childNodes){
            child.onclick = () => {
                let tempText = child.innerHTML;
                child.innerHTML = instance.childNodes[1].innerHTML;
                instance.childNodes[1].innerHTML = tempText;
                
                if(instance.id == "selectSemester") 
                    [departmentSemester.year, departmentSemester.semester]= tempText.split("-");
                if(instance.id == "selectDepartment"){
                    departmentSemester.departmentName = tempText;
                }
                    
                instance.childNodes[3].style["position"] = "";
                instance.childNodcdes[3].style["display"] = "none";
            }
        }
    }
}

function assFunc(instance){
    instance.childNodes[1].onclick = () =>{
        instance.childNodes[3].style["position"] = "absolute";
        instance.childNodes[3].style["display"] = "block";
    }

    for(let child of instance.childNodes[3].childNodes){
        child.onclick = () => {
            let tempText = child.innerHTML;
            child.innerHTML = instance.childNodes[1].innerHTML;
            instance.childNodes[1].innerHTML = tempText;
            
            if(instance.id == "selectSemester") 
                [departmentSemester.year, departmentSemester.semester]= tempText.split("-");
            if(instance.id == "selectDepartment"){
                departmentSemester.departmentName = tempText;
            }
                
            instance.childNodes[3].style["position"] = "";
            instance.childNodes[3].style["display"] = "none";
        }
    }    
}
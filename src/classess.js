class Department{
    constructor(name, faculty, courses){
        this._name = name;
        this._faculty = faculty;
        this._courses = courses;
    }
}

class Course{
    constructor(name, IC, department, year, semester){
        this._courseName = name;
        this._courseIC = IC;
        this._department = department;
        this._year = year;
        this._semester = semester;
        this._year = year;
        this._semester = semester;
    }

    get courseName(){
        return this._courseName;
    }

    get courseIC(){
        return this._courseIC;
    }

    get couseDepartment(){
        return this._department;
    }

    get year(){
        return this._year;
    }

    get semester(){
        return this._semester;
    }
}

class Section extends Course{
    constructor(name, instructors, IC, department, days, hours, classRoom, year, semester){
        super(name, IC, department, year, semester);
        this._instructors = instructors;
        this._days = days;
        this._hours = hours;
        this._classRoom = classRoom;
    }

    get sectionInstructors(){
        return this._instructors;
    }

    get sectionDays(){
        return this._days;
    }

    get sectionHours(){
        return this._hours;
    }

    get sectionClassRoom(){
        return this._classRoom;
    }

    set sectionNumber(num){
        this._sectionNumber = num;
    }

    get sectionNumber(){
        return this._sectionNumber;
    }

    displayInformation(){
        return (
            `<div>
                <span class="sectionInstructor">${this.sectionInstructors} </span>
                <span class="classRoom">${this.sectionClassRoom} </span>
                <span>${this.sectionNumber}</span>
            </div>`
        );
    }
}

class Instructor{
    constructor(name, department, courses){
        this._name = name;
        this._department = department;
        this._courses = courses;
    }

    get instructorName(){
        return this._name;
    }

    get instructorDepartment(){
        return this._department;
    }

    get instructorCourses(){
        return this._courses;
    }
}
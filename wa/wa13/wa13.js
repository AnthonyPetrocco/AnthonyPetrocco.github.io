//Problem 1

let employees = 
[
    {
        "first_name": "Sam",
        "department": "Tech",
        "designation":"Manager",
        "salary": 40000,
        "raise_eligible": true
    },
    {
        "first_name": "Mary",
        "department": "Finance",
        "designation":"Trainee",
        "salary": 18500,
        "raise_eligible": true
    },
    {
        "first_name": "Bill",
        "department": "HR",
        "designation":"Executive",
        "salary": 21200,
        "raise_eligible": false
    }
];

console.log("Problem 1",employees[0],employees[1],employees[2]);
console.log("Problem 1",employees)

//Problem 2

let company = [
    {
        "companyName": "Tech Stars",
        "website": "www.techstars.site",
        "employees": ["Sam","Mary","Bill"]
    } 
];

console.log("Problem 2",company);

//Problem 3

employees[3] = {
    "first_name": "Anna",
    "department": "Tech",
    "designation":"Executive",
    "salary": 25600,
    "raise_eligible": false
};

console.log("Problem 3",employees[0],employees[1],employees[2],employees[3]);

//Problem 4

let totalSalary = 0;

for(let i = 0; i<employees.length; i++){
    totalSalary = totalSalary + employees[i].salary;
}

console.log("Problem 4",totalSalary);

//Problem 5

for(let i = 0; i<employees.length; i++){
    if(employees[i].raise_eligible === true){
        employees[i].salary *= 1.1;
        employees[i].raise_eligible = false;
    }
}

console.log("Problem 5",employees[0],employees[1],employees[2],employees[3]);

//Problem 6

for(let i = 0; i<employees.length; i++){
    employees[i].wfh = false;
    if(employees[i].first_name === "Anna" || employees[i].first_name === "Sam"){
        employees[i].wfh = true;
    }
}

console.log("Problem 6",employees[0],employees[1],employees[2],employees[3]);
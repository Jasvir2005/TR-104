// let colour= ["red", "green","blue"]
// console.log(colour);

// Indexed Array
// console.log(colour[1]);
// console.log(colour.length);

// colour.forEach(function(snacks){
//     console.log(snacks);
// })

// let colour= ["red", "green","blue"]
// colour.pop();

// console.log(colour);

// Associative Array
// let student ={
//     name: "Jasvir",
//     age: "21",
//     course: "MERN Stack"
// };

// console.log(student.name);
// console.log(student["age"]);

// Multi-dimensional Array
// let marks = [ [80, 81, 82],  [88, 89, 90],  [93, 94, 95] ];
// console.log(marks[0][1]);
// console.log(marks[1][0]);

// TASK
let students =[
    { name: "Jasvir", age: "21", course: "MERN Stack"},
    { name: "Simran", age: "20", course: "Web Development"},
    { name: "Kiran", age: "22", course: "Data Science"}
];
console.log(students);
students.forEach(function (student, index) {
    console.log("Student ", index + 1);
    console.log("Name:", student.name);
    console.log("Age:", student.age);
    console.log("Course:", student.course);
    console.log("")
})
// pop
console.log("student.pop():", students.pop());
console.log("")

console.log("Name:", students[0].name);
console.log("Age:", students[0].age);
console.log("Course:", students[1].course);

console.log(students[1]["name"]);
console.log(students[0]["age"]);
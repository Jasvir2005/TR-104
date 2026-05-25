//function mymessage(){
//    console.log("this is my message");
//}
//mymessage();
//mymessage();

// Addition using function
//function add(a,b){
//    console.log(a+b);
//}
//add(10,5);

// if-else using Function
//function classGrade(marks){
//    if(marks >= 50){
//        return "Pass";
//    }else{
//        return "Fail";
//    }
//}
//console.log(classGrade(70));


// Length
//let car = "thar";
//console.log(car.length);
// Upper Case
//console.log(car.toUpperCase());
// Lower Case
//let colour = "GREEN";
//console.log(colour.toLowerCase());
// Index
//let text = "this is my new variable";
//console.log(text.indexOf("new"));


// TASK
function Grade(){
    let score = prompt("Enter your score");
    score = Number(score);
    if(score < 0){
        alert("Number is less than zero");
    }else if(score > 100){
        alert("Number is greater than 100");
    }else if(score >= 90){
        return "Grade O";
    }else if(score >= 80){
        return "Grade A";
    }else if(score >= 70){
        return "Grade B";
    }else if(score >= 60){
        return "Grade C";
    }else if(score >= 50){
        return "Grade D";
    }else if(score >= 40){
        return "Grade E";
    }else{
        return "You are Fail";
    }
}
console.log(Grade());
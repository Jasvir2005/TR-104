let age = prompt("Enter your Age: ");
if(age > 110){
    alert("Invalid Age");
}else if(age < 0){
    alert("Invalid Age");
}else if(age >= 18){
    console.log("Aligible for Vote");
}else{
    console.log("Under Age");
}
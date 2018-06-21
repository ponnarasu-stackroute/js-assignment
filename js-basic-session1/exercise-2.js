// use array function array.slice to insert into the existing array
//or new array created. and if i & i-1 positions are even, insert - to it

function addhyphen2evens(nums){
let numbers = num2arrnum(nums);
//console.log(numbers);
//new array created and push each element into the new array 
if(numbers.length==0)
    return [];
  var result = [numbers[0]];
  var strResult = numbers[0]+'';
  for(var i=1; i<numbers.length; i++) {

    if(numbers[i]%2 == 0 && numbers[i-1]%2 == 0) {
      result.push("-");
      strResult = strResult +'-';
    }
    result.push(numbers[i]);  
    strResult = strResult + ''+numbers[i];
  }
  console.log("result : "+result);
//to display without , in array.
console.log(strResult);

}

// input number to array of string
function num2str(){
    var num = 123456789;
num = num.toString(); //'123456789'
var digits = num.split(""); //[ '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
//console.log(digits);
}

//input numbers into array of numbers
//*****The map() method creates a new array with the results of calling a provided function on every element in the calling array.
function num2arrnum(num){
   
     var num = num.toString();//'123456789'
     var digits = num.split(""); //[ '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
     //The map() method creates a new array with the results of calling a provided function on every element 
     var arrdigits = digits.map(x=>parseInt(x));
//console.log(arrdigits);
return arrdigits;
}


num2str();num2arrnum(123456789);
addhyphen2evens("12345689");
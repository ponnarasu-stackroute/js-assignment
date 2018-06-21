//solu-1 obviously we need to store input values in array.
// then use inbuilt math fn or we can create added func to Array.prototype and use
//apply used to call differetn object methods
function getMaxMin_solu1(inputNums){
    let numArr = inputNums.split(" ");
    console.log(numArr);
    //array obj dont have min max methods
    console.log(Math.max.apply(null,numArr)+" "+Math.min.apply(null,numArr));

}

getMaxMin_solu1("5 7 1 3 4 9 2");

// we can add min max methods to array itself using prototype
// Max function.
Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  
  // Min function.
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  
  var stringNumbers = "1 2 3 4 5";
  
  // Convert to array with the numbers.
  var arrayNumbers = stringNumbers.split(" ");
  console.log(arrayNumbers);
  // Show the highest and lowest numbers.
  console.log("Highest number: " + arrayNumbers.max() + "\n Lowest number: " + arrayNumbers.min());

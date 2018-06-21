let arr = [1,1,2,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];  
// traditional way
  let unique_array = [];
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i]);
        }
    }
    console.log(unique_array); 

// using set  in ES6
console.log(Array.from(new Set(arr)));

//The filter() method creates a new array with all elements that pass the test implemented by the provided function.
// filter takes current element, indexof element, array as param
//indexof - returns 1st occurance of the value
console.log(arr.filter(
  function(elem, index, self) {
        return index == self.indexOf(elem);
    }  
));

//he reduce() method reduces the array to a single value.
//The reduce() method executes a provided function for each value of the array (from left-to-right).
//The return value of the function is stored in an accumulator (result/total).
// var numbers = [65, 44, 12, 4];
//numbers.reduce((total,num)=>total+num));

/* Write a Program to Flatten a given n-dimensional array */

// const flatten = (arr) => {
// 	// Write your code here
// 	var flattened = arr.reduce(
// 		function(accumulator, currentValue) {
// 		  return accumulator.concat(
// 			  Array.isArray(currentValue)?currentValue.reduce(
// 				  function(acc,it){
// 					return acc.concat(it);	
// 				  },[]
// 			  ):currentValue
// 		  );
// 		},
// 		[]
// 	  );
// 	  console.log(flattened);
// 	//  console.log(arr.flatten());
// };

// flatten([1, [2, 3], [[4], [5]]]);

/* Write a Program to Flatten a given n-dimensional array */



const flatten = (input) => {
	//var input = [1, [2, 3], [[4], [5]]];
	
	Array.prototype.flatten = (array) => {
		const newAr = [];
		const flat = (array) => {
			array.map(i => {
				Array.isArray(i) ? flat(i) : newAr.push(i)
			})
		}
		flat(input);
		return newAr;
	};
	const result = input.flatten();
	console.log(result);
	return result;
};

flatten([1, [2, 3], [[4], [5]]]);

/* For example,
INPUT - flatten([1, [2, 3], [[4], [5]])
OUTPUT - [ 1, 2, 3, 4, 5 ]

*/

module.exports = flatten;

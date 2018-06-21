/* Write a Program to convert an array of objects to an object
	based on a given key */
//https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7

// const convert = (array, keyField) => 
// 	// Write your code here
//     array.reduce((obj, item) => {
//         obj[item[keyField]] = item
//         return obj
//       }, {});

//aliter
const convert = (arr, keyField) => {
	 const result = (array, keyField) => 
		arr.reduce((obj, item) => {
			obj[item[keyField]] = item
			return obj
		}, {})
	
	const finResult = result(arr, keyField)
	return finResult;
};

/* For example,
INPUT - convert([{id: 1, value: 'abc'}, {id: 2, value: 'xyz'}], 'id')
OUTPUT - {
			'1': {id: 1, value: 'abc'},
			'2': {id: 2, value: 'xyz'}
		 }


*/
//const peopleObject = convert([{id: 1, value: 'abc'}, {id: 2, value: 'xyz'}], 'id');
//console.log(peopleObject);





module.exports = convert;

// Write a program to display one result card of 100 students
// with their name and percentage
// Out of 100 students, 50 has subjects - Grammer and Accounts
// and other 50 has subjects -  Grammer and Physics
// Hint : You need to calculate percentage of 100 students having different set of subjects.
//        You can assume their scores on their respective subjects.
// Write your code here

const results = () => {
  const studentsList = [
	{name: 'Student1', subjects: [{subject: 'Grammar', marks: 55}, {subject: 'Accounts', marks: 59}]},
	{name: 'Student2', subjects: [{subject: 'Grammar', marks: 40}, {subject: 'Accounts', marks: 48}]},
	{name: 'Student3', subjects: [{subject: 'Grammar', marks: 88}, {subject: 'Accounts', marks: 58}]},
	{name: 'Student4', subjects: [{subject: 'Grammar', marks: 90}, {subject: 'Accounts', marks: 60}]},
	{name: 'Student5', subjects: [{subject: 'Grammar', marks: 100}, {subject: 'Physics', marks: 90}]},
	{name: 'Student6', subjects: [{subject: 'Grammar', marks: 35}, {subject: 'Physics', marks: 100}]},
	{name: 'Student7', subjects: [{subject: 'Grammar', marks: 65}, {subject: 'Physics', marks: 45}]},
	{name: 'Student8', subjects: [{subject: 'Grammar', marks: 44}, {subject: 'Physics', marks: 98}]}
  ]
  
  const result = () => 
        studentsList.reduce((obj, item) => {
                let percenRes = item.subjects.reduce(() => {
					return (item.subjects[0].marks + item.subjects[1].marks) / item.subjects.length;
					//return item1;               
            }, {})
		console.log({ 'name': item.name, 'percentage': percenRes });
	}, {})
	
	const finResult = result(studentsList);
  	return finResult;
};
results();
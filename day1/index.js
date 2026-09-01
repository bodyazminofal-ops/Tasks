alert("welcome to my site");

const name = prompt("Enter name");

alert(`hello ${name}`);

let StudentsMarks = [
  [65, 90, 70],
  [75, 98, 80],
  [90, 85, 70],
  [75, 78, 88],
];
for (let i = 0; i < StudentsMarks.length; i++) {
  let sum = 0;

  for (let j = 0; j < StudentsMarks[i].length; j++) {
    sum += StudentsMarks[i][j];
  }

  const avg = sum / StudentsMarks[i].length;

  console.log(`Avg of class ${i + 1} is ${avg}`);

  let grade;

  switch (true) {
    case avg >= 90:
      grade = "A";
      break;

    case avg >= 80:
      grade = "B";
      break;

    case avg >= 70:
      grade = "C";
      break;

    case avg >= 60:
      grade = "D";
      break;

    default:
      grade = "F";
  }

  console.log(`grade of class ${i + 1} is ${grade}`);
}

// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("\nLet's play some scrabble! Enter a word: ");
   //console.log(oldScrabbleScorer(word));
   return word;  //Pass word to next.
};

function simpleScorer(word) {
	word = word.toUpperCase();
  // need to remove any spaces(blank tiles) which have no points.
  while (word.includes(' ')){
    word = word.replace(' ','');
  }
	// at one point per letter word length = points.
	return word.length;
 }

//Not sure what do here. Try this:
let simpleScore = simpleScorer('pineapple');

function vowelBonusScorer(word) {
  //Fix any lower case entries.
	word = word.toUpperCase();
  // need to remove any spaces(blank tiles) which have no points.
  while (word.includes(' ')){
    word = word.replace(' ','');
  }
	let vowels = ['A','E','I','O','U'];
	let letterPoints = 0;

	for (i = 0; i < word.length; i++) {
    
	let vowels = ['A','E','I','O','U'];
    if (vowels.includes(word[i])){
      // Add 3 points if a vowel.
       letterPoints += 3;
    } else{
      //Add one point if not a vowel.
      letterPoints++;
    }
  } 
   return letterPoints;
} 
//Not sure what do here. Try this:
let vowelBonusScore = vowelBonusScorer('pineapple');

let scoringOptions = [oldScrabbleScorer,simpleScorer,vowelBonusScorer];

const scoringAlgorithms = [
  {name: "Simple Score",
    description: "Each letter is worth 1 point.",scorerFunction: simpleScorer},
  {name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer},
  {name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer}
];
//test scoringAlgorithms
/*
console.log()
console.log("algorithm name: ", scoringAlgorithms[0].name);
console.log("scorerFunction result: ", scoringAlgorithms[0].scorerFunction("JavaScript"));
*/
function scorerPrompt(word) {

 let numEntered = -1;
 let newLine = '';
  
 while(!(numEntered === 0 || numEntered === 1 || numEntered === 2)){
   numEntered = input.question(
`${newLine}Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scabble point system
Enter 0, 1, or 2: `);
  // Change string input to a number.
  numEntered = Number(numEntered);
  //Activate new line for susequent 'while' repeats.
  newLine = '\n';

 }  // end pf while
 //Return template/
  return `Score for '${word}': ${scoringAlgorithms[numEntered].scorerFunction(word)}`;
 
}

function transform(object) {
  let arr = [];
  let newObj = {};
  //For each key in the passed object
  for (item in object) {
    //For each part(letter) of the value of that key.
   for (i=0; i<object[item].length; i++){
      //push an array into 'arr' containing that letter and its old key. As so: [part,key].
      arr.push([object[item][i],item]);
   }
  }
  // Sort the new array alphabetically on the letter part .
  arr.sort();
  //For each array in 'arr' use [i][0] as a new key and [i][1] as its value.
   for  (i=0; i<arr.length; i++){
    newObj[ arr[i][0] ] = arr[i][1];
  
    }
  return newObj;
}

// Use 'transform'to create the new 'newPointstructure'
const newPointStructure
 = transform(oldPointStructure);
 //Add a spaceChar as a key with value of 0. If user enters a blank tile as a spaceChar.
  newPointStructure[' '] = 0;
 //console.log(newPointStructure);

 function scrabbleScorer(word){
  let score = 0;
  //let letter = '';
  let points = 0;
  //let lines = '';
   for (i=0; i<word.length; i++){
    letter = word[i].toUpperCase();
     points = Number(newPointStructure[letter]);
     score += points;
    // Drop the old kind of return:
    //lines += `Points for '${word[i]}': ${points}\n`
   } 
    //return lines + '\n' + score;
    //Just return the cummulative score per instructions.
   return score;
 }
 
 //The 'let' below moved to be below function 'scrabbleScorer'
 //But not sure what's needed. Can't find any instruction. Try this:
let scrabbleScore = scrabbleScorer('pineapple');    

function runProgram() {
   //Run 'initialPrompt' and get the word it returns, the user input word.
   let word = initialPrompt();
   //Run 'scorerPrompt' with that word.
   console.log(scorerPrompt(word));

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};


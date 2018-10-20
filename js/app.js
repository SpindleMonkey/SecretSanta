console.log( 'js is loaded' );

/**
 * Part 1 Data
 */

var families = [ 
  [
    'Connie', 
    'Al', 'Mona',
    'Geoff', 'Anya', 'Monique',
    'Julie', 'Christine', 'Tyson', 'Alexandra', 'Dan', 'Isaak', 'Elliot',
    'Chris', 'Lynn', 'Andrea', 'Laura'
  ],
  [
    'Connie', 'Laura', 'Greg'
  ],
  [
    'Connie'
  ],
  [
    'Connie', 'Laura'
  ]
];

/**
 * Common code for all parts of the Secret Santa Generator
 */

/**
 * Use random numbers to pick the Secret Santa's gift recipient. This 
 * function returns from min up to and including max (inclusive).
 */
function getRandom(min, max) {
  let myMin = Math.ceil(min);
  let myMax = Math.floor(max);
  return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
}

/* ********************************************************* */

/**
 * Part 1 specific code
 */

function assignSecretSantas(family) {
  let results = document.getElementById('family' + (family + 1));

  /* check for a couple of easy cases first */
  if ( families[family].length == 1 ) {
    results.textContent = "You are your own Secret Santa! Don't go too crazy, ok?";
  } else {
    /** 
     * We have at least 2 people to work with, so we'll use a random 
     * number generator to assign Secret Santas 
     */
    let familySize = families[family].length;

    // console.log( 'There are ' + families[family].length + ' members in this family' );
    let resultsString = 'There are ' + familySize + ' members in this family.';
    resultsString += '<ul>';

    let assignments = [];

    /**
     * Using a simple shift of the list of names to make assignments!
     * This means we won't have to worry about anybody being assigned
     * themselves because we won't use a starting point of 0. Using a 
     * random number to get the starting point for the shift means we 
     * might not make the same assignments year after year (maybe).
     */
    let startingPoint = getRandom(1, familySize - 1);
    // console.log( 'starting point: ' + startingPoint );

    for ( let i = 0; i < familySize; i++ ) {
      if ( startingPoint >= familySize ) {
        startingPoint = 0;  /* wrap around to the top of the list */
      }

      assignments[i] = families[family][startingPoint];
      // console.log( families[family][i] + ': ' + assignments[i] );
      resultsString += '<li>' + 
        families[family][i] + ' is ' + assignments[i] + "'s Secret Santa" +
        '</li>';
      startingPoint++;
    }

    resultsString += '</ul>';
    results.innerHTML = resultsString;
  }
}
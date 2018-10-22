// console.log( 'js is loaded' );

/* ********************************************************* */

/**
 * Part 1 Data
 */

let families = [ 
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
    'Daisy'
  ],
  [
    'Connie', 'Laura'
  ]
];

/* ********************************************************* */

/**
 * Part 2 Data
 */

let familiaSize = 0;

let results;

let familias = [ 
  [ /* each member has an array to hold past Secret Santa partners (partner history) */
    { santa: 'Connie',    avail: true, partner: '', history: [] },
    { santa: 'Al',        avail: true, partner: '', history: [] },
    { santa: 'Mona',      avail: true, partner: '', history: [] },
    { santa: 'Geoff',     avail: true, partner: '', history: [] },
    { santa: 'Anya',      avail: true, partner: '', history: [] },
    { santa: 'Monique',   avail: true, partner: '', history: [] },
    { santa: 'Julie',     avail: true, partner: '', history: [] },
    { santa: 'Christine', avail: true, partner: '', history: [] },
    { santa: 'Tyson',     avail: true, partner: '', history: [] },
    { santa: 'Alexandra', avail: true, partner: '', history: [] },
    { santa: 'Dan',       avail: true, partner: '', history: [] },
    { santa: 'Isaak',     avail: true, partner: '', history: [] },
    { santa: 'Elliot',    avail: true, partner: '', history: [] },
    { santa: 'Chris',     avail: true, partner: '', history: [] },
    { santa: 'Lynn',      avail: true, partner: '', history: [] },
    { santa: 'Andrea',    avail: true, partner: '', history: [] },
    { santa: 'Laura',     avail: true, partner: '', history: [] }
  ],
  [
    { santa: 'Connie',    avail: true, partner: '', history: [] },
    { santa: 'Byrdie',    avail: true, partner: '', history: [] },
    { santa: 'Annie',     avail: true, partner: '', history: [] },
    { santa: 'Oskar',     avail: true, partner: '', history: [] },
    { santa: 'Zelda',     avail: true, partner: '', history: [] },
    { santa: 'Olivia',    avail: true, partner: '', history: [] }
  ],
  [
    { santa: 'Connie',    avail: true, partner: '', history: [] },
    { santa: 'Laura',     avail: true, partner: '', history: [] },
    { santa: 'Greg',      avail: true, partner: '', history: [] }
  ],
  [
    { santa: 'Connie',    avail: true, partner: '', history: [] }
  ]
];

/* ********************************************************* */

/**
 * Part 3 Data
 */

let familjer = [
    { santa: 'Al',        avail: true, partner: '', history: [], immFam: ['Mona', 'Geoff'] },
    { santa: 'Mona',      avail: true, partner: '', history: [], immFam: ['Al', 'Geoff'] },
    { santa: 'Geoff',     avail: true, partner: '', history: [], immFam: ['Al', 'Mona', 'Anya', 'Monique'] },
    { santa: 'Anya',      avail: true, partner: '', history: [], immFam: ['Geoff'] },
    { santa: 'Monique',   avail: true, partner: '', history: [], immFam: ['Geoff'] },
];

/* ********************************************************* */

/**
 * Part 2 Data
 */

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
  let results = document.getElementById('family' + (family + 1) );

  /* check for a couple of easy cases first */
  if ( families[family].length == 1 ) {
    results.textContent = "You're your own Secret Santa, " + families[family][0] + "! Don't go too crazy, ok?";
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

/* ********************************************************* */

/**
 * Part 2 specific code
 */

function initAvailability( family ) {
  for ( let i = 0; i < familiaSize; i++ ) {
    familias[family][i].avail = true;
  }
}

function findPartner( family, ssanta ) {
  /* new partner needs to be available, and not assigned in the last 3 years */
  let attempts = familiaSize * 5; // let's avoid infinite loops if we can
  let partner = getRandom(0, familiaSize - 1);

  /**
   * don't assign yourself as your Secret Santa
   * assign only available partners
   * don't assign somebody from the last 3 years
   */
  while ( ( ( ssanta == partner ) ||
          ( familias[family][partner].avail == false ) ||
          ( familias[family][ssanta].history.indexOf( familias[family][partner].santa ) != -1 ) ) &&
          ( attempts > 0 ) ) {
    partner = getRandom(0, familiaSize - 1);
    attempts--;
  }

  if ( attempts == 0 ) {
    /**
     * TODO: need to go back through the already-assigned partners and 
     * find one that can swap with this ssanta; for now, we'll just
     * assign the first available partner even though we're breaking
     * either the 3-year rule or the rule to not assign somebody as
     * their own Secret Santa because we need to make some kind of
     * assignment.
     */
    partner = 0;
    while ( familias[family][partner].avail == false ) {
      partner++;
    }
    console.log( 'no match for ' + ssanta + '; using first avail ' + partner );
  }

  return partner;
}

function assignPartner( family, ssanta, partner ) {
  /* assign the partner, mark unavailable */
  familias[family][ssanta].partner = familias[family][partner].santa;
  familias[family][partner].avail = false;
}

function cleanupHistory( family ) {
  /* make all partner assignments official by adding to history */ 
  for ( let i = 0; i < familiaSize; i++ ) {
    familias[family][i].history.push(familias[family][i].partner );
    if ( familias[family][i].history.length > 3 ) {
      /* we only want the last 3 years' history, so get rid of the oldest entry */
      familias[family][i].history.shift();
    }
  }
}

function showSecretSantaAssignments( family ) {
  let resultsString = 'There are ' + familiaSize + ' members in this family.';
  resultsString += '<ul>';

  for ( let i = 0; i < familiaSize; i++ ) {
    resultsString += '<li>' + 
      familias[family][i].santa + ' is ' + 
      familias[family][i].partner + "'s Secret Santa; history: " + 
      familias[family][i].history + 
      '</li>';
  }

  resultsString += '</ul>';

  results.innerHTML = resultsString;
}

function generateSecretSantas(family) {
  results = document.getElementById('family2' + (family + 1));

  familiaSize = familias[family].length;

  initAvailability( family );

  /* check for a couple of easy cases first */
  if ( familiaSize == 1 ) {
    results.textContent = "You're your own Secret Santa, " + 
      familias[family][0].santa + "! Don't go too crazy, ok?";    
  } else if ( familiaSize < 4 ) {
    results.textContent = "You need at least 4 people in your family so \
      Secret Santa's don't repeat more than once every 3 years (your family \
      has only " + familiaSize + " members).";
  } else {

    /** 
     * We have at least 4 people to work with! We'll assign all Secret
     * Santas using random numbers this time around because now we
     * have to make sure people don't get the same Secret Santa more
     * frequently than once every 3 years and combining the shift with
     * the 3 year check could get messy. */

    let newPartner = 0;

    for ( let i = 0; i < familiaSize; i++ ) {
      newPartner = findPartner( family, i );
      if ( newPartner < 0 ) {
        console.log( ' Help! Could not find a partner for ' + familias[family][i].santa );
      } else {
        assignPartner( family, i, newPartner );
      }
    }

    showSecretSantaAssignments(family);

    cleanupHistory( family );
  }
}

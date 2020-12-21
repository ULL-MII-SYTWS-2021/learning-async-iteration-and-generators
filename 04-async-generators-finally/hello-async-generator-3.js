'use strict';

async function* run() {
  await new Promise(resolve => setTimeout(resolve, 100));
  yield 'Hello';
  yield ('World');
}

const asyncIterator = run();

// The function doesn't start running until you call `next()`
asyncIterator.next().
  then(hello => console.log(hello)). // { value: 'Hello', done: false }
  then(() => { 
    asyncIterator.next().then(world => console.log(world))
  }).
  then(() => { 
    asyncIterator.next().then(final => console.log(final)) // { value: undefined, done: true }
  });  
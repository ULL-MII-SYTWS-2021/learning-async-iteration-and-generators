/*

Asynchronous iteration is needed when values come asynchronously: 
  after setTimeout or another kind of delay.

The most common case is that the object needs to make a network request 
to deliver the next value.

To make an object iterable asynchronously:

1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. The `next()` method should return a promise (to be fulfilled with the next value).
    - One way to do this is by using the `async` keyword: `async next()`.
3. To iterate over such an object, we can use a `for await (let item of iterable)` loop.
    - Note the `await` word.
*/

const range = {
    from: 2,
    to: 10,
    [Symbol.asyncIterator]() {
        return {
            current: this.from,
            last: this.to,
            next() {
                return new Promise(resolve => {
                    let aux = () => {
                        if (this.current <= this.last)
                            resolve({ done: false, value: this.current++ })
                        else
                            resolve({ done: true })

                    };
                    setTimeout(resolve => aux(resolve), 100)
                }); // (3)
            }
        }
    }
};


const doItManually = true;

if (doItManually) {
    /* Iterate manually.
     See: https://exploringjs.com/impatient-js/ch_async-iteration.html#using-async-iteration-directly
    */
    let asyncIterator = range[Symbol.asyncIterator]();
    function manually() {
        asyncIterator.next().then(r => {
            console.log(r);
            if (!r.done) manually();
        });
    }
    manually();
}
else {
    /* Iterate with for await loop */
    (async () => {
        for await (let val of range) {
            console.log(val);
        }
    })()
}


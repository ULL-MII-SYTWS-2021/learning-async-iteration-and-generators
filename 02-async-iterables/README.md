# Async Iterables

Asynchronous iteration is needed when values come asynchronously: after `setTimeout` or another kind of delay. 

To make an object iterable asynchronously:

1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. The `next()` method should return a promise (to be fulfilled with the next value).
3. To iterate over such an object, we can use a `for await (let item of iterable)` loop.


As a starting example, let's make an iterable `range` object, similar like the one before, but now it will return values asynchronously, one per second.

See file [hello-async-iterables-2.js](hello-async-iterables-2.js)


As we can see, the structure is similar to regular iterators:

1. To make an object asynchronously iterable, it must have a method `Symbol.asyncIterator` `(1)`.
2. This method must return the object with `next()` method returning a promise `(2)`.
3. The `next()` method doesn't have to be `async`, 
  - it may be a regular method returning a promise, but `async` allows us to use `await`, so that's convenient. 
  - Here we just delay for a second `(3)`.
4. To iterate, we use `for await(let value of range)` `(4)`,
  - namely add "await" after "for". 
  - It calls `range[Symbol.asyncIterator]()` once, and then its `next()` for values.

Here's a small table with the differences:

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| Object method to provide iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |
| to loop, use                          | `for..of`         | `for await..of` |

##  Iterating Explicitly

We don't have to make `async` the `next`method instead we can explictly return a promise.

We can also iterate explictly. 

See file 

[hello-async-iterables.js](hello-async-iterables.js)

We start calling the `range[Symbol.asyncIterator]()` 
method to create the async iterator.

After that, we can call it and get a promise. Of course, we  can use the  `.then`, `.catch` and `.finally` methods 
of the promise:

```js
let asyncIterator = range[Symbol.asyncIterator]();
    function manually() {
        asyncIterator.next().then(r => {
            console.log(r);
            if (!r.done) manually();
        });
    }
    manually();
```

## The spread syntax `...` doesn't work asynchronously

Features that require regular, synchronous iterators, don't work with asynchronous ones.

For instance, a spread syntax won't work:
```js
console.log( [...range] ); // Error, no Symbol.iterator
```

That's natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It's also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.

## See

* [Using Async Iteratkon Directly](https://exploringjs.com/impatient-js/ch_async-iteration.html#using-async-iteration-directly)
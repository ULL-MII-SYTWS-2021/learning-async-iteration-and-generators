# Async generators (finally)

For most practical applications, when we'd like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it, like this:

```js
async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    console.log(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
  }
})();
```

As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.

## Under-the-hood difference

Technically, if you're an advanced reader who remembers the details about generators, there's an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.

In a regular generator we'd use `result = generator.next()` to get values. In an async generator, we should add `await`, like this:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
That's why async generators work with `for await...of`.

See [hello-async-generator.js](hello-async-generator.js)

## You can also for await on sync iterables

See [for-await-with-sync.js](for-await-with-sync.js)

## Async iterable range

Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:

```js 
let range = {
  from: 1,
  to: 5,

  async *[Symbol.asyncIterator]() {
    for(let value = this.from; value <= this.to; value++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield value;
    }
  }
};

(async () => {
  for await (let value of range) {
    console.log(value); // 1, then 2, then 3, then 4, then 5
  }
})();
```

Now values come with a delay of 1 second between them.

Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the object, so it's both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.

In practice though, that would be a weird thing to do.



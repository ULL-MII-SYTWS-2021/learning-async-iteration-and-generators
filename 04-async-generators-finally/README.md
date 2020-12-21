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

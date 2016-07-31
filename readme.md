# `writev`

A concatenating `writev` function that forwards to `_write`, for use with
[Writable streams](https://nodejs.org/api/stream.html#stream_implementing_a_writable_stream).

## Installation

```sh
npm install --save writev
```

## Usage

```js
const writev = require('writev')
const { Writable } = require('streams')

const stream = new Writable({
  write (chunk, encoding, cb) {
    // ...
  }
})

stream._writev = writev
```

## API

### `writev(chunks, cb)`

Concatenate all chunks and call `this._write` with a buffer and the callback `cb`.

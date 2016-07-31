function toBuffer (chunk) {
  if (Buffer.isBuffer(chunk.chunk)) {
    return chunk.chunk
  } else {
    return new Buffer(chunk.chunk, chunk.encoding)
  }
}

function writev (chunks, cb) {
  var buffers = []

  for (var i = 0; i < chunks.length; i++) {
    buffers.push(toBuffer(chunks[i]))
  }

  return this._write(Buffer.concat(buffers), 'buffer', cb)
}

module.exports = writev

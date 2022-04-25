function* generatorFunction() {
  console.log('gen이 만들어졌다.');
  let a = yield;
  let b = yield;
  yield a + b;
}

const generator = generatorFunction();

const one = generator.next();
console.log(one);
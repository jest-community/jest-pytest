class Foobar {
  state = { yes: 1 }
}
const foo = async () => {
  const res = await Promise.resolve(new Foobar())
  return res
}
console.log('hello', { foo: foo() })

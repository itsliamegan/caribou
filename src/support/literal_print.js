export function literalPrint(object) {
  if (Array.isArray(object)) {
    return literalPrintArray(object)
  }

  if (object === undefined) {
    return "undefined"
  }

  if (object === null) {
    return "null"
  }

  switch (typeof object) {
    case "object": return literalPrintObject(object)
    case "string": return literalPrintString(object)
    case "number": return literalPrintNumber(object)
    case "boolean": return literalPrintBoolean(object)
  }
}

function literalPrintArray(array) {
  let elements = array.map(element => literalPrint(element))
  let joined = elements.join(", ")

  return `[${joined}]`
}

function literalPrintObject(object) {
  return object.toString()
}

function literalPrintString(string) {
  return `"${string}"`
}

function literalPrintNumber(number) {
  return number.toString()
}

function literalPrintBoolean(boolean) {
  return boolean.toString()
}

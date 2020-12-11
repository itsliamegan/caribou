export function literal_print(object) {
  if (Array.isArray(object)) {
    return literal_print_array(object)
  }

  if (object === undefined) {
    return "undefined"
  }

  if (object === null) {
    return "null"
  }

  switch (typeof object) {
    case "object": return literal_print_object(object)
    case "string": return literal_print_string(object)
    case "number": return literal_print_number(object)
    case "boolean": return literal_print_boolean(object)
  }
}

function literal_print_array(array) {
  let elements = array.map(element => literal_print(element))
  let joined = elements.join(", ")

  return `[${joined}]`
}

function literal_print_object(object) {
  return object.toString()
}

function literal_print_string(string) {
  return `"${string}"`
}

function literal_print_number(number) {
  return number.toString()
}

function literal_print_boolean(boolean) {
  return boolean.toString()
}

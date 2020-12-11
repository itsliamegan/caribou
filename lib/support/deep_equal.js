export function deepEqual(left, right) {
  if (areSameValue(left, right)) {
    return true
  }

  if (areDifferentTypes(left, right)) {
    return false
  }

  if (areEitherNull(left, right)) {
    return areSameValue(left, right)
  }

  if (areBothPrimitives(left, right)) {
    return arePrimitivesEqual(left, right)
  }

  if (areBothObjects(left, right)) {
    return areObjectsEqual(left, right)
  }

  return false
}

function areSameValue(left, right) {
  return Object.is(left, right)
}

function areDifferentTypes(left, right) {
  return typeof left != typeof right
}

function areEitherNull(left, right) {
  return left === null || right === null
}

function areBothPrimitives(left, right) {
  return typeof left != "object" && typeof right != "object"
}

function arePrimitivesEqual(left, right) {
  return areSameValue(left, right)
}

function areBothObjects(left, right) {
  return typeof left == "object" && typeof right == "object"
}

function areObjectsEqual(left, right) {
  for (let key of Object.keys(left)) {
    let leftValue = left[key]
    let rightValue = right[key]

    if (!deepEqual(leftValue, rightValue)) {
      return false
    }
  }

  for (let key of Object.keys(right)) {
    let leftValue = left[key]
    let rightValue = right[key]

    if (!deepEqual(rightValue, leftValue)) {
      return false
    }
  }

  return true
}

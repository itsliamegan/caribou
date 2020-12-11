export function deep_equal(left, right) {
  if (are_same_value(left, right)) {
    return true
  }

  if (are_different_types(left, right)) {
    return false
  }

  if (are_either_null(left, right)) {
    return are_same_value(left, right)
  }

  if (are_both_primitives(left, right)) {
    return are_primitives_equal(left, right)
  }

  if (are_both_objects(left, right)) {
    return are_objects_equal(left, right)
  }

  return false
}

function are_same_value(left, right) {
  return Object.is(left, right)
}

function are_different_types(left, right) {
  return typeof left != typeof right
}

function are_either_null(left, right) {
  return left === null || right === null
}

function are_both_primitives(left, right) {
  return typeof left != "object" && typeof right != "object"
}

function are_primitives_equal(left, right) {
  return are_same_value(left, right)
}

function are_both_objects(left, right) {
  return typeof left == "object" && typeof right == "object"
}

function are_objects_equal(left, right) {
  for (let key of Object.keys(left)) {
    let left_value = left[key]
    let right_value = right[key]

    if (!deep_equal(left_value, right_value)) {
      return false
    }
  }

  for (let key of Object.keys(right)) {
    let left_value = left[key]
    let right_value = right[key]

    if (!deep_equal(right_value, left_value)) {
      return false
    }
  }

  return true
}

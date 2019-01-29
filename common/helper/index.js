/**
 * true empty
 * @param  {Mixed} obj []
 * @return {Boolean}     []
 */
function isTrueEmpty (obj) {
  if (obj === undefined || obj === null || obj === '') return true
  if (exports.isNumber(obj) && isNaN(obj)) return true
  return false
}
exports.isTrueEmpty = isTrueEmpty

/**
 * check object is empty
 * @param  {[Mixed]}  obj []
 * @return {Boolean}     []
 */
function isEmpty (obj) {
  if (isTrueEmpty(obj)) return true
  if (exports.isRegExp(obj)) {
    return false
  } else if (exports.isDate(obj)) {
    return false
  } else if (exports.isError(obj)) {
    return false
  } else if (exports.isArray(obj)) {
    return obj.length === 0
  } else if (exports.isString(obj)) {
    return obj.length === 0
  } else if (exports.isNumber(obj)) {
    return obj === 0
  } else if (exports.isBoolean(obj)) {
    return !obj
  } else if (exports.isObject(obj)) {
    for (const key in obj) {
      return false && key // only for eslint
    }
    return true
  }
  return false
}
exports.isEmpty = isEmpty
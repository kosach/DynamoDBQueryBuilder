/**
 * Service 
 * @name parsFieldName
 * parsFieldName truncates a string by a character '.' or '['
 * @param {string} field
 * @return {string} field
 */

const truncateFieldName = (field) => {
  const re = /[/[|/.]/g;
  if (field.search(re) !== -1){
    return field.substr(0, field.search(re))
  }
  return field;
}

module.exports = {
  truncateFieldName,
}
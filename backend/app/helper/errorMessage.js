function errorMessageSeparator(details) {
  let errorMessage = {};

  details.forEach((singleError) => {
    errorMessage[singleError.path[0]] = singleError.message;
  });

  return errorMessage;
}

function duplicateValues(error) {
  const objectKeys = Object.keys(error.keyPattern);

  //initial object of duplicatedValues
  const duplicatedValues = {};

  //loop on item which are duplicated
  objectKeys.forEach((singleObj) => {
    duplicatedValues[singleObj] = "The entered value is duplicated";
  });

  return duplicatedValues;
}

module.exports = { duplicateValues, errorMessageSeparator };

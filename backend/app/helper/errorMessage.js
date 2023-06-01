function errorMessageSeparator(details) {
  let errorMessage = [];

  details.forEach((singleError) => {
    errorMessage.push(singleError.message);
  });

  return errorMessage;
}

function duplicateValues(error) {
  const objectKeys = Object.keys(error.keyPattern);

  return objectKeys.map((singleKey) => {
    return {
      [singleKey]: "The entered value is duplicated",
    };
  });
}

module.exports = { duplicateValues, errorMessageSeparator };

function capitalizeWords(inputString) {
  return inputString
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const generateErrorMessage = (error) => {
  let statusCode = 500;
  let errorMessage = error.message;

  if (error.code === 'ER_CON_COUNT_ERROR') {
    statusCode = 503;
    errorMessage = "Mohon maaf layanan sedang sibuk, silakan coba lagi nanti.";
  }

  return {
    statusCode,
    errorMessage
  };
};

module.exports = {
  capitalizeWords,
  generateErrorMessage
};

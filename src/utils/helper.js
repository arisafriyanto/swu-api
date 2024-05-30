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
    errorMessage = "Mohon maaf, sistem kami sedang sibuk saat ini. Silakan coba lagi dalam beberapa saat";
  }else if(error.code === "ECONNRESET") {
    statusCode = 504;
    errorMessage = "Mohon maaf, sistem kami sedang sibuk saat ini. Silakan coba lagi dalam beberapa saat";
  }else if(error.code === "ER_SERVER_SHUTDOWN"){
    statusCode = 500;
    errorMessage = "Mohon maaf, sistem kami sedang sibuk saat ini. Silakan coba lagi dalam beberapa saat";
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

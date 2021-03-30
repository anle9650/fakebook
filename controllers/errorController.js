const httpStatus = require("http-status-codes");

exports.pageNotFoundError = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    let errorMessage = errorCode + " | page not found."
    res.status(errorCode);
    res.render("error", {
        errorMessage: errorMessage
    });
};

exports.internalServerError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = errorCode + " | Sorry, our application is taking a nap!"
    console.log(`ERROR occurred: ${error.stack}`)
    res.status(errorCode);
    res.render("error", {
        errorMessage: errorMessage
    });
};
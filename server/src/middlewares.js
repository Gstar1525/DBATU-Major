const notFound = (req, res, next) => {
    const error = new Error(`Not Found 💩`);
    res.status(404);
    next(error);
};

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        success: false,
        message: error.message,
    });
};

module.exports = {
    notFound,
    errorHandler,
};
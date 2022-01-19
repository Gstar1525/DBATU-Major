const errorHandler = (error, req, res, next) => {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({
        success: false,
        message: error.message,
    });
};

module.exports = errorHandler;
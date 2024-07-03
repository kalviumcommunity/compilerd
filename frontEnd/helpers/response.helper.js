const respond = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};

const respondWithException = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = {
    respond,
    respondWithException,
};

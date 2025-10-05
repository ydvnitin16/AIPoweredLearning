function handleError(res, err) {
    console.error(err?.message || err);
    res.status(err?.status || 500).json({
        message: err.message || 'Server error, Please try again later.',
    });
}

function throwError(message, status) {
    const err = new Error(message);
    err.status = status;
    throw err;
}

export { handleError, throwError };

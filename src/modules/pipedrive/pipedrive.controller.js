import httpStatus from 'http-status-codes';

export const webhookPipedrive = async (req, res, next) => {
  try {
    const { body } = req;

    console.log(body);

    res.status(httpStatus.OK).json({ body });
  } catch (e) {
    next(e);
  }
};

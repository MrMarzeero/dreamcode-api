import { genData, HttpResponse } from '../interfaces';

export const ubadRequest = (message?: any): HttpResponse => {
  return {
    statusCode: 400,
    body: {
      status: 'Undefined Bad Request',
      error: message
    }
  }
}

export const badRequest = (err: Error): HttpResponse => {
    return {
      statusCode: 400,
      body: {
        status: 'Bad Request',
        error: {
          name: err.name,
          stack: err.stack,
          cause: err.cause,
          message: err.message,
        },
      },
  }
};

export const internalServerError = (err: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: {
      status: 'Internal Server Error',
      error: {
        name: err.name,
        stack: err.stack,
        cause: err.cause,
        message: err.message,
      },
    },
  };
};

export const uInternalServerError = (message?: String): HttpResponse => {
  return {
    statusCode: 500,
    body: {
      status: 'Undefined Internal Server Error',
      message
    },
  };
};

export const generationSuccess = (data: genData): HttpResponse => {
  return {
    statusCode: 201,
    body: {
      status: 'Created!',
      data: data,
    },
  };
};

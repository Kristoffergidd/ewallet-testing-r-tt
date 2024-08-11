import { http, HttpResponse } from 'msw';

const SUCCESS_RESULT = {
  Response: 'True',
  Message: 'New card created!',
};

const ERROR_RESULT = { Response: 'False', Message: 'Failed to create a new card!' };


export const handlers = [
  http.post('http://localhost/api/cards', ({ request }) => {
    if (request.body) {
      return HttpResponse.json(SUCCESS_RESULT, {
        status: 201,
      });
    }

    return HttpResponse.json(ERROR_RESULT, {
      status: 400,
    });
  }),
];
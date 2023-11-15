import Boom from '@hapi/boom';
import HttpStatusCodes from 'http-status-codes';
import {
  describe, expect, jest, it,
} from '@jest/globals';
import getFiltersHandler from '../../handlers/filters/getFiltersHandler.mjs';

// Mocks
const mockRequest = (params = {}) => ({
  params,
  container: {
    processService: {
      getFilters: jest.fn(),
    },
  },
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe('getFiltersHandler', () => {
  it('should handle successful request', async () => {
    const req = mockRequest({ id: 'someId' });
    const res = mockResponse();

    // Mock the successful response from the processService
    req.container.processService.getFilters.mockResolvedValue({ your: 'data' });

    await getFiltersHandler(req, res, mockNext);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ your: 'data' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle error and call next', async () => {
    const req = mockRequest({ id: 'someId' });
    const res = mockResponse();

    // Mock an error response from the processService
    req.container.processService.getFilters.mockRejectedValue(new Error('Some error'));

    await getFiltersHandler(req, res, mockNext);

    // Assertions
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

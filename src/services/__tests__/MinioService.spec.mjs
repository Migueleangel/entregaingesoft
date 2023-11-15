import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Boom from '@hapi/boom';
import {
  describe, expect, jest, it, beforeEach,
} from '@jest/globals';
import MinioService from '../MinioService.mjs'; // Asegúrate de ajustar la ruta correcta
import { BUCKET_NAME } from '../../commons/constants.mjs';

jest.mock('@aws-sdk/s3-request-presigner');

describe('MinioService', () => {
  let minioService;

  beforeEach(() => {
    minioService = new MinioService();
  });

  describe('saveImage', () => {
    it('should save an image successfully', async () => {
      const mockImage = {
        originalname: 'example.jpg',
        buffer: Buffer.from('mocked image content'),
      };

      const expectedKey = 'example.jpg';

      // Mock the S3Client's send method to simulate a successful image upload
      minioService.conn.send = jest.fn().mockResolvedValueOnce();

      // Call the saveImage method
      const result = await minioService.saveImage(mockImage);

      // Assertions
      expect(minioService.conn.send).toHaveBeenCalledWith(expect.any(PutObjectCommand));
      expect(minioService.conn.send.mock.calls[0][0].input.Bucket).toBe(BUCKET_NAME);
      expect(minioService.conn.send.mock.calls[0][0].input.Key).toBe(expectedKey);
      expect(minioService.conn.send.mock.calls[0][0].input.Body).toBe(mockImage.buffer);
      expect(result).toBe(expectedKey);
    });

    it('should throw an error for invalid image extension', async () => {
      const mockImage = {
        originalname: 'invalid.txt',
        buffer: Buffer.from('mocked image content'),
      };

      // Call the saveImage method and expect it to throw a Boom.badRequest error
      await expect(minioService.saveImage(mockImage)).rejects.toThrowError(Boom.badRequest('Invalid image extension'));
    });

    // Add more test cases as needed
  });

  describe('generateSignedUrl', () => {
    it('should throw an error for invalid image name', async () => {
      const mockImageName = 'invalid-name';

      // Mockear el método getSignedUrl para simular un error al obtener la URL firmada
      const error = new Error('Resolved credential object is not valid');
      jest.spyOn(minioService.conn, 'send').mockRejectedValueOnce(error);

      // Llamamos al método generateSignedUrl y esperamos que lance un error Boom.badRequest
      await expect(minioService.generateSignedUrl(mockImageName)).rejects.toThrowError(
        Boom.badRequest('Invalid image name'),
      );
    });
  });
});

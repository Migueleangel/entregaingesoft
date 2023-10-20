// ProcessRepository.test.mjs
import { Schema, model } from 'mongoose';
import ProcessModel from '../../models/Process.mjs';
import ProcessRepository from '../../repositories/ProcessRepository.mjs';
import {
    describe, it, expect, jest,
  } from '@jest/globals';

// Mock de mongoose y ProcessModel
jest.mock('mongoose');
jest.mock('../models/Process.mjs');

describe('ProcessRepository', () => {
  afterEach(() => {
    // Limpiar mocks después de cada prueba
    jest.clearAllMocks();
  });

  it('debería guardar un nuevo proceso correctamente', async () => {
    // Configurar el mock de ProcessModel
    const saveMock = jest.fn().mockResolvedValueOnce({});
    ProcessModel.mockImplementation(() => ({
      filters: undefined,
      save: saveMock,
    }));

    const processRepository = new ProcessRepository();
    const process = { filters: /* datos de prueba */ };

    const result = await processRepository.save(process);

    // Verificar que ProcessModel fue llamado con los datos correctos
    expect(ProcessModel).toHaveBeenCalledWith();

    // Verificar que los datos fueron asignados correctamente
    expect(result.filters).toEqual(process.filters);

    // Verificar que el método save fue llamado
    expect(saveMock).toHaveBeenCalled();
  });

  // Puedes agregar más pruebas según sea necesario
});

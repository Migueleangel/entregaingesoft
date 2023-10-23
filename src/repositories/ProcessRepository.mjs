import ProcessModel from '../models/Process.mjs';

class ProcessRepository {
  // eslint-disable-next-line class-methods-use-this
  async save(process) {
    const newProcess = new ProcessModel();
    newProcess.filters = process.filters;
    await newProcess.save();
    return newProcess;
  }

  // eslint-disable-next-line class-methods-use-this
  find(id) {
    const newProcess = ProcessModel.findById(id);
    return newProcess;
  }
}

export default ProcessRepository;

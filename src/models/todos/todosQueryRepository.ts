import TODOsModel from '../../database/collections/TODOs/todosSchema';

export default class TODOsQueryRepository {
  public getAll () {
    return TODOsModel.find();
  }

  public getById (id: string) {
    return TODOsModel.findById(id);
  }

  public getByUser (userId: string) {
    return TODOsModel.find({ userId });
  }
}
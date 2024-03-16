import { TODOsDocument } from '@/types/todos/todos';
import TODOsModel from '../../database/collections/TODOs/todosSchema';

export default class TODOsCommandRepository {
  public create (data: TODOsDocument) {
    return TODOsModel.create(data);
  }

  public update (id: string, data: TODOsDocument) {
    return TODOsModel.findByIdAndUpdate({ id }, data, { new: true });
  }

  public delete (id: string) {
    return TODOsModel.findByIdAndDelete({ id });
  }
}
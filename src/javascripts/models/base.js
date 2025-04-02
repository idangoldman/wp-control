import { uid } from 'radash'

export default class BaseModel {
  name = "base";

  static defaults = {
    id: null,
    changed_at: null,
  };

  static async all(defaultCollection = []) {
    console.log( 'all' )
    return (await chrome.storage.sync.get([this.name])) || defaultCollection;
  }

  static async find(id) {
    const models = await this.all();
    return models.find((m) => m.id === id)
  }

  async create(model) {
    const models = await this.all();

    model = {
      id: uid(),
      changed_at: new Date().toISOString(),
      ...model,
    };

    const collection = {
      [this.name]: [...models, model],
    };

    return await chrome.storage.sync.set(collection);
  }

  async change(model) {
    const models = await this.all();

    if (select(models, (f) => f.id).length) {
      const collection = {
        [this.name]: { ...models, ...model },
      };

      return await chrome.storage.sync.set(collection);
    }
  }

  async remove(model) {
    const models = await this.all();
    const modelIndex = models.findIndex((m) => m.id === model.id);

    if (modelIndex !== -1 && models.splice(modelIndex, 1).length) {
      const collection = {
        [this.name]: [...models],
      };

      return await chrome.storage.sync.set(collection);
    }
  }

  // find () {}
  // find_by () {}
  // where () {}
}

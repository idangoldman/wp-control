import BaseModel from '~/src/javascripts/models/base'
import Favicon from '~/src/javascripts/helpers/favicon'

export default class SiteModel extends BaseModel {
  name = "sites";

  static defaults = {
    favicon: null,
    label: null,
    url: null,
  };

  constructor(data) {
    super(data);
  }

  get favicon() {
    return new Favicon(this.url);
  }
}

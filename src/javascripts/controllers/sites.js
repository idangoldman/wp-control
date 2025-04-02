import { Controller } from '@hotwired/stimulus'
import Template from '~/src/javascripts/helpers/template'
import SiteModel from '~/src/javascripts/models/site'

export default class SitesController extends Controller {
  async connect () {
    await this.index()
  }

  async index () {
    await Template.render(
      "/templates/sites",
      SiteModel.all,
      this.element.querySelector(".page--main"),
    );
    // await Template.render( this.element.querySelector( '.page--list ul' ), '/templates/sites/list-item', SiteModel.all )
  }

  async create () {
    await Template.render(
      "/templates/sites_list_item_new",
      {},
      this.element.querySelector(".page--main .page--list ul")
    );

      // element
      //   .select(".page--main .page--list ul")
      //   .render("/templates/sites_list_item_new", SiteModel.all);
  }

  edit () {
    console.log( 'EDIT' )
  }

  remove () {
    console.log( 'REMOVE' )
  }
}

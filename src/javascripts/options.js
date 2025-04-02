import { Application } from '@hotwired/stimulus'
import SitesController from '~/src/javascripts/controllers/sites'

const Stimulus = window.Stimulus = Application.start()
Stimulus.register( 'sites', SitesController )

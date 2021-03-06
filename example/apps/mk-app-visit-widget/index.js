import config from './config'
import * as data from './data'

export default {
	name: "mk-app-visit-widget",
	version: "1.0.1",
	description: "mk-app-visit-widget",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-visit-widget")
	}
}
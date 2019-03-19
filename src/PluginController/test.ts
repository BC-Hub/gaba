import PluginController from './index';
const fs = require('fs')
const path = require('path')
const samplePluginSrc = fs.readFileSync(path.join(__dirname, 'sample-plugin.js')).toString()

describe('PluginController', () => {
	it('should set default state', () => {
		const controller = new PluginController();
		expect(controller.state).toEqual({ plugins: [] });
	});

	it('should allow adding a new plugin by script', () => {
    const controller = new PluginController();
    const pluginName = 'foo'

    controller.addPlugin({
      pluginName,
      source: samplePluginSrc,
    });

		expect(controller.state).toEqual({ plugins: [{ pluginName, source: samplePluginSrc }] });
	});

});

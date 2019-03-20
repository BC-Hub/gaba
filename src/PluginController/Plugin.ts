import BaseController, { BaseConfig, BaseState } from '../BaseController';
const { SES } = require('ses')

/**
 * @type PluginOpts
 *
 * Plugin options, used to initialize a plugin. 
 *
 * @property name - Nickname associated with this plugin. 
 * @property source - The source code of the plugin.
 * @property rootRealm - a SES root realm, used to safely eval the plugin source.
 */
export interface PluginOpts {
	pluginName: string;
  rootRealm: object;
  source: string;
  permissions: object;
}

/**
 * @type PluginState
 *
 * A live instance of a plugin running.
 *
 * @property serializedPlugins - Array of contact entry objects
 */
export interface PluginState extends BaseState {
	serializedPlugins: PluginOpts[];
}

/**
 * @type Plugin
 * 
 * A live instance of an installed plugin.
 *
 * 
 */
class Plugin extends BaseController<BaseConfig, PluginOpts> {
  name = 'Plugin-BaseClass';

	/**
	 * Creates an Plugin instance
	 *
	 * @param config - Initial options used to configure this controller
	 * @param state - Initial state to set on this controller
	 */
  constructor(config?: Partial<PluginOpts>, state?: Partial<PluginState>) {
		super(config, state);
    name = 'Plugin-' + (config.pluginName);
    source = config.source;
    this.defaultState = { source };
    this.module = config.rootRealm.evaluate(source, permissions)
    this.initialize();
  }

  

}


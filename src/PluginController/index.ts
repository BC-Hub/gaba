import BaseController, { BaseConfig, BaseState } from '../BaseController';
import { PluginOpts, PluginState, Plugin } from './Plugin';
const { SES } = require('ses')

/**
 * Controller that manages a list of recipient addresses associated with nicknames
 */
export class PluginController extends BaseController<BaseConfig, PluginState> {
	private plugins = new Map<string, Plugin>();

	/**
	 * Name of this controller used during composition
	 */
	name = 'PluginController';

	/**
	 * Creates an PluginController instance
	 *
	 * @param config - Initial options used to configure this controller
	 * @param state - Initial state to set on this controller
	 */
	constructor(config?: Partial<BaseConfig>, state?: Partial<PluginState>) {
		super(config, state);
		this.defaultState = { serializedPlugins: [] };
    this.rootRealm = SES.makeSESRootRealm({});
    this.initialize();
	}

	/**
	 * Remove all plugin entries
	 */
	clear() {
		this.serializedPlugins.clear();
		this.update({ serializedPlugins: Array.from(this.serializedPlugins.values()) });
	}

	/**
	 * Remove a plugin entry by address
	 *
	 * @param address - Recipient address to delete
	 */
	delete(pluginName: string) {
    this.serializedPlugins.delete(pluginName);
    this.plugins.delete(pluginName)
		this.update({ serializedPlugins: Array.from(this.serializedPlugins.values()) });
	}

	/**
	 * Add or update a contact entry by address
	 *
	 * @param address - Recipient address to add or update
	 * @param name - Nickname to associate with this address
	 */
  addPlugin(pluginOpts: PluginOpts) {
    const { pluginName } = pluginOpts
    this.serializedPlugins.set(pluginName, pluginOpts);
    this.update({ serializedPlugins: Array.from(this.serializedPlugins.values()) });
    const plugin = new Plugin(pluginOpts)
    this.plugins.set(pluginName, plugin)
	}
}

export default PluginController;

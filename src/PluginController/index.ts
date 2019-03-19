import BaseController, { BaseConfig, BaseState } from '../BaseController';

/**
 * @type Plugin
 *
 * Plugin representation
 *
 * @property name - Nickname associated with this plugin. 
 * @property source - The source code of the plugin.
 */
export interface Plugin {
	pluginName: string;
	source: string;
}

/**
 * @type AddressBookState
 *
 * Address book controller state
 *
 * @property addressBook - Array of contact entry objects
 */
export interface AddressBookState extends BaseState {
	addressBook: Plugin[];
}

/**
 * Controller that manages a list of recipient addresses associated with nicknames
 */
export class AddressBookController extends BaseController<BaseConfig, AddressBookState> {
	private addressBook = new Map<string, Plugin>();

	/**
	 * Name of this controller used during composition
	 */
	name = 'AddressBookController';

	/**
	 * Creates an AddressBookController instance
	 *
	 * @param config - Initial options used to configure this controller
	 * @param state - Initial state to set on this controller
	 */
	constructor(config?: Partial<BaseConfig>, state?: Partial<AddressBookState>) {
		super(config, state);
		this.defaultState = { addressBook: [] };
		this.initialize();
	}

	/**
	 * Remove all contract entries
	 */
	clear() {
		this.addressBook.clear();
		this.update({ addressBook: Array.from(this.addressBook.values()) });
	}

	/**
	 * Remove a contract entry by address
	 *
	 * @param address - Recipient address to delete
	 */
	delete(address: string) {
		this.addressBook.delete(address);
		this.update({ addressBook: Array.from(this.addressBook.values()) });
	}

	/**
	 * Add or update a contact entry by address
	 *
	 * @param address - Recipient address to add or update
	 * @param name - Nickname to associate with this address
	 */
	set(address: string, name: string) {
		this.addressBook.set(address, { address, name });
		this.update({ addressBook: Array.from(this.addressBook.values()) });
	}
}

export default AddressBookController;

class component_construct {
	constructor() {
		this.menuBOOL = false;
		this.buttonBOOL = false;

		this.data = {
			type: 1,
			components: [],
		};
	}

	get output() {
		return this.data;
	}

	menu(menudata) {
		if (!menudata) return 'No information.';

		if (this.buttonBOOL) return this;
		this.menuBOOL = true;

		let menu_info = {
			custom_id: menudata.custom_id,
			placeholder: menudata.place_holder,
			min_values: menudata.min_val,
			max_values: menudata.max_val,
			options: [],
			type: 3,
		};

		this.data.components.push(menu_info);

		return this;
	}

	entry(entrydata) {
		if (!entrydata) return 'No information.';

		if (entrydata.emoji) {
			var entry_info = {
				label: entrydata.label,
				value: entrydata.value,
				description: entrydata.description,
				default: entrydata.default,
				emoji: { name: entrydata.emoji.name, id: entrydata.emoji.id, animated: entrydata.emoji.boolean },
			};
		} else {
			var entry_info = {
				label: entrydata.label,
				value: entrydata.value,
				description: entrydata.description,
				default: entrydata.default,
			};
		}

		if (!entrydata.emoji) delete entry_info['emoji'];
		if (entrydata.emoji) {
			if (!entrydata.emoji.name) delete entry_info.emoji['name'];
			if (!entrydata.emoji.id) delete entry_info.emoji['id'];
			if (!entrydata.emoji.animated) delete entry_info.emoji['animated'];
		}
		if (!entrydata.default) delete entry_info['default'];
		if (!entrydata.description) delete entry_info['description'];
		if (!entrydata.value) delete entry_info['value'];
		if (!entrydata.label) delete entry_info['label'];
		if (this.data.components[0] && this.data.components[0].options) this.data.components[0].options.push(entry_info);

		return this;
	}

	button(buttondata) {
		if (this.menuBOOL) return this;
		this.buttonBOOL = true;

		if (buttondata.emoji) {
			var button_info = {
				label: buttondata.label,
				custom_id: buttondata.custom_id,
				style: buttondata.style,
				disabled: buttondata.disabled,
				url: buttondata.url,
				emoji: { name: buttondata.emoji.name, id: buttondata.emoji.id, animated: buttondata.emoji.boolean },
				type: 2,
			};

			if (!buttondata.emoji.id) delete button_info.emoji['id'];
			if (!buttondata.emoji.name) delete button_info.emoji['name'];
			if (!buttondata.emoji.animated) delete button_info.emoji['animated'];
		} else {
			var button_info = {
				label: buttondata.label,
				custom_id: buttondata.custom_id,
				style: buttondata.style,
				disabled: buttondata.disabled,
				url: buttondata.url,
				type: 2,
			};
		}

		if (!buttondata.label) delete button_info['label'];
		if (!buttondata.custom_id) delete button_info['custom_id'];
		if (!buttondata.style) delete button_info['style'];
		if (!buttondata.disabled) delete button_info['disabled'];
		if (!buttondata.url) delete button_info['url'];

		this.data.components.push(button_info);

		return this;
	}
}

module.exports = component_construct;

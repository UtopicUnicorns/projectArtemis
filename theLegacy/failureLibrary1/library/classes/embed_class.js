class embed_construct {
	constructor() {
		this.data = {
			title: '',
			description: '',
			color: 0xff0000,
			fields: [],
			timestamp: '',
			image: {
				url: '',
				proxy_url: '',
				height: 40,
				width: 40,
			},
			thumbnail: {
				url: '',
				proxy_url: '',
				height: 50,
				width: 50,
			},
			author: {
				name: '',
				url: '',
				icon_url: '',
				proxy_icon_url: '',
			},
			footer: {
				text: '',
				icon_url: '',
				proxy_icon_url: '',
			},
			url: '',
		};
	}

	get output() {
		if (!this.data.image.url) delete this.data['image'];
		if (!this.data.thumbnail.url) delete this.data['thumbnail'];
		if (!this.data.author.name) delete this.data['author'];
		if (!this.data.footer.text) delete this.data['footer'];
		if (!this.data.url) delete this.data['url'];
		if (!this.data.title) delete this.data['title'];
		if (!this.data.description) delete this.data['description'];
		if (!this.data.timestamp) delete this.data['timestamp'];
		if (!this.data.fields) delete this.data['fields'];

		return this.data;
	}

	field(name, value, inline) {
		this.data.fields.push({
			name: name || '',
			value: value || '',
			inline: inline || false,
		});

		return this;
	}

	description(desc) {
		this.data.description = desc || '';

		return this;
	}

	title(title) {
		this.data.title = title || '';

		return this;
	}

	timestamp(time) {
		this.data.timestamp = time || new Date();

		return this;
	}

	color(color) {
		this.data.color = parseInt(`0x${color}`) || 0;

		return this;
	}

	author(name, icon, url, proxy) {
		this.data.author.name = name || '';
		this.data.author.icon_url = icon || '';
		this.data.author.url = url || '';
		this.data.author.proxy_icon_url = proxy || '';

		return this;
	}

	footer(text, icon, proxy) {
		this.data.footer.text = text || '';
		this.data.footer.icon_url = icon || '';
		this.data.footer.proxy_icon_url = proxy || '';

		return this;
	}

	url(url) {
		this.data.url = url || '';

		return this;
	}

	thumbnail(url, width, height, proxy) {
		this.data.thumbnail.url = url || '';
		this.data.thumbnail.width = width || 10;
		this.data.thumbnail.height = height || 10;
		this.data.thumbnail.proxy_url = proxy || '';

		return this;
	}

	image(url, width, height, proxy) {
		this.data.image.url = url || '';
		this.data.image.width = width || 10;
		this.data.image.height = height || 10;
		this.data.image.proxy_url = proxy || '';

		return this;
	}
}

module.exports = embed_construct;

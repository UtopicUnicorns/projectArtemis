module.exports = (fields, boundary) => {
	let body = '';
	//console.log(fields);

	if (!boundary) boundary = module.exports.generateBoundary();
	else if (typeof boundary !== 'string') throw new TypeError('`boundary` parameter should be a string.');


	if (fields && fields.constructor === Object) {
		for (let fieldName in fields) {
			let fieldData = fields[fieldName];

			if (Array.isArray(fieldData)) fieldName += '[]';
			else fieldData = [fieldData];

			if (!fieldData.length) fieldData = [null];

			fieldData.forEach(field => {
				if (field && field.constructor === Object) {
					body += `--${boundary}\r\n`;
					body += `Content-Disposition: form-data; name="${fieldName}"; filename="${field.name}"\r\n`;
					body += `Content-Type: ${field.type}\r\n\r\n`;
					body += `IMAGEBUFFER\r\n`;
				} else if (typeof field === 'string') {
					body += `--${boundary}\r\n`;
					body += `Content-Disposition: form-data; name="${fieldName}"\r\n\r\n`;
					body += `${field}\r\n`;
				} else throw new TypeError(`\`fields.${fieldName}\` is an unsupported type, should be an object, string, or an array that contains those two types.`);
			});
		}

		if (body.length) body += `--${boundary}--\r\n`;
	} else throw new TypeError('`fields` parameter is required and should be an object.');


	return body;
};

module.exports.generateBoundary = () => {
	let boundary = '--------------------------';
	for (let i = 0; i < 24; i++) boundary += Math.floor(Math.random() * 10).toString(16);

	return boundary;
};

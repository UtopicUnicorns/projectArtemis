class time_construct {
	discord(time) {
		if (!time) var time = ~~(Date.now() / 1000);

		return {
			d: `<t:${time}:d>`,
			df: `<t:${time}:D>`,
			t: `<t:${time}:t>`,
			tf: `<t:${time}:T>`,
			dt: `<t:${time}:f>`,
			dtf: `<t:${time}:F>`,
			s: `<t:${time}:R>`,
		};
	}

	date() {
		const dName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const mName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const d = new Date();
		const dayNum = d.getDay();
		const day = d.getDate();
		let postfix = '';

		switch (day) {
			case 1 || 21 || 31:
				postfix = 'st';
				break;

			case 2 || 22:
				postfix = 'nd';
				break;

			case 3 || 23:
				postfix = 'rd';
				break;

			default:
				postfix = 'th';
				break;
		}

		var month = d.getMonth();
		var year = d.getFullYear();

		return {
			nice: `${dName[dayNum]} ${day}${postfix} ${mName[month]} ${year}`,
			iso: `${year}/${month + 1}/${day}`,
			eur: `${day}/${month + 1}/${year}`,
			us: `${month + 1}/${day}/${year}`,
			ugly: `${new Date().toString()}`,
		};
	}

	clock() {
		const dTime = new Date();
		const eu = dTime.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
		const us = dTime.toLocaleString([], { hour: 'numeric', minute: 'numeric', second: '2-digit', hour12: true });

		return {
			eu: eu,
			us: us,
		};
	}

	stamp() {
		return ~~(Date.now() / 1000);
	}
}

module.exports = time_construct;

const delay = x => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(true);
	}, x*1000)
});

module.exports = {
	delay
}
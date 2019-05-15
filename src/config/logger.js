const tracer = require('tracer');

let logger = () => {
		let publicAPI = {
			getLogger : function() {
				return tracer.colorConsole();
			}
		};
		return publicAPI;
};

module.exports = logger;

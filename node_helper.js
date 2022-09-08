var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-Oelpreise helper started...');
	},

	getJson: function (url) {
		var self = this;
		console.log("MMM-Oelpreise getJson url: " + url);

		request({ url: url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(body);
				// Send the json data back with the url to distinguish it on the receiving part
				self.sendSocketNotification("MMM-Oelpreise_JSON_RESULT", {url: url, data: json});
				console.log("MMM-Oelpreise request was succesfull");
			}
			else {
				console.log("MMM-Oelpreise request had error", error, response);
			}
		});
	},

	socketNotificationReceived: function (notification, url) {
		console.log(notification);
		if (notification === "MMM-Oelpreise_GET_JSON") {
			console.log("MMM-Oelpreise_GET_JSON received for url: " + url);
			this.getJson(url);
		}
	}
});
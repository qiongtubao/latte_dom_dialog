(function() {
	this.before = function(data, dom, controller) {
		var dialogName = dom.attr("latte-dialog");
		if(dialogName) {
			var handle = require("./dialog/"+dialogName+"/index.js");
			handle.create(data, dom, controller);
		}
	}
}).call(module.exports);
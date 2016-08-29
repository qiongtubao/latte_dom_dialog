(function() {
	/**
		动画还无法播放的问题
	*/
	var View = require("../../../../v/view.js");
	this.create = function(data, dom, controller) {
		var dataName = dom.attr("latte-dialog-data");
		if(dataName) {
				var child = dom.children[0];
				dom.removeChild(child);
					var dialogDom = document.createElement("div");
					var dialog = View.create(dialogDom);
					dom.classed({
						"latte-staticDialog": 1,
						"ease-fade": 1
					});
					dialog.classed("dialog", 1);

					dialog.appendChild(child);
				
				dom.appendChild(dialogDom);
				
				var Controller = require("../../../controller.js");
				var change = function(now, old) {
					Controller.remove(dialogDom, old);
					var nowc =Controller.create(dialogDom, now);
						var showBackDrop = function(showValue) {
							var backdrop = require("../backdrop.js");
							if(showValue) {
								backdrop.show();

								dom.style("display", "block");
								setTimeout(function() {
									dom.classed("in", 1);
								},1);
								
							}else{
								backdrop.hide();
								dom.style("display", "none");
								dom.classed("in", 0);
							}
						}
					showBackDrop(now.get("show"));
					nowc.bind("data", "show", showBackDrop);
				};
				change(data.get(dataName));
			controller.on("data", dataName, change);
		}
	}
	require("latte_dom/utils/css.js").importCssString(require("./index.css"), "latte_dialog_static_css");
}).call(module.exports);
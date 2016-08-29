(function() {
	var backdrop;
	var View = require("../../../v/view.js");
	var createBackDrop = function() {
		var backdropDom = document.createElement("div");
		backdrop = View.create(backdropDom);
		backdrop.classed({
			"latte-backdrop": 1,
			"ease-fade": 1
		});
		document.body.appendChild(backdropDom);
	};
	/**
		暂时还没设计成多种变化状态
	*/
	this.show = function() {
		if(!backdrop) {
			createBackDrop();
		}
		backdrop.style("display", "block");
		//这里需要让它之行css3的动画
		backdrop.classed("in", 1);
		return ++self.zIndex;
	}
	this.hide = function() {
		backdrop.style("display", "none");
		backdrop.classed("in", 0);
	}
	this.zIndex = 1040;
	createBackDrop();
	require("latte_dom/utils/css.js").importCssString(require("./backdrop.css"), "latte_dialog_backdrop_css");
	
}).call(module.exports);
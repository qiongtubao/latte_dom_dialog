
(function(define) {'use strict'
	define("latte_dom/c/commands/dialog/backdrop.css", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		module.exports='.latte-backdrop {    position: fixed;    top: 0;    right: 0;    bottom: 0;    left: 0;    z-index: 1040;    background-color: #000;}.ease-fade {    opacity: 0;    -webkit-transition: opacity .15s linear;    -o-transition: opacity .15s linear;    transition: opacity .15s linear;}.latte-backdrop.ease-fade {    filter: alpha(opacity=0);    opacity: 0;}.latte-backdrop.in {    filter: alpha(opacity=50);    opacity: .5;}'
 	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/dialog/backdrop.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
	define("latte_dom/c/commands/dialog/static/index.css", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		module.exports='.latte-staticDialog {    position: fixed;    top: 0;    right: 0;    bottom: 0;    left: 0;    z-index: 1050;    display: none;    overflow: hidden;    -webkit-overflow-scrolling: touch;    outline: 0;    overflow-x: hidden;    overflow-y: auto;}.ease-fade {	opacity: 0;    -webkit-transition: opacity .15s linear;    -o-transition: opacity .15s linear;    transition: opacity .15s linear;}.latte-staticDialog.ease-fade.in {	opacity: 1;}.ease-fade .dialog {    -webkit-transition: -webkit-transform .3s ease-out;    -o-transition: -o-transform .3s ease-out;    transition: transform .3s ease-out;    -webkit-transform: translate(0,-25%);    -ms-transform: translate(0,-25%);    -o-transform: translate(0,-25%);    transform: translate(0,-25%);}'
 	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/dialog/static/index.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/dialog/timer/index.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	this.create = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/dialog.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	this.before = function(data, dom, controller) {
		var dialogName = dom.attr("latte-dialog");
		if(dialogName) {
			var handle = require("./dialog/"+dialogName+"/index.js");
			handle.create(data, dom, controller);
		}
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
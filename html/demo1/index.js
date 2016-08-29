var latte_lib = latte.require("latte_lib");
  var latte_dom = latte.require("latte_dom");
  var data = latte_lib.object.create({
      show: function() {
      	
      	data.set("dialog.show", 1);
      },
      dialog: {
      	show: 0,
      	close: function() {
      		this.set("show", 0);
      	}
      }
  });
  
  var demo = latte_dom.define("demo", data);
$(document).ready(function(){
	var allExplosive = [];

    function writeDOM(){
        var domString = "";
        for(var i=0; i<allExplosive.length; i++) {
    		if (allExplosive[i].name !== undefined) {
            domString += `<h1>${allExplosive[i].name}</h1>`;
	        }
        }
	    $.each (allExplosive, function (index,value) {
	    	$.each (value, function (index2, value2){
	    		if (value2.name !== undefined) {
	    			// console.log(value2.name, index);
	    		domString += `<h1>${value2.name}</h1>`;
		    	}
	    	});
	    });
        $("#promises").append(domString);
	}

	var categoriesJSON = function() {
		return new Promise(function(resolve, reject) {
			$.ajax("./db/categories.JSON").done(function(data1){
				resolve(data1.categories);
			}).fail(function(error1){
				reject(error1);
			});
		});
	};

	var typesJSON = function() {
		return new Promise(function(resolve, reject) {
			$.ajax("./db/types.JSON").done(function(data2){
				resolve(data2.types);
				// console.log(data2.types);
			}).fail(function(error2){
				reject(error2);
			});
		});
	};

	var productsJSON = function() {
		return new Promise(function(resolve, reject) {
			$.ajax("./db/products.JSON").done(function(data3){
				resolve(data3.products);
				// console.log(data3.products);
			}).fail(function(error3){
				reject(error3);
			});
		});
	};

    Promise.all([categoriesJSON(), typesJSON(), productsJSON()])
        .then(function(info){
            console.log("info", info);
            info.forEach(function(ajaxCalls){
                ajaxCalls.forEach(function(bangs){
                    allExplosive.push(bangs);
                });
            });
            writeDOM();
        });	
});


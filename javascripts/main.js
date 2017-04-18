$(document).ready(function(){
	var allExplosive = [];

    function createDropdownList(){
        for(var i=0; i<allExplosive.length; i++) {
        	if (allExplosive[i].category === undefined && allExplosive[i].name !== undefined ) {
	    	$('.dropdown-menu').append(`<li value="${allExplosive[i].id}"><p>${allExplosive[i].name}</p></li>`);
		    }
		}
	}
    		
	    function writeDOM(cat ,catName){
		var domString = "";
		domString += `<div class="row">`
		domString += `<div class="col-md-12 categories">`
		domString += `<div class="table-responsive">`
		domString += `<table class="table">`
		domString += `<th>${catName}</th>`
		domString += `</table></div></div></div>`
		domString += `<div class="row">`

        for(var i=0; i<allExplosive.length; i++) {
    		if (allExplosive[i].name !== undefined && allExplosive[i].category === cat) {
			domString += `<div class="col-md-4">`
			domString += `<div class="table-responsive">`
			domString += `<table class="table products">`
    		domString += `<tr>`
			domString += `<th><h2> ${allExplosive[i].name}</h2></th>`
			domString += `</tr>`
		    $.each (allExplosive, function (index,value) {
		    	$.each (value, function (index2, value2){
		    		if (value2.name !== undefined && value2.type === allExplosive[i].id) {
					domString += `<tr>`
					domString += `<td><h3>${value2.name}</h3></td>`
					domString += `</tr>`
			    	}
		    	});
		    });
        }
	        
		domString += `</table>`
		domString += `</div></div>`
        }
        
		domString += `</div>`
        $("#promises").html(domString);
	}

	$('.dropdown-menu').on('click', 'li', function(e) {
	var btnVal = ($(this).val());
	var btnCat = ($(this).text());
	console.log(btnCat);
	writeDOM(btnVal, btnCat);

	});




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
            info.forEach(function(ajaxCalls){
                ajaxCalls.forEach(function(bangs){
                    allExplosive.push(bangs);
                });
            });
            console.log(allExplosive);
            createDropdownList();
        });	
});


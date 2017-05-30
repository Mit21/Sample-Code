$(document).ready(
		function() {
			var products = [];
			$.getJSON("data.json", function(result) {
				// SON.parse(result.ProductsList);
				products = result.ProductsList;
				console.log(products);
				var i;
				var productLength = products.length;
				var str = "";
				for (i = 0; i < productLength; i++) {
					var prodImage = "<img style='float:left' src=" + products[i].imageURLs.lg
							+ ">";
					var prodDesc = "<div style='float:left;'>"
							+ products[i].ProductInfo.p_product_description
							+ "</div>";
						var prodPrice = "<div id='price' style='font-size:25px;' price="+ products[i].ProductInfo.p_product_price +"> $"
							+ products[i].ProductInfo.p_product_price
							+ ".00</div>";
					
					var spec='<div id="specs" style="display:none;"><ul style="float:left;"><li>'+ products[i].ProductInfo.p_product_specs.Value[30].Key +'</li><li>'+products[i].ProductInfo.p_product_specs.Value[15].Key+'</li><li>'+products[i].ProductInfo.p_product_specs.Value[40].Key+'</li></ul></div>';
					str += '<div class="col-sm-3 cubes">' + prodImage + prodDesc
					 + spec + prodPrice +'<button type="button" id="btn" class="btn btn-default btnModel" price='+ products[i].ProductInfo.p_product_price + ' style="width:170px;height:40px;margin-top:5px;">View More</button></div>'
					
				}
				$("#prodRow").html(str);

			});
			$("#prodRow").on("mouseenter",".cubes", function(){
				var x=$(this).html();
				x=x.toString();
				$("#hero").html(x);
				$("#specs").show();
				$("#btn").html("Add to Cart");
				$("#btn").click(function(){
					alert($(this).attr('price'));
				});
				
			});
			
		});
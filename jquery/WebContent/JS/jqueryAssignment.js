$(document).ready(function () {
		  $.getJSON('data.json', function (data) {
		    console.log(data.ProductsList);
			    for (var i = 0; i < data.ProductsList.length; i++) {
			    var row = $("<tr />")
			    $(".jsonTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
			    row.append($("<td>" + data.ProductsList[i].name + "</td>"));
			    row.append($("<td>" + data.ProductsList[i].date + "</td>"));
			    row.append($("<td>" + data.ProductsList[i].assigned + "</td>"));
			    }
		  
		  
		  $("#btnSubmit").click(function(){
				var a=$("#taskname").val();
				var b=$("#date").val();
				var c=$("#assigned").val();
				var addrow = $("<tr />")
				addrow.append($("<td>" +a + "</td>"));
				addrow.append($("<td>" +b + "</td>"));
				addrow.append($("<td>" +c + "</td>"));
				$(".jsonTable").append(addrow);
			})
		  });
})

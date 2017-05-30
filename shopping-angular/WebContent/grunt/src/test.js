  var app = angular.module("shopApp",['ngRoute','ngDialog','ngAnimate']);

   app.config(function($routeProvider)
    {
	$routeProvider
	.when("/",
			 {
						templateUrl : 'landingView.html',
						controller : 'fCtrl'
					})
	.when("/Home",
			 {
						templateUrl : 'landingView.html',
						controller : 'fCtrl'
					})
	
	.when("/Location",
	{
				templateUrl : 'location.html',
				controller : 'locationCtrl'
			})
    .when("/Mobile",
	{
		templateUrl : 'phoneView.html',
		controller : 'phoneController'
	})

	.when("/Computer",
	{
		templateUrl : 'computer.html',
		controller : 'computerController'
	})

	.when("/tablet",
	{
		templateUrl : 'tablets.html',
		controller : 'tabletController'
	})

	.when("/accessories",
	{
		templateUrl : 'accessories.html',
		controller : 'accessoriesController'
	})

	.when("/wishList",
	{
		templateUrl : 'wishList.html',
		controller : 'wishListCtrl'
	})
	.when("/shoppingBag",
	{
		templateUrl : 'shoppingBag.html',
		controller : 'shoppingBagCtrl'
	});
/*	.otherwise({
		rediractTo:"/Home" 
	});*/
	
});
app.factory('shopFactory',function($http)
		{
	return {
		getTabletData:function(callback){
			$http.get("JSON/tablets.json").success(callback);
		},
		getPhoneData:function(callback){
			$http.get("JSON/phone.json").success(callback);
		},
		getComputerData:function(callback){
			$http.get("JSON/computer.json").success(callback);
		},
		getAccessoriesData:function(callback){
			$http.get("JSON/accessories.json").success(callback);
		},
		getLocationData:function(callback){
			$http.get("JSON/Location.json").success(callback);
		}
	};
	});

app.controller("fCtrl",function(shopFactory,$scope)
		{
		
			$scope.purchasedArr =
			[];
			$scope.wishListArr =
			[];
			$scope.images1 =
			[ 'images/slider1.jpg', 'images/slider2.jpg', 'images/slider3.jpg','images/laptop3.jpg' ],

			$scope.setActive = function(type)
			{
				$scope.HomeActive = "";
				$scope.MobileActive = "";
				$scope.ComputerActive = "";
				$scope.tabletActive = "";
				$scope.accessoriesActive = "";	
				$scope.LocationActive = "";
				$scope[type + 'Active'] = 'active';
			};
			$scope.setActive('Home');
			$scope.list =
			[ 'Home', 'Mobile', 'Computer', 'tablet', 'accessories','Location' ];
			$scope.subList = "";
			$scope.mobileList =
			[ 'Iphone', 'Galexi', 'Samsung', 'Nokia' ];
			$scope.computer =
			[ 'Mac', 'Windows', 'Linux' ];
			$scope.tablet =
			[ 'Ipad', 'Surface', 'note', 'notepad' ];
			$scope.accessories =
			[ 'one', 'two', 'three', 'four' ];
			//$scope.About =[ 'Support', 'Training', 'Help', 'Friendship' ];
			$scope.Location =
			[ 'Address'];
			$scope.buttonClick = function(a)
			{
				
			/*	if(a == "Home")
					$scope.subList="";
				if (a == "Mobile")
					$scope.subList = $scope.mobileList;
				if (a == "Computer")
					$scope.subList = $scope.computer;
				if (a == "tablet")
					$scope.subList = $scope.tablet;
				if (a == "accessories")
					$scope.subList = $scope.accessories;
				if (a == "About")
					$scope.subList = $scope.About;
				if (a == "Location")
					$scope.subList = $scope.location;*/
			};
				
						
			$scope.shoppingBagLen=0;
			$scope.wishListLen=0;
			$scope.addToCartCommon = function(pItem)
			{
				$scope.purchasedArr.push(pItem);
				$scope.shoppingBagLen=$scope.purchasedArr.length;
				$scope.calculatePrice();

			};
			$scope.addToWishListCommon = function(pItem)
			{
				$scope.wishListArr.push(pItem);
				$scope.wishListLen=$scope.wishListArr.length;
			};
			$scope.calculatePrice=function()
			{
				$scope.total=0;
				for(var i=0;i<$scope.purchasedArr.length;i++)
					{
					$scope.total=$scope.total+$scope.purchasedArr[i].price;
					}
			};
			$scope.calculatePrice();
			
			$scope.remove = function(uitem)
			{
				var index = $scope.purchasedArr.indexOf(uitem);
				$scope.purchasedArr.splice(index, 1);
				$scope.calculatePrice();
				$scope.shoppingBagLen=$scope.purchasedArr.length;
			};

		});
app.controller('wishListCtrl', function($scope)
{
	$scope.addToCart = function(item)
	{
		$scope.addToCartCommon(item);
		
	};	
});
app.controller('shoppingBagCtrl', function($scope,ngDialog)
{	
	$scope.calculatePrice();
		
		$scope.closeDialog = function () {
			ngDialog.close();
				};
	
});


app.controller("phoneController",["$scope", "shopFactory", function($scope, shopFactory)
{
	$scope.setActive('Mobile');
shopFactory.getPhoneData(function(data)
			{
		$scope.phone=data.allProducts;
			});
	$scope.addToCart = function(item)
	{
		$scope.addToCartCommon(item);
	};

	$scope.addToWishList = function(pItem)
	{
		$scope.addToWishListCommon(pItem);

	};

}]);

app.controller("computerController",["$scope", "shopFactory", function($scope, shopFactory)
{
	$scope.setActive('Computer');
shopFactory.getComputerData(function(data)
			{
		$scope.computer=data.allProducts;
			});
	$scope.addToCart = function(item)
	{
		$scope.addToCartCommon(item);
	};
	$scope.addToWishList = function(pItem)
	{
		$scope.addToWishListCommon(pItem);

	};

} ]);
app.controller("tabletController",["$scope", "shopFactory", function($scope, shopFactory)
{
	$scope.setActive('tablet');
shopFactory.getTabletData(function(data)
			{
		$scope.tablet=data.allProducts;
			});
	$scope.addToCart = function(item)
	{
		$scope.addToCartCommon(item);
	};
	$scope.addToWishList = function(pItem)
	{
		$scope.addToWishListCommon(pItem);

	};

} ]);
app.controller("accessoriesController",["$scope", "shopFactory", function($scope, shopFactory)
{
	$scope.setActive('accessories');
	shopFactory.getAccessoriesData(function(data)
			{
		$scope.accessories=data.allProducts;
			});
	
	$scope.addToCart = function(aItem)
	{
		$scope.addToCartCommon(aItem);

	};
	$scope.addToWishList = function(pItem)
	{
		$scope.addToWishListCommon(pItem);

	};

}]);
app.controller('locationCtrl',["$scope", "shopFactory", function($scope, shopFactory)
      {
	 $scope.setActive('Location');
       	shopFactory.getLocationData(function(data)
       			{
       		        $scope.location=data.allProducts;
       		      
       			});
       		
      }]);



	




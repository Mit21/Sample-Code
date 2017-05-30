  var app = angular.module("shopApp",['ngRoute','ngDialog','ngAnimate','ui.bootstrap']);

  app.controller('CarouselDemoCtrl', function ($scope) {
    $scope.myInterval = 2000;
    var slides = $scope.slides = ['images/phone1.jpg','images/apps.jpg','images/phone3.jpg','images/slider3.jpg','images/slider2.jpg'];

  });
  
  
  
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
	  .when("/Mobile/:phoneId",
	{
		templateUrl : 'detailForPhone.html',
		controller : 'detailForImages'
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
	})
	.otherwise({
		rediractTo:"/Home" 
	});
	
	
});
app.service('shopFactory',function($http)
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
			 $scope.myInterval = 2000;
var slides = $scope.slides = ['images/laptop3.jpg','images/apps.jpg','images/slider4.jpg','images/slider5.jpg','images/phone-3.jpg'];

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
			$scope.Location =
			[ 'Address'];
									
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
		
});

app.controller("detailForImages",["$scope","shopFactory","$routeParams",function ($scope,shopFactory,$routeParams){
	shopFactory.getPhoneData(function(data)
{
		$scope.phone=data.allProducts;
	for (var i=0;i<$scope.phone.length;i++)
		{
		
		if($routeParams.phoneId==":"+$scope.phone[i].phoneId)
			{
		
			$scope.mainImg = $scope.phone[i].moreImages[0];
			$scope.mainImageUrl = $scope.phone[i].moreImages;
			$scope.discription=$scope.phone[i].product_description;
			$scope.customReviews=$scope.phone[i].customer_reviews;			
			
			}
		}
			
	   $scope.setImage = function(imageUrl)
			{
			  $scope.mainImg = imageUrl;
			};
  });		
	
}]);
app.controller("phoneController",["$scope","shopFactory", function($scope ,shopFactory)
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



	




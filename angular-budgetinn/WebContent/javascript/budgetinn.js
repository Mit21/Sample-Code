var budgetinn = angular.module('BudgetInnApp', ['ui.router', 'google-maps']);
budgetinn.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partial-home.html',
    })
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'partial-about.html',
    })
    $stateProvider.state('service', {
        url: '/service',
        templateUrl: 'partial-service.html',
    })
    $stateProvider.state('attraction', {
        url: '/attraction',
        templateUrl: 'partial-attraction.html',
    })
    $stateProvider.state('policies', {
        url: '/policies',
        templateUrl: 'partial-policies.html',
    })
    $stateProvider.state('contact', {
        url: '/contact',
        templateUrl: 'partial-contact.html',
        controller: 'mapctrl',
        resolve: {
            coordinates: function (myCoordinates) {
                return myCoordinates;
            }
        }
    })

});

budgetinn.directive('btnAutoCollapse', function () {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            element.on('click', function () {
                $(".navbar-collapse.in").collapse('hide');
            });
        }
    };
});
/*budgetinn.directive('scrollNav', function () {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            element.on('load', function () {
                $(window).scroll(function () {
                    var scrollTop = $(document).scrollTop();
                    if ($(this).scrollTop() > 550) {
                        $('.budget-header').removeClass('navbar-static-top').addClass('navbar-fixed-top');
                    } else {
                        $('.budget-header').removeClass('navbar-fixed-top').addClass('navbar-static-top');
                    }
                });
            });
        }
    };
});*/
budgetinn.directive('carouselSlider', function () {
    return {
        restrict: 'AE',
        templateUrl:"./partial-carousel.html",
        scope: {},
        link: function (scope, element, attrs) {
           scope.$watch('load',function () {
                $('#myCarousel').carousel({
                    interval: 6000
                })

                $('.carousel .item').each(function () {
                    var next = $(this).next();
                    if (!next.length) {
                        next = $(this).siblings(':first');
                    }
                    next.children(':first-child').clone().appendTo($(this));

                    for (var i = 0; i < 1; i++) {
                        next = next.next();
                        if (!next.length) {
                            next = $(this).siblings(':first');
                        }

                        next.children(':first-child').clone().appendTo($(this));
                    }
                });
            });
        }
    };
});


budgetinn.controller('mapctrl', ['$scope', '$document', 'coordinates', 'myCoordinates', function ($scope, $document, coordinates, myCoordinates) {
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(coordinates.lat, coordinates.lng);
    var To = coordinates.lat + " " + coordinates.lng;


    geocoder.geocode(
        {'latLng': latlng},
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add = results[0].formatted_address;
                    var value = add.split(",");

                    $scope.count = value.length;
                    $scope.country = value[$scope.count - 1];
                    $scope.state = value[$scope.count - 2];
                    $scope.city = value[$scope.count - 3];
                }
                else {
                    alert("address not found");
                }
            }
            else {
                alert("Geocoder failed due to: " + status);
            }
        }
    );
    // map object
    $scope.map = {
        control: {},
        center: {
            latitude: 43.224910,
            longitude: -77.356825
        },
        zoom: 10
    };

    // marker object
    $scope.marker = {
        center: {
            latitude: 43.224910,
            longitude: -77.356812
        }
    }

    // instantiate google map objects for directions
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();


    // directions object -- with defaults
    $scope.directions = {
        origin: "440 state route 104, Ontario, USA",
        destination: To,
        showList: false
    }

    // get directions using google maps api
    $scope.getDirections = function () {
        var request = {
            origin: $scope.directions.origin,
            destination: $scope.city,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap($scope.map.control.getGMap());
                directionsDisplay.setPanel(document.getElementById('directionsList'));
                $scope.directions.showList = true;
            } else {
                alert('Google route unsuccesfull!');
            }
        });
    }
}]);


budgetinn.factory('myCoordinates', function myCoordinates($q) {

    var deferred = $q.defer();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var myCoordinates = {};
            myCoordinates.lat = position.coords.latitude;
            myCoordinates.lng = position.coords.longitude;
            deferred.resolve(myCoordinates);
        });
    }
    return deferred.promise;

});


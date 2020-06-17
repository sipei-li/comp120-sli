var myLat=0;var myLng=0;var myPosition=new google.maps.LatLng(myLat,myLng);var myOptions={zoom: 13,center: myPosition,mapTypeId:google.maps.MapTypeId.ROADMAP};var map;var myMarker;var icon="https://tuftsdev.github.io/WebEngineering/assignments/summer2020/car.png";var flagIcon='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';var infowindow=new google.maps.InfoWindow();var request=new XMLHttpRequest();function init(){map=new google.maps.Map(document.getElementById("map_canvas"),myOptions);getMyLocation();}function getMyLocation(){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(somePos){myLat=somePos.coords.latitude;myLng=somePos.coords.longitude;renderMap();})}else{alert("Geolocation is not supported by your web browser.");}}function renderMap(){myPosition=new google.maps.LatLng(myLat,myLng);map.panTo(myPosition);myMarker=new google.maps.Marker({position:myPosition,title:"My Position"});myMarker.setMap(map);getRides();showplaces();}function getRides(){request.open("POST","https://jordan-marsh.herokuapp.com/rides",true);request.setRequestHeader("Content-type","application/x-www-form-urlencoded");request.onreadystatechange=function(){if(request.readyState==4&&request.status==200){var data=request.responseText;var cars=JSON.parse(data);var distance=[];for(let i=0;i<cars.length;i++){let car=new google.maps.LatLng(cars[i].lat,cars[i].lng);let id=cars[i].id;let marker=new google.maps.Marker({position:car,icon:icon});marker.setMap(map);let d=google.maps.geometry.spherical.computeDistanceBetween(car,myPosition);distance.push(d);google.maps.event.addListener(marker,'click',function(){infowindow.setContent("<p>id: "+id+"</p>"+"<p>distance: "+d*0.000621371+" miles</p>");infowindow.open(map, marker);})};var idx=indexOfMin(distance);google.maps.event.addListener(myMarker,'click',function(){infowindow.setContent("The closest car is: "+cars[idx].id+", "+distance[idx]*0.000621371+" miles away.");infowindow.open(map,myMarker);});var path=[myPosition,cars[idx]];var polyline=new google.maps.Polyline({path:path,geodesic:true,strokeColor:'#FF0000',strokeWeight:2});polyline.setMap(map);}};request.send("username=fyZkBsaE&lat="+myLat+"&lng="+myLng);}function indexOfMin(arr){if(arr.length===0){return -1;}var min=arr[0];var minIndex=0;for(var i=1;i<arr.length;i++){if(arr[i]<min){minIndex=i;min=arr[i];}}return minIndex;}function showplaces(){var service=new google.maps.places.PlacesService(map);service.nearbySearch({location:myPosition,radius:'1609.34',type:['restaurant']},callback);service.nearbySearch({location:myPosition,radius:'1609.34',type:['bar']},callback);service.nearbySearch({location:myPosition,radius:'1609.34',type:['cafe']},callback);function callback(results,status){if(status==google.maps.places.PlacesServiceStatus.OK){for(var i=0;i<results.length;i++){createMarker(results[i]);}}}}function createMarker(place){var marker=new google.maps.Marker({map:map,position:place.geometry.location,icon:flagIcon});google.maps.event.addListener(marker,'click',function(){infowindow.setContent(place.name);infowindow.open(map, this);});}
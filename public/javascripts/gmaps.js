function initialize(position ) {
  var myLatLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  //alert(myLatLng);
  var mapOptions = {
    center: myLatLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  var map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);

var a='<h1>Nueva<br/> Historia</h1>';
a=a+'<span>Comparte tus historias<br> y de tu localidad<br/>Cuentos, noticias de interes<br/></span>';
a=a+'<span>pequeñas historias con gran valor <br/> narra tu propia historia <br/> cuantala a el mundo</span>';

var infowindow = new google.maps.InfoWindow({
    content: a
  });

  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title:':D',
  });

infowindow.open(map,marker);

}

function Nuevo (myLatLng,texto,titulo) {

    var mapOptions = {
     
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);


    var infowindow = new google.maps.InfoWindow({
      content: texto
    });

    var marker = new google.maps.Marker({
        position: myLatLng ,
        map: map,
        title:titulo,
    });

      google.maps.event.addListener(marker,  function() {
      infowindow.open(map,marker);

    });

      

}

jQuery(function(){

  $('#1').click(
    function(e){
      //alert("ir");
      titulo='hola';
      texto='nuevo texto';
      var LatLng=new google.maps.LatLng(-13.066666999999999, -70.21666700000003);
      Nuevo.otro(LatLng,texto,titulo);
    });


});














function error(){
	alert("No se puede acceder localizarte")
}


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(initialize, error);
} else {
  error('not supported');
}
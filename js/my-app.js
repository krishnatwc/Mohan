// Initialize your app
var MohanApp = new Framework7({
    modalTitle: 'My App',
    // If it is webapp, we can enable hash navigation:
    pushState: true,
    material: true,
	animatePages:true,
	
    cache: false,
	panel: {
		swipe: 'left',
	},
	
	routes: [
    {
	  name: 'search-car',	
      path: 'search-car',
      url: 'search-car.html',
    },
	{
	  path: '/',
	  url: 'index.html',
    },
	{
      path: '(.*)',
      url: './pages/404.html',
    },
  ],
	
    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        MohanApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        MohanApp.hideIndicator();
    },

});

// Export selectors engine
var $$ = Dom7;
// Add view
var mainView = MohanApp.addView('.view-main', {
   domCache: true,
});


var RequestURL ='https://www.adivaha.com/demo/MobAppRequest';
//var HotelUrl ='http://hotel.staygo.com/hotels';
//var FlightUrl ='http://flight.staygo.com/flights';
var HotelUrl ='https://www.wego.co.in/hotels/searches';
var FlightUrl ='https://www.wego.co.in/flights/searches';

MohanApp.onPageInit('index', function (page) { 
$$('.pageFlashLoaderKK').show();	
setTimeout(function(){ $$('.pageFlashLoaderKK').hide('slow'); }, 3000);	


var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];	

var strDate =new Date();	
var enrDate =new Date();
strDate.setDate(strDate.getDate() + 1);
enrDate.setDate(enrDate.getDate() + 2);


//var sMonth =start.getMonth() < 12 ? start.getMonth() + 1 : 1;
//var eMonth =end.getMonth() < 12 ? start.getMonth() + 1 : 1;

var checkIn = strDate.getFullYear()+"-"+ (strDate.getMonth()+1) + "-" + strDate.getDate();
var checkOut = enrDate.getFullYear()+"-"+ (enrDate.getMonth()+1) + "-" + enrDate.getDate();

var checkInWego = strDate.getDate()+"-"+ (strDate.getMonth()+1) + "-" + strDate.getFullYear();
var checkOutWego =enrDate.getDate()+"-"+ (enrDate.getMonth()+1) + "-" + enrDate.getFullYear();


var startDate_txt = weekday[strDate.getDay()]+', '+strDate.getDate()+' '+monthNames[(strDate.getMonth()+1)]+' '+strDate.getFullYear().toString().substr(-2);
var endDate_txt = weekday[enrDate.getDay()]+', '+enrDate.getDate()+' '+monthNames[(enrDate.getMonth()+1)]+' '+enrDate.getFullYear().toString().substr(-2);




//=== Set default date ===/
var strDate =new Date();
var enrDate =new Date();
strDate.setDate(strDate.getDate() + 1);
enrDate.setDate(enrDate.getDate() + 3);

var startDate = (strDate.getMonth()+1) + "/" + strDate.getDate() + "/" +strDate.getFullYear();
var enDate = (enrDate.getMonth()+1) + "/" + enrDate.getDate() + "/" +enrDate.getFullYear();
var startRange =strDate.getFullYear()+', '+(strDate.getMonth()+1)+', '+strDate.getDate();
var endRange =enrDate.getFullYear()+', '+(enrDate.getMonth()+1)+', '+enrDate.getDate();


$$('#startDate').val(startDate);
$$('#endDate').val(enDate);
 
/*== Start Hotel Coding ==*/ 
/*===== Calendar =====*/
var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var today =new Date();
var calendarRange = MohanApp.calendar({
input: '#appCalendar',
dateFormat: 'M dd yyyy',
rangePicker: true,
minDate: today,
value: [new Date(startRange), new Date(endRange)],
onChange: function (p, values, displayValues){  
	var start =values[0];
	var end =values[1];
	
	var sMonth =start.getMonth() < 12 ? start.getMonth() + 1 : 1;
	var eMonth =end.getMonth() < 12 ? start.getMonth() + 1 : 1;
	
	var startDate = sMonth+'/'+start.getDate()+'/'+start.getFullYear(); 
	var endDate =eMonth+'/'+end.getDate()+'/'+end.getFullYear();
	var startDate_txt = weekday[start.getDay()]+', '+start.getDate()+' '+monthNames[start.getMonth()]+' '+start.getFullYear().toString().substr(-2);
	var endDate_txt = weekday[end.getDay()]+', '+end.getDate()+' '+monthNames[end.getMonth()]+' '+end.getFullYear().toString().substr(-2);
	
	$$('#startDate').val(startDate);
	$$('#endDate').val(endDate);
	$$('#startDate_txt').html(startDate_txt);
	$$('#endDate_txt').html(endDate_txt);
	
   }
});

/*=== Auto suggetion ===*/
var autocompleteDropdownAjax = MohanApp.autocomplete({
opener: $$('#autocomplete-standalone-popup'),
openIn: 'popup',
backOnSelect: true,
preloader: true, 
valueProperty: 'id', 
textProperty: 'n', 
limit: 20, 
dropdownPlaceholderText: 'Try "JavaScript"',
expandInput: true, 
requestSourceOnOpen: true,
autoFocus:true,

searchbarPlaceholder: 'Enter a city or hotel name',
notFoundText: 'Nothing found',


itemTemplate:'<li><label class="label-radio item-content"><input type="radio" name="radio-{{value}}" value="{{value}}" ><div class="item-media"> <i class="material-icons">location_on</i></div><div class="item-inner"><div class="item-title">{{text}}</div></div></label></li>',
source: function (autocomplete, query, render) {
   var data = [
   {"id": "1768","n":"New Delhi, India","lname": "New Delhi","lcode":"DEL"},
   {"id": "1972","n":"Dubai, United Arab Emirates","lname": "Dubai" ,"lcode":"DXB"},
   {"id": "934","n":"Mumbai, India","lname": "Mumbai","lcode":"BOM"},
   {"id": "2636","n":"Goa, India","lname": "Goa","lcode":"GOI"},
   {"id": "6667","n":"Singapore, Singapore","lname": "Singapore","lcode":"SIN"},
   {"id": "4003","n":"Las Vegas","lname": "Las Vegas, NV, United States","lcode":"LAS"}
	
   ]; 
	
	var results = [];
	if (query.length === 0) {
		results = data;   
		render(results);
		return;
	}
	autocomplete.showPreloader();
	$$.ajax({
		url: 'https://secure.wego.com/en/hotels/api/autocomplete/7/locations/6/'+query+'.js',
		method: 'GET',
		dataType: 'json',
		data: {
			callback:'',
			lang: 'en',
			limit: 5
		},
		success: function (data) {
			//var myData =data.cities; 
			var myData =data; 
			for (var i = 0; i < myData.length; i++) {
			   if (myData[i].n.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(myData[i]);
			}
			autocomplete.hidePreloader();
			render(results);
		}
	});
},
onChange: function (autocomplete, value) { 
 var dataObj =value[0];
 $$('#destination').val(dataObj.n);	
 $$('#selectedDest').html(dataObj.n);
 $$('#region_id').val(dataObj.lcode);	 
 $$('#region_name').val(dataObj.lname);
 
}

});  


var glob =0;
$$('.addMoreRooms').on('click', function () {
  var numRooms = $$('.roomListcls').length;
  var n =parseInt(numRooms)+1;
  $$('#number_of_rooms').val(n);
  glob++;
  var pacHtml='';
  pacHtml+='<div class="card ks-facebook-card roomListcls">'+
			'<input type="hidden" name="adults[]" id="adults_'+glob+'" value="1"><input type="hidden" name="childs[]" id="childs_'+glob+'" value="0">'+
		'<div class="card-footer no-border"><a href="#" class="link rooming">Room '+n+'</a><a href="#" class="link deleteRooms" ><i class="material-icons">delete</i></a></div>'+
			'<div class="card-content">'+
			 '<div class="content-block">'+ 
				'<div class="roomPagePadding">'+ 
					'<div class="row margin_br">'+
						'<div class="col-60">'+ 
							'<div class="roomPageTitle">Adults</div>'+
							'<div class="roomPageTitleBottom">Above 12 yrs</div>'+
						'</div>'+
						'<div class="col-40">'+
							'<div class="row roomPagePaddingBottom">'+
								'<div class="col-33">'+
									'<a href="#" class="link left pack_circle minusAdults" rel="'+glob+'"><i class="material-icons">remove</i></a>'+
								'</div>'+
								'<div class="col-33">'+
									'<a href="#" class="link center" id="countAdults_'+glob+'">1</a>'+ 
								'</div>'+
								'<div class="col-33">'+
									'<a href="#" class="link right pack_circle plusAduls" rel="'+glob+'"><i class="material-icons">add</i></a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="roomPagePadding">'+
					'<div class="row">'+
						'<div class="col-60 marginbr"> '+
							'<div class="roomPageTitle">Children</div>'+
							'<div class="roomPageTitleBottom">0-12 yrs</div>'+
						'</div>'+
						'<div class="col-40">'+
							'<div class="row roomPagePaddingBottom">'+
								'<div class="col-33">'+
									'<a href="#" class="link left pack_circle minusChilds" rel="'+glob+'"><i class="material-icons">remove</i></a>'+
								'</div>'+
								'<div class="col-33">'+
									'<a href="#" class="link center" id="countChilds_'+glob+'">0</a>'+
								'</div>'+
								'<div class="col-33">'+
									'<a href="#" class="link right pack_circle plusChilds" rel="'+glob+'"><i class="material-icons">add</i></a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="row"><div class="col-30">&nbsp;</div><div class="col-70 childAgeCls" id="childAgeList_'+glob+'"></div></div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';	 
 $$('#hotelroomspacksDetails').append(pacHtml);
 
 if(n==3){ $$('.addMoreRooms').hide();}
 else{$$('.addMoreRooms').show();}
  
 deleteRooms();
 roomAndGuestCount();
});
  
  function deleteRooms(){
	$$('.deleteRooms').on('click',function(e){
	  e.preventDefault();
	  $$(this).closest('.roomListcls').remove();
	  var numRooms = $$('.roomListcls').length;
	  $$('#number_of_rooms').val(numRooms);
	  $$('.addMoreRooms').show();
	  
	  var v=1;
	  $$(".rooming").each(function() {
		  $$(this).html('Room '+v);
		  v++;
	   });
    })  
  }
  
  
  $$("body").on("click", ".plusAduls", function(e){
	 e.preventDefault(); 
     var rel = $$(this).attr('rel');
	 var adt =$$('#countAdults_'+rel).html();
	 var adult= parseInt(adt)+1;
	 if(adult<=4){
	  $$('#countAdults_'+rel).html(adult);
	  $$('#adults_'+rel).val(adult);
	  roomAndGuestCount();
	 }
  });
  $$("body").on('click','.minusAdults',function(e){
	e.preventDefault();	
	var rel = $$(this).attr('rel');
	var adt =$$('#countAdults_'+rel).html();
	var adult= parseInt(adt)-1;
	if(adult>=1){
	 $$('#countAdults_'+rel).html(adult);
	 $$('#adults_'+rel).val(adult);
	 roomAndGuestCount();
	}
  });
  
  $$("body").on('click','.plusChilds',function(e){
	e.preventDefault();	
	var rel = $$(this).attr('rel');
	var adt =$$('#countChilds_'+rel).html();
	var child= parseInt(adt)+1;
	if(child<=3){
	$$('#countChilds_'+rel).html(child);
	$$('#childs_'+rel).val(child);
	 /*manageChildAge(child,rel);*/
	 roomAndGuestCount();
	}
  });
  
  $$("body").on('click','.minusChilds',function(e){
	e.preventDefault();	
	var rel = $$(this).attr('rel');
	var adt =$$('#countChilds_'+rel).html();
	var child= parseInt(adt)-1;
	if(child>=0){
	$$('#countChilds_'+rel).html(child);
	$$('#childs_'+rel).val(child);
	/*manageChildAge(child,rel);*/
	roomAndGuestCount();
	}
  });
  
  function manageChildAge(child,rel){
	 var ageHtml ='';
	 for(var i=0;i<child;i++){
	   ageHtml+='<select name="childAge['+rel+'][]" relKey='+rel+'><option value="0"> < 1 </option><option value="1"> 1 </option><option value="2"> 2 </option></select>';	 
	 }
	 $$("#childAgeList_"+rel).html(ageHtml);
  }
  
  function roomAndGuestCount(){
	var adts  = document.getElementsByName('adults[]');
	var chds  = document.getElementsByName('childs[]');
	var guest=0;
    for (var i = 0; i <adts.length; i++) {
	  var adt=adts[i].value;
	  guest =parseInt(guest)+parseInt(adt);
	}
	
	for (var c = 0; c <chds.length; c++) {
	  var chd=chds[c].value;
	  guest =parseInt(guest)+parseInt(chd);
	}
	
   var rooms =$$('#number_of_rooms').val();
   $$('#total_guest').val(guest); 
   $$('#roomGuestTxt').html(guest+' Guests ');
   $$('#selectedDest_adults').html(rooms+ ' Rooms '+guest+' Guests');
   
   //RoomWise Guest
   var roomWiseGuest='';
   for(var k=0;k<rooms;k++){
	 var roomGuest= parseInt(adts[k].value)+parseInt(chds[k].value);	
	 roomWiseGuest+=roomGuest+'-'; 
   }
   roomWiseGuest =roomWiseGuest.slice(0,-1);
   $$("#room_wise_guest").val(roomWiseGuest);
   
 }


var hotelObject = [];
$$('.findHotelResults').on('click', function(e){
   
 if($$('#region_name').val()==''){
	 MohanApp.alert("Select your destination");
	 return false;
 }  
 else{   
 var formData = MohanApp.formToData('#searchHotel_frm');
 //MohanApp.formStoreData('HotelRequestData',formData);
 var adults =$$('#adults_0').val(); 
 var childs =$$('#childs_0').val();
 var childAgeArr= new  Array;
 
 $$('.childAgeCls select').each(function(){ 
	   var relKey =$$(this).attr('relKey');
	   childAgeArr.push([relKey, $$(this).val()]); 
	});
 
 
  var startDate =$$('#startDate').val();
  var startDateArr =startDate.split('/');
  var endDate =$$('#endDate').val();
  var endDateArr =endDate.split('/');
  
  var checkin_year =startDateArr[2];
  var checkin_month =startDateArr[0];
  if(checkin_month<10){
	  checkin_month ='0'+checkin_month;
  }
  var checkin_date =startDateArr[1];
  if(checkin_date<10){
	  checkin_date ='0'+checkin_date;
  }
  
  var checkout_year =endDateArr[2];
  var checkout_month =endDateArr[0];
  if(checkout_month<10){
	  checkout_month ='0'+checkout_month;
  }
  var checkout_date =endDateArr[1];
  if(checkout_date<10){
	  checkout_date ='0'+checkout_date;
  }
  
  var checkIn =checkin_year+'-'+checkin_month+'-'+checkin_date;
  var checkOut =checkout_year+'-'+checkout_month+'-'+checkout_date;
  var number_of_rooms = $$('#number_of_rooms').val(); 
  var TotalGuest =$$('#total_guest').val();
  var room_wise_guest = $$("#room_wise_guest").val();
  
   MohanApp.formStoreData('myhoteldata',{'destination':$$('#destination').val(),'region_id':$$('#region_id').val(),'rooms': number_of_rooms,'total_guest': TotalGuest,'room_wise_guest':room_wise_guest,'checkIn':checkIn,'checkOut':checkOut});
  
  var url = HotelUrl+'/'+$$('#region_id').val()+'/'+checkIn+'/'+checkOut+'/'+number_of_rooms+'/'+TotalGuest+'?guests='+room_wise_guest+'&sort=popularity&order=desc';
  
  window.location.href=url;
 } 
  
}) 

/*=== Start Flight Clinet ===*/
var strDate =new Date();
var enrDate =new Date();
strDate.setDate(strDate.getDate() + 1);
enrDate.setDate(enrDate.getDate() + 3);

var startDate = (strDate.getMonth()+1) + "/" + strDate.getDate() + "/" +strDate.getFullYear();
var enDate = (enrDate.getMonth()+1) + "/" + enrDate.getDate() + "/" +enrDate.getFullYear();
var startRange =strDate.getFullYear()+', '+(strDate.getMonth()+1)+', '+strDate.getDate();
var endRange =enrDate.getFullYear()+', '+(enrDate.getMonth()+1)+', '+enrDate.getDate();


$$('#fligth_startDate').val(startDate);
$$('#fligth_endDate').val(enDate);
var flightcalendarRange = MohanApp.calendar({
	input: '#flightappCalendar',
	dateFormat: 'M dd yyyy',
	rangePicker: true,
	minDate: today,
	value: [new Date(startRange), new Date(endRange)],
	onChange: function (p, values, displayValues){  
		var start =values[0];
		var end =values[1];
		
		var sMonth =start.getMonth() < 12 ? start.getMonth() + 1 : 1;
		var eMonth =end.getMonth() < 12 ? start.getMonth() + 1 : 1;
		
		var startDate = sMonth+'/'+start.getDate()+'/'+start.getFullYear(); 
		var endDate =eMonth+'/'+end.getDate()+'/'+end.getFullYear();
		var startDate_txt = weekday[start.getDay()]+', '+start.getDate()+' '+monthNames[start.getMonth()]+' '+start.getFullYear().toString().substr(-2);
		var endDate_txt = weekday[end.getDay()]+', '+end.getDate()+' '+monthNames[end.getMonth()]+' '+end.getFullYear().toString().substr(-2);
		
		$$('#fligth_startDate').val(startDate);
		$$('#fligth_endDate').val(endDate);
		$$('#fligth_startDate_txt').html(startDate_txt);
		$$('#fligth_endDate_txt').html(endDate_txt);
	   }
});

var autocompleteDropdownAjax = MohanApp.autocomplete({
	opener: $$('#flight-autocomplete-standalone-popup-from'),
	openIn: 'popup',
	backOnSelect: true,
	preloader: true, 
	valueProperty: 'city_code', 
	textProperty: 'city_fullname', 
	limit: 20, 
	autoFocus: true,
	dropdownPlaceholderText: 'Try "JavaScript"',
	expandInput: true, 
	source: function (autocomplete, query, render) {
		var results = [];
		if (query.length === 0) {
			render(results);
			return;
		}
		autocomplete.showPreloader();
		$$.ajax({
			url: 'https://www.jetradar.com/autocomplete/places',
			method: 'GET',
			dataType: 'json',
			data: {
				q: query,
				with_countries: "false",
				locale: 'en',
				limit: 5
			},
			success: function (data) {
				var myData =data; 
				for (var i = 0; i < myData.length; i++) {
				   if (myData[i].city_fullname.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(myData[i]);
				}
				autocomplete.hidePreloader();
				render(results);
			}
		});
	},
	onChange: function (autocomplete, value) { 
	 var dataObj =value[0];
	 $$('#flight_from').val(dataObj.city_fullname);
	 $$('#flight_locationId').val(dataObj.city_code);
     $$('#flight_selectedDest').html(dataObj.city_fullname);	 	 
	}
  });

 var autocompleteDropdownAjax = MohanApp.autocomplete({
	opener: $$('#flight-autocomplete-standalone-popup-to'),
	openIn: 'popup',
	backOnSelect: true,
	preloader: true, 
	valueProperty: 'city_code', 
	textProperty: 'city_fullname', 
	limit: 20, 
	autoFocus: true,
	dropdownPlaceholderText: 'Try "JavaScript"',
	expandInput: true, 
	source: function (autocomplete, query, render) {
		var results = [];
		if (query.length === 0) {
			render(results);
			return;
		}
		autocomplete.showPreloader();
		$$.ajax({
			url: 'https://www.jetradar.com/autocomplete/places',
			method: 'GET',
			dataType: 'json',
			data: {
				q: query,
				with_countries: "false",
				locale: 'en',
				limit: 5
			},
			success: function (data) {
				var myData =data; 
				for (var i = 0; i < myData.length; i++) {
				   if (myData[i].city_fullname.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(myData[i]);
				}
				autocomplete.hidePreloader();
				render(results);
			}
		});
	},
	onChange: function (autocomplete, value) { 
	 var dataObj =value[0];
	 $$('#flight_to').val(dataObj.city_fullname);
	 $$('#flight_to_locationId').val(dataObj.city_code);
     $$('#flight_selectedToDest').html(dataObj.city_fullname);	 	 
	}
  });
 
   $$('.managePassenger').on('click', function () {
	  var adults =$$('#adults').val();
	  var childs =$$('#childs').val();
	  var infants =$$('#infants').val();
	  var mType =$$(this).attr('mType');
	  var aType =$$(this).attr('aType');
	  if(aType=='add'){
		 if(mType=='adults'){ 
		   adults =parseInt(adults)+1;
		   $$('#adults').val(adults);
		   $$('#countAdults').html(adults);
		 }
		 if(mType=='childs'){ 
		   childs =parseInt(childs)+1;
		   $$('#childs').val(childs);
		   $$('#countChilds').html(childs);
		 }
		 if(mType=='infants'){ 
		   infants =parseInt(infants)+1;
		   $$('#infants').val(infants);
		   $$('#countInfants').html(infants);
		 }
	  }
	 if(aType=='remove'){
		 if(mType=='adults'){ 
		   if(adults>1){
		   adults =parseInt(adults)-1;
		   $$('#adults').val(adults);
		   $$('#countAdults').html(adults);
		   }
		 }
		 if(mType=='childs'){ 
		   if(childs>0){
		   childs =parseInt(childs)-1;
		   $$('#childs').val(childs);
		   $$('#countChilds').html(childs);
		   }
		 }
		 if(mType=='infants'){ 
		    if(infants>0){ 
		    infants =parseInt(infants)-1;
		    $$('#infants').val(infants);
		    $$('#countInfants').html(infants);
			}
		 }
	  } 
	  
	  var passenger =parseInt(adults)+parseInt(childs)+parseInt(infants);
	  $$('#roomGuestTxt').html(passenger +' Passengers' );
	  $$('#selectedPassengers').html(passenger+' Passengers');
  });
  $$('.tripType').on('click', function (e) {
	 $$('.tripType').removeClass('active');
	 $$(this).addClass('active');
	 var rel =$$(this).attr('rel');
	 if(rel=='round'){
		$$('#one_way').val('false'); 
		$$('.flightendDatecss').removeClass('disabledClass'); 
	 }else{
	   $$('#one_way').val('true'); 	 
	   $$('.flightendDatecss').addClass('disabledClass');
	 }
  });
  
  $$('.findFlightResults').on('click', function (e) {
   var result =$$('input[name=result]:checked').val();	 
   var trip_class =0;
   if(result=='Business'){ trip_class=1;  }
   
   var one_way =$$('#one_way').val();
   var startDate =$$('#fligth_startDate').val();
   var startDateArr =startDate.split('/');
   var endDate =$$('#fligth_endDate').val();
   var endDateArr =endDate.split('/');
   var departDate =startDateArr[2]+'-'+startDateArr[0]+'-'+startDateArr[1];
   
   if(one_way=='false'){ 
    var returnDate =endDateArr[2]+'-'+endDateArr[0]+'-'+endDateArr[1];
   }else{ 
	var returnDate ='';   
   }
   
   var adults =$$('#adults').val();
   var childs =$$('#childs').val();
   var infants =$$('#infants').val();
   var passenger =parseInt(adults)+parseInt(childs)+parseInt(infants);
   
   var ct_guests =passenger+'passenger';
   var Flights_Return_direct ='enable';

   //var url =FlightUrl+'/search/'+$$('#flight_locationId').val()+'/'+$$('#flight_to_locationId').val()+'/'+departDate+'/'+returnDate+'/'+result+'/'+$$('#adults').val()+'/'+$$('#childs').val();
   
   MohanApp.formStoreData('myflightdata',{'from_dest':$$('#flight_from').val(),'from_iata':$$('#flight_locationId').val(),'to_dest':$$('#flight_to').val(),'to_iata':$$('#flight_to_locationId').val(),'adults': adults,'childs': childs,'infants':infants,'departDate':departDate,'returnDate':returnDate,'classtype':result});
   
   var flightLocationWithdate ='c'+$$('#flight_locationId').val()+'-c'+$$('#flight_to_locationId').val()+'-'+departDate;
   if(returnDate!=''){
	 flightLocationWithdate+=':c'+$$('#flight_to_locationId').val()+'-c'+$$('#flight_locationId').val()+'-'+returnDate;   
   }
   var flightMember =adults+'a:'+childs+'c:'+infants+'i'; 
   var url =FlightUrl+'/'+flightLocationWithdate+'/'+result+'/'+flightMember+'?sort=price&order=asc';
   window.location.href=url;
   
  });
 
 
/*== Display Cookie data ===*/
  var HotelStoredData =MohanApp.formGetData('myhoteldata');
  var currentDate = new Date();
  
  var hDesctination ='New delhi, India';
  var hRegionId ='DEL';
  var hRooms =1;
  var hTotalGuest=1;
  var hRoomWiseGuest=1;
  if(HotelStoredData.destination!=''){
	 hDesctination=HotelStoredData.destination;  
	 hRegionId=HotelStoredData.region_id;
	 hRooms =1;
     hTotalGuest=1;
     hRoomWiseGuest=1;
  }
  
  if( (new Date(HotelStoredData.checkIn) >= new Date()) && (HotelStoredData.checkIn!='') || (HotelStoredData.checkIn!='undefined') ){
	 var checkIn =HotelStoredData.checkIn;
	 var checkOut =HotelStoredData.checkOut;
	 var checkInArr =checkIn.split('-');
	 var checkOutArr =checkOut.split('-');
	 
	 var checkin_date =parseInt(checkInArr[2]);
	 var checkin_month =parseInt(checkInArr[1]);
	 var checkin_year =checkInArr[0];
	 var checkout_date =parseInt(checkOutArr[2]);
	 var checkout_month =parseInt(checkOutArr[1]);
	 var checkout_year =checkOutArr[0];
	 
	 var startDate_txt = checkin_date+' '+monthNames[checkin_month]+' '+checkin_year;
     var endDate_txt = checkout_date+' '+monthNames[checkout_month]+' '+checkout_year;
  }
  else{
	  var checkInArr =checkIn.split('-');
	  var checkOutArr =checkOut.split('-');  	
	  var checkin_year =checkInArr[0];
	  var checkin_month =checkInArr[1];
	  if(checkin_month<10){
		  checkin_month ='0'+checkin_month;
	  }
	  var checkin_date =checkInArr[2];
	  if(checkin_date<10){
		  checkin_date ='0'+checkin_date;
	  }
	  
	  var checkout_year =checkOutArr[0];
	  var checkout_month =checkOutArr[1];
	  if(checkout_month<10){
		  checkout_month ='0'+checkout_month;
	  }
	  var checkout_date =checkOutArr[2];
	  if(checkout_date<10){
		  checkout_date ='0'+checkout_date;
	  }
	  
	  var checkIn =checkin_year+'-'+checkin_month+'-'+checkin_date;
	  var checkOut =checkout_year+'-'+checkout_month+'-'+checkout_date; 
	  var startDate_txt = checkin_date+' '+checkin_month+' '+monthNames[(checkin_month+1)]+' '+checkin_year;
      var endDate_txt =   checkout_date+' '+checkout_month+' '+monthNames[(checkout_year+1)]+' '+checkout_year;
  }
 
  
var htmlHotel ='<div class="history-home-page-main-left"><img src="img/hotels1.jpg"></div><a href="'+HotelUrl+'/'+hRegionId+'/'+checkIn+'/'+checkOut+'/'+hRooms+'/'+hTotalGuest+'?guests='+hRoomWiseGuest+'&sort=popularity&order=desc" class="link external"><div class="history-home-page-main-right"><div class="history-home-text">'+hDesctination+'</div><div class="history-home-text1">'+startDate_txt+' - '+endDate_txt+'</div><div class="history-home-text2"><i class="fa fa-user"></i> 2 Guests </div><div class="history-home-text3"><i class="fa fa-bed"></i>1 Room </div></a></div>';

$$('#storeHotelLists').html(htmlHotel);

  //MohanApp.formStoreData('myflightdata',{'from':$$('#flight_from').val(),'from_iata':$$('#flight_locationId').val(),'to':$$('#flight_to').val(),'to_iata':$$('#flight_to_locationId').val(),'adults': adults,'childs': childs,'infants':infants,'departDate':departDate,'returnDate':returnDate,'classtype':result});


var FlightStoredData =MohanApp.formGetData('myflightdata');

if( (new Date(FlightStoredData.departDate) >= new Date()) && (FlightStoredData.departDate!='') || (FlightStoredData.departDate!='undefined') ){	
 var from_dest =FlightStoredData.from_dest;
 var to_dest =FlightStoredData.to_dest;
 var from_iata =FlightStoredData.from_iata;
 var to_iata =FlightStoredData.to_iata;
 var departDate =FlightStoredData.departDate;
 var returnDate =FlightStoredData.returnDate;
 var adults =FlightStoredData.adults;
 var childs =FlightStoredData.childs;
 var infants =FlightStoredData.infants;
}
else{
var from_dest ='Delhi,India';
var to_dest ='Goa, India';
var from_iata ='DEL';
var to_iata ='GOI';	
var departDate =checkIn;
var returnDate ='';
var adults =1;
var childs =0;
var infants =0;  	
}

var flightLinkParam =FlightUrl+'/c'+from_iata+'-c'+to_iata+'-'+departDate;
if(returnDate!=''){
flightLinkParam+=':c'+to_iata+'-c'+from_iata+'-'+returnDate;	
}
flightLinkParam+='/'+FlightStoredData.classtype+'/'+adults+'a:'+childs+'c:'+infants+'i?sort=price&order=asc';

var departDateArr =departDate.split('-');
var fcheckin_date =parseInt(departDateArr[2]);
var fcheckin_month =parseInt(departDateArr[1]);
var fcheckin_year =departDateArr[0];

if(returnDate!=''){
var returnDateArr =returnDate.split('-');
var fcheckout_date =parseInt(returnDateArr[2]);
var fcheckout_month =parseInt(returnDateArr[1]);
var fcheckout_year =returnDateArr[0];
}  
  
var fstartDate_txt = fcheckin_date+' '+monthNames[fcheckin_month]+' '+fcheckin_year;
var fendDate_txt = fcheckout_date+' '+monthNames[fcheckout_month]+' '+fcheckout_year; 

  
var htmlFlight ='<div class="history-home-page-main-left">';
		htmlFlight+='<img src="img/flights1.png">';
	htmlFlight+='</div>';
	htmlFlight+='<div class="history-home-page-main-right">';
		htmlFlight+='<div class="history-recents">';
			htmlFlight+='<div class="history-recents-left">';
			htmlFlight+='<a href="'+flightLinkParam+'" class="link external"><div class="deltopatfri">';
				htmlFlight+='<div class="deltopatfri1">';
					htmlFlight+='<span>'+from_iata+'</span> <span><i class="fa fa-arrow-right"></i></span> <span>'+to_iata+'</span>';
					  if(returnDate!=''){
						htmlFlight+='<span>'+to_iata+'</span> <span><i class="fa fa-arrow-right"></i></span> <span>'+from_iata+'</span>';	
					   }
				     htmlFlight+='</div>';
					htmlFlight+='<div class="deltopatfri2">';
						htmlFlight+='<span>'+fstartDate_txt+'</span>';
						 if(returnDate!=''){
						  htmlFlight+='<span>'+fendDate_txt+'</span>';
						  }
								
						htmlFlight+='</div>';
					htmlFlight+='</div></a>';
					htmlFlight+='</div>';
					htmlFlight+='</div>';
				htmlFlight+='<div class="history-home-text2"><i class="fa fa-briefcase"></i>  Economy<span class="economyadlet">1 <i class="fa fa-male"></i> </span> </div>';
			   htmlFlight+='</div>';
$$('#storeFlightLists').html(htmlFlight);

}).trigger();

/*=== Flight Modules ====*/ 
MohanApp.onPageInit('index', function (page) { 
	//=== Set default date ===/
	var strDate =new Date();
	var enrDate =new Date();
    strDate.setDate(strDate.getDate() + 1);
	enrDate.setDate(enrDate.getDate() + 1);
	
	var startDate = (strDate.getMonth()+1) + "/" + strDate.getDate() + "/" +strDate.getFullYear();
	var enDate = (enrDate.getMonth()+1) + "/" + enrDate.getDate() + "/" +enrDate.getFullYear();
	var startRange =strDate.getFullYear()+', '+(strDate.getMonth()+1)+', '+strDate.getDate();
	var endRange =enrDate.getFullYear()+', '+(enrDate.getMonth()+1)+', '+enrDate.getDate();
	
	$$('#fligth_startDate').val(startDate);
	$$('#fligth_endDate').val(enDate);
	
	
 
   /*===== Calendar ===== */
    var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var today =new Date();
	var calendarRange = MohanApp.calendar({
	input: '#flightappCalendar',
	dateFormat: 'M dd yyyy',
	rangePicker: true,
	minDate: today,
	value: [new Date(startRange), new Date(endRange)],
	onChange: function (p, values, displayValues){  
		var start =values[0];
		var end =values[1];
		
		var sMonth =start.getMonth() < 12 ? start.getMonth() + 1 : 1;
		var eMonth =end.getMonth() < 12 ? start.getMonth() + 1 : 1;
		
		var startDate = sMonth+'/'+start.getDate()+'/'+start.getFullYear(); 
		var endDate =eMonth+'/'+end.getDate()+'/'+end.getFullYear();
		var startDate_txt = weekday[start.getDay()]+', '+start.getDate()+' '+monthNames[start.getMonth()]+' '+start.getFullYear().toString().substr(-2);
		var endDate_txt = weekday[end.getDay()]+', '+end.getDate()+' '+monthNames[end.getMonth()]+' '+end.getFullYear().toString().substr(-2);
		
		$$('#fligth_startDate').val(startDate);
		$$('#fligth_endDate').val(endDate);
		$$('#fligth_startDate_txt').html(startDate_txt);
		$$('#fligth_endDate_txt').html(endDate_txt);
	   }
	});	
   /*=== Activity Auto suggetion ===*/	
   var autocompleteDropdownAjax = MohanApp.autocomplete({
	opener: $$('#flight-autocomplete-standalone-popup-from'),
	openIn: 'popup',
	backOnSelect: true,
	preloader: true, 
	valueProperty: 'city_code', 
	textProperty: 'city_fullname', 
	limit: 20, 
	autoFocus: true,
	dropdownPlaceholderText: 'Try "JavaScript"',
	expandInput: true, 
	source: function (autocomplete, query, render) {
		var results = [];
		if (query.length === 0) {
			render(results);
			return;
		}
		autocomplete.showPreloader();
		$$.ajax({
			url: 'https://www.jetradar.com/autocomplete/places',
			method: 'GET',
			dataType: 'json',
			data: {
				q: query,
				with_countries: "false",
				locale: 'en',
				limit: 5
			},
			success: function (data) {
				var myData =data; 
				for (var i = 0; i < myData.length; i++) {
				   if (myData[i].city_fullname.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(myData[i]);
				}
				autocomplete.hidePreloader();
				render(results);
			}
		});
	},
	onChange: function (autocomplete, value) { 
	 var dataObj =value[0];
	 $$('#flight_from').val(dataObj.city_fullname);
	 $$('#flight_locationId').val(dataObj.city_code);
     $$('#flight_selectedDest').html(dataObj.city_fullname);	 	 
	}
  });

  var autocompleteDropdownAjax = MohanApp.autocomplete({
	opener: $$('#flight-autocomplete-standalone-popup-to'),
	openIn: 'popup',
	backOnSelect: true,
	preloader: true, 
	valueProperty: 'city_code', 
	textProperty: 'city_fullname', 
	limit: 20, 
	autoFocus: true,
	dropdownPlaceholderText: 'Try "JavaScript"',
	expandInput: true, 
	source: function (autocomplete, query, render) {
		var results = [];
		if (query.length === 0) {
			render(results);
			return;
		}
		autocomplete.showPreloader();
		$$.ajax({
			url: 'https://www.jetradar.com/autocomplete/places',
			method: 'GET',
			dataType: 'json',
			data: {
				q: query,
				with_countries: "false",
				locale: 'en',
				limit: 5
			},
			success: function (data) {
				var myData =data; 
				for (var i = 0; i < myData.length; i++) {
				   if (myData[i].city_fullname.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(myData[i]);
				}
				autocomplete.hidePreloader();
				render(results);
			}
		});
	},
	onChange: function (autocomplete, value) { 
	 var dataObj =value[0];
	 $$('#flight_to').val(dataObj.city_fullname);
	 $$('#flight_to_locationId').val(dataObj.city_code);	
     $$('#flight_selectedToDest').html(dataObj.city_fullname);	 	 
	}
  });  
	
  $$('.managePassenger').on('click', function () {
	  var adults =$$('#adults').val();
	  var childs =$$('#childs').val();
	  var infants =$$('#infants').val();
	  var mType =$$(this).attr('mType');
	  var aType =$$(this).attr('aType');
	  if(aType=='add'){
		 if(mType=='adults'){ 
		   adults =parseInt(adults)+1;
		   $$('#adults').val(adults);
		   $$('#countAdults').html(adults);
		 }
		 if(mType=='childs'){ 
		   childs =parseInt(childs)+1;
		   $$('#childs').val(childs);
		   $$('#countChilds').html(childs);
		 }
		 if(mType=='infants'){ 
		   infants =parseInt(infants)+1;
		   $$('#infants').val(infants);
		   $$('#countInfants').html(infants);
		 }
	  }
	 if(aType=='remove'){
		 if(mType=='adults'){ 
		   if(adults>1){
		   adults =parseInt(adults)-1;
		   $$('#adults').val(adults);
		   $$('#countAdults').html(adults);
		   }
		 }
		 if(mType=='childs'){ 
		   if(childs>0){
		   childs =parseInt(childs)-1;
		   $$('#childs').val(childs);
		   $$('#countChilds').html(childs);
		   }
		 }
		 if(mType=='infants'){ 
		    if(infants>0){ 
		    infants =parseInt(infants)-1;
		    $$('#infants').val(infants);
		    $$('#countInfants').html(infants);
			}
		 }
	  } 
	  
	  var passenger =parseInt(adults)+parseInt(childs)+parseInt(infants);
	  $$('#roomGuestTxt').html(passenger +' Passengers' );
	  $$('#selectedPassengers').html(passenger+' Passengers');
  });
  
  $$('.tripType').on('click', function (e) {
	 $$('.tripType').removeClass('active');
	 $$(this).addClass('active');
	 var rel =$$(this).attr('rel');
	 if(rel=='round'){
		$$('#one_way').val('false'); 
		$$('.flightendDatecss').removeClass('disabledClass'); 
	 }else{
	   $$('#one_way').val('true'); 	 
	   $$('.flightendDatecss').addClass('disabledClass');
	 }
  });
  
  $$('.findFlightResults').on('click', function (e) { 
   var result =$$('input[name=result]:checked').val();	 
   var trip_class =0;
   if(result=='Business'){ trip_class=1;  }
   
   var one_way =$$('#one_way').val();
   
   var startDate =$$('#fligth_startDate').val();
   var startDateArr =startDate.split('/');
   var endDate =$$('#fligth_endDate').val();
   var endDateArr =endDate.split('/');
   var departDate =startDateArr[2]+'-'+startDateArr[0]+'-'+startDateArr[1];
   
   if(one_way=='false'){ 
    var returnDate =endDateArr[2]+'-'+endDateArr[0]+'-'+endDateArr[1];
   }else{ 
	 //var returnDate ='oneway'; 
    var returnDate =''; 	 
   }
   
   var adults =$$('#adults').val();
   var childs =$$('#childs').val();
   var infants =$$('#infants').val();
   var passenger =parseInt(adults)+parseInt(childs)+parseInt(infants);
   
   var ct_guests =passenger+'passenger';
   var Flights_Return_direct ='enable';
   
   var flightLocationWithdate ='c'+$$('#flight_locationId').val()+'-c'+$$('#flight_to_locationId').val()+'-'+departDate;
   if(returnDate!=''){
	 flightLocationWithdate+=':c'+$$('#flight_to_locationId').val()+'-c'+$$('#flight_locationId').val()+'-'+returnDate;   
   }
   var flightMember =adults+'a:'+childs+'c:'+infants+'i'; 
  
   /*var url =FlightUrl+'/search/'+$$('#flight_locationId').val()+'/'+$$('#flight_to_locationId').val()+'/'+departDate+'/'+returnDate+'/'+result+'/'+$$('#adults').val()+'/'+$$('#childs').val();*/
   
   var url =FlightUrl+'/'+flightLocationWithdate+'/'+result+'/'+flightMember+'?sort=price&order=asc';
   alert(url);
   window.location.href=url;
   
  })
  
});



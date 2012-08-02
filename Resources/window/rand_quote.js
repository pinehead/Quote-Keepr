/*This file is part of Quote Keepr
Quote Keepr provides a convenient user interface to manage and find quotes via a 
web service. Developed by Anthony D. James, http://pinehead.tv

Copyright © 2012 Pinehead.tv

Quote Keepr is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

StreamDash is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var win = Titanium.UI.currentWindow;

/* to do */
//add shake for next quote as well

Titanium.include('dbsettings.js');

var db = Titanium.Database.install('../sql/qk.db', dbVersion);

var ingrRS = db.execute('select * from quotes order by RANDOM() LIMIT 1');

var picker_data = [];
//alert(ingrRS.isValidRow())

while (ingrRS.isValidRow()) {
    var quote = ingrRS.fieldByName('quote');
    var name = ingrRS.fieldByName('name');
    //name = '- ' + name; 
   // var quote = ' "' + quote +  '" \n\n- ' + name;
    ingrRS.next();
    var length = quote.length;
    

if(length >=124) {
	
	var label1 = Titanium.UI.createLabel({
	color:'#565656',
	text:quote,
	font:{fontSize:14,fontFamily:'Helvetica Neue',fontWeight:'bold'},
	textAlign:'left',
	top:60,
	right:'auto',
	height:'auto',
	width:280
});
} else {
	

var label1 = Titanium.UI.createLabel({
	color:'#565656',
	text:quote,
	font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight:'bold'},
	textAlign:'left',
	top:60,
	right:'auto',
	height:'auto',
	width:280
});
}

var lblName = Titanium.UI.createLabel({
	
	color:'#565656',
	text:name,
	font:{fontSize:16,fontFamily:'Helvetica Neue',fontWeight:'bold'},
	textAlign:'left',
	top:210,
	left:125,
	height:'auto',
	width:200
	
	
});

win.add(label1);
win.add(lblName);

}

//win.add(lblName);


var newQuote = Titanium.UI.createButton({
	
	title:'Next Quote',
    height: 35,
   	right:'auto',
    bottom: 15,
    width: 250,
    backgroundColor: '#b3b3b3',
    borderColor: '#cccccc',
    color: '#000000',
    borderWidth: '2',
    borderRadius:5,
    backgroundImage: 'none',
	size: {height:250, width: 220}
	
});

newQuote.addEventListener('click', function(e) {
	
db = Titanium.Database.open(dbVersion);	
var ingrRS = db.execute('select * from quotes order by RANDOM() limit 1');

var picker_data = [];

while (ingrRS.isValidRow()) {
    var quote = ingrRS.fieldByName('quote');
    name = ingrRS.fieldByName('name');
   // name = '- ' + name;
    // var quote = ' "' + quote +  '" \n\n- ' + name;
    ingrRS.next();
   length = quote.length;

	label1.text = quote;
	lblName.text = name;

	if (length >= 124) {
	label1.font = {fontSize:14,fontFamily:'Helvetica Neue',fontWeight:'bold'};

	} else {
		
	label1.font = {fontSize:18,fontFamily:'Helvetica Neue',fontWeight: 'bold'};
	}
}

	
});





win.add(newQuote);



//Get time in settings





function runNotification() {
	db = Titanium.Database.open(dbVersion);	
var ingrRS = db.execute('select * from quotes order by RANDOM() limit 1');
	quote = ingrRS.fieldByName('quote');
	name = ingrRS.fieldByName('name');
//alert(quote);

	var sql = db.execute("SELECT * FROM settings");
	var hour = sql.fieldByName('hour');
	var minutes = sql.fieldByName('minutes');
	
	
	var currentNotifyTime = hour + ":" + minutes;

var currentTime = new Date();
var currentMinutes = currentTime.setMinutes(minutes);
var currentHour = currentTime.setHours(hour);
var n = 0; var alertCount = 0; var notification = []; 


//	label1.text = quote;
//	lblName.text = name;
	Titanium.API.info('Notification fired');
function notify(resp) { // This creates the notification alert on a 'paused' app 

/*
	
	notification[n] = Ti.App.iOS.scheduleLocalNotification({
	//Ti.App.IOS.scheduleLocalNotification({ 
	alertBody:quote,
	 alertAction:"View App", 
	 userInfo:{"hello":"world"},
	 repeat:daily,
	 badge:n+1, 
	date:currentHour 
	}); 
	 //badge:n+1, date:'21' }); 
	 //badge:n+1, date: hours; }); 
	 n++; 
	 //Set ma
	*/ 
	 

}
db.close();
}

//etInterval(runNotification,40000);

Ti.App.iOS.addEventListener('notification',function(e) {
    alert (quote);
    // the app closes after receiving this alert
});


var create = Titanium.UI.createButton({
	 systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
});
var settings = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.INFO_LIGHT
});
//win.leftNavButton = settings;
win.rightNavButton = create;
//rightnav = true;


create.addEventListener('click', function(e) {
	
	var createWin = Titanium.UI.createWindow({
		title:'Add Quote',
  	    backgroundColor:'#eee',
    	url:'add.js'
	});
		//createWin.db = db;
		Titanium.UI.currentTab.open(createWin,{animation:true});

//	createWin.open();

});

settings.addEventListener('click', function(e) {
	
	var createWin =  Titanium.UI.createWindow({
		title:'Settings',
		backgroundColor:'#eee',
		barColor:'#1e1e1e',
		url:'notifyTime.js'
		
	});
//	createWin.db = db;
	Titanium.UI.currentTab.open(createWin,{animation:true});
	
});

db.close();


Ti.App.iOS.addEventListener('notification', function(e){
    alert(e);
});


//register background service
var service = Ti.App.iOS.registerBackgroundService({url:'background.js'});
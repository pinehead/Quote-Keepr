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
Titanium.include('dbsettings.js');

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


	
	notification[n] = Ti.App.iOS.scheduleLocalNotification({
	//Ti.App.IOS.scheduleLocalNotification({ 
	alertBody:quote,
	 alertAction:"View App", 
	 userInfo:{"quotes":"Inspiration"},
	 repeat:daily,
	 badge:n+1, 
	date:currentNotifyTime 
	}); 
	 //badge:n+1, date:'21' }); 
	 //badge:n+1, date: hours; }); 
	 n++; 
	 //Set ma
	 
	 

}
db.close();
}


//setTimeout("runNotification",  3600000); 
setTimeout("runNotification",  1000); 
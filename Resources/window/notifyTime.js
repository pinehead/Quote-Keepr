
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


Titanium.include('dbsettings.js');
var db = Titanium.Database.open(dbVersion);
	try {
	var sql = db.execute("SELECT * FROM settings");
	} catch(e) {  alert(e); }
	var hour = sql.fieldByName('hour');

	var minutes = sql.fieldByName('minutes');
	var currentNotifyTime = hour + ":" + minutes;
	
	win.backgroundColor = 'black';

var value = new Date();
db.close();
value.setMinutes(minutes);

value.setHours(hour);
//value.setSeconds(0);

var picker = Ti.UI.createPicker({
	type:Ti.UI.PICKER_TYPE_TIME,
	bottom:0,
	value:value
});

// turn on the selection indicator (off by default)
picker.selectionIndicator = true;

win.add(picker);

var label = Ti.UI.createLabel({
	text:'Choose Quote Notification Time',
	top:6,
	width:'auto',
	height:'auto',
	textAlign:'center',
	color:'white'
});
win.add(label);

picker.addEventListener('change',function(e)
{
	var db = Titanium.Database.open(dbVersion);
	var time = e.value;
	var hours = time.getHours();
	var min = time.getMinutes();
	//var time = hours + ":" + min + ":00";
	//time = time.toString();
	var query = "UPDATE settings SET hour = '" + hours + "', minutes = '" + min + "'";
	//var query = "UPDATE settings SET hour = 10";
	//alert(query);
	//alert("Notifcation Time Updated");
	db.execute(query);
	db.close();
});

var newQuote = Titanium.UI.createButton({
	
	title:'Next Quote',
	 borderRadius: 2,
    height: 25,
    right: 'auto',
    bottom: 15,
    width: 250,
    backgroundColor: '#b3b3b3',
    borderColor: '#cccccc',
    color: '#000000',
    borderWidth: '2',
    backgroundImage: 'none',
	size: {height:250, width: 220}
	
});


newQuote.addEventListener('click', function(e) {
		var sql = db.execute("SELECT * FROM settings");
	var hour = sql.fieldByName('hour');
	alert(hour);
	
});


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
//Edit function
Titanium.include('dbsettings.js');
win.backgroundImage = '../quotekeeper_background.png';
quoteID = win.quoteID;
	var db = Titanium.Database.open(dbVersion);
	var sql = db.execute("SELECT * FROM quotes WHERE id=" + quoteID + "");
	var quote = sql.fieldByName('quote');
	var author = sql.fieldByName('name');
	

var quoteText = Titanium.UI.createTextArea({
	editable: true,
	value:quote,
	height:150,
	width:300,
	top:10,
	font:{fontSize:20,fontFamily:'Marker Felt', fontWeight:'bold'},
	color:'#888',
	textAlign:'left',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,	
	borderWidth:2,
	borderColor:'#bbb',
	borderRadius:5,
	//suppressReturn:false


});
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var trash = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.TRASH
});
var reply = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REPLY
});
var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
var edit = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.EDIT
});
var save = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.SAVE
});

//win.toolbar = [flexSpace,edit,flexSpace,trash];

trash.addEventListener('click', function(e) {
	
	var sql = db.execute("DELETE FROM quotes where id='" + quoteID + "'");
	var win = Titanium.UI.createWindow({
		url:'list_quotes.js',
		 barColor:'#1e1e1e',
	});
	win.author = author;
	Titanium.UI.currentWindow.close();
	//Titanium.UI.currentTab.open(win,{animation:true});
	
});

win.add(quoteText);
win.toolbar = [flexSpace,save,flexSpace,trash];


save.addEventListener('click', function(e) {
		
		
		//sql to update the result
		var update = "UPDATE quotes SET quote='"+ quoteText.value +"'  WHERE id = "+ quoteID +"";
		db.execute(update);	
	
		
		
	alert("Quote Saved");    

});
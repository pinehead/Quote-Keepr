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
/*To do for show quote */
//Add system button bar on bottom
//Add icons for delete and edit
//If edit is selected then make fields editable

var quoteID = win.quoteID;

var data = [];

	//var db = Titanium.Database.install('../sql/quotes.db', 'tes1t.db');
	var db = Titanium.Database.open(dbVersion);
	var sql = db.execute("SELECT * FROM quotes WHERE id=" + quoteID + "");

	var quote = sql.fieldByName('quote');
	var pak = sql.fieldByName('pak');
	
	
	var author = sql.fieldByName('name');
	var id = sql.fieldByName('id');
  	//var quote1 = ' "' + quoteSQL +  '" \n\n- ' + author;
    var length = quote.length;
if(length >=124) {
	
	var label1 = Titanium.UI.createLabel({
	color:'#565656',
	text:quote,
	font:{fontSize:14,fontFamily:'Helvetica Neue',fontWeight: 'bold'},
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
	font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight: 'bold'},
	textAlign:'left',
	top:60,
	right:'auto',
	height:'auto',
	width:280
});
}

var author = Titanium.UI.createLabel({
color:'#565656',
	text:author,
	font:{fontSize:16,fontFamily:'Helvetica Neue',fontWeight: 'bold'},
	textAlign:'left',
	top:210,
	left:125,
	height:'auto',
	width:200
});


var quoteEdit = Titanium.UI.createTextArea({
	
	editable: true,
	value:quote,
	height:150,
	width:300,
	top:10,
	font:{fontSize:20,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	color:'#888',
	textAlign:'left',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,	
	borderWidth:2,
	borderColor:'#bbb',
	borderRadius:5,
	
});

win.add(author);
win.add(label1);

//System buttons for quote options
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

win.rightNavButton = edit;
//win.toolbar = [flexSpace,edit,flexSpace,trash];



edit.addEventListener('click', function(e) {
	
	//Turn lable/text box into a visible edit and focus.  Then save.
		win.remove(label1);
		win.add(quoteEdit);
		author.top = 180;
		win.toolbar = [flexSpace,save,flexSpace,trash];
		
	
	
});

trash.addEventListener('click', function(e) {
	
	var sql = db.execute("DELETE FROM quotes where id='" + quoteID + "'");
	var win1 = Titanium.UI.createWindow({
		url:'list_quotes.js',
		 barColor:'#1e1e1e',
	});
	
	win1.author = author;
	Titanium.UI.currentWindow.close();	
	Titanium.UI.currentTab.open(win1,{animation:true});

});
save.addEventListener('click', function(e) {
	
	//sql to update the result
		var update = "UPDATE quotes SET quote=\""+ quoteEdit.value +"\"  WHERE id = "+ quoteID +"";
		
		db.execute(update);	
//
		author.top = 210;
		//sql goes here
		sql = db.execute("SELECT * FROM quotes WHERE id=" + quoteID + "");	
		quote = sql.fieldByName('quote');
	
	
	var quoteChange = Titanium.UI.createLabel({
	color:'#565656',
	text:quote,
	font:{fontSize:20,fontFamily:'Helvetica Neue',fontWeight: 'bold'},
	textAlign:'left',
	top:80,
	editable:true,
	right:'auto',
	height:'auto',
	width:300
	
});

	// change text field back
	win.remove(quoteEdit);
	win.add(quoteChange);
	
	win.toolbar = [];
	
});



/*
deleteQuote.addEventListener('click', function(e) {
	var sql = db.execute('DELETE FROM quotes where id=id');
	
	
});
*/

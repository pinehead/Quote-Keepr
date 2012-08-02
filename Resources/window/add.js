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

win.backgroundImage = '../quotekeeper_background.png';
win.barColor = 'black';
//create scroll view
var showAuthor = win.author;
Titanium.include('dbsettings.js');
var db = Titanium.Database.install('../sql/qk.db', dbVersion);
 
var scrollView = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:0,
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true
});

var view = Titanium.UI.createView({
	backgroundColor:'#336699',
	borderRadius:10,
	width:300,
	height:'auto',
	top:10
	
});

scrollView.add(view);
//add textarea input


var quote = Titanium.UI.createTextArea({
	editable: true,
	value:'Enter Quote',
	height:150,
	width:300,
	top:10,
	font:{fontSize:20,fontFamily:'Madrid', fontWeight:'bold'},
	color:'#888',
	textAlign:'left',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,	
	borderWidth:2,
	borderColor:'#bbb',
	borderRadius:5,
	//suppressReturn:false


});
//Author placeholder not showing up.

quote.addEventListener('focus', function(e) {
	if(quote.value == "Enter Quote") {
	quote.value = "";
	}

});


scrollView.add(quote);

var author = Titanium.UI.createTextField({
	height:35,
	value:'Author',
	editable:true,
	font:{fontSize:20, fontFamily:'Madrid', fontWeight:'bold'},
	top:170,
	width:200,
	BorderColor:'#bbb',
	color:'#888',
	borderWidth:2,
	backgroundColor:'white',
	borderRadius:5,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT	

});

author.addEventListener('focus', function(e) {
	if(author.value == "Author") {
	author.value = "";
	}
});

if(showAuthor != null) { 
		author.value = showAuthor;
}
scrollView.add(author);

var add = Titanium.UI.createButton({

    height: 73,
    right: 'auto',
    bottom: 75,
    width: 122,
    backgroundImage:'../quotekeeperbtnwithboth.png',
    color: '#000000',

	size: {height:73, width: 122}
	
	
});

var save = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.systemButton.SAVE
});

scrollView.add(add);

add.addEventListener('click', function(e) {


	if(quote.value == "" || quote.value == "Enter Quote") { alert("Please enter a quote"); } 
	
	else {
	
		if(author.value == "" || author.value == "Author") { author.value = "Unknown"; }

	//var sql = db.execute("INSTER INTO quotes (name, quote) VALUES ('"+author.value+"','"+quote.value+"')");
	var query = 'INSERT INTO quotes (name, quote) VALUES("'+author.value+'","'+quote.value+'")';
	try {
	db.execute(query);
	} catch(e) { //alert("problem" + e);
	 }



	

var url = "http://quotekeepr.com/includes/bin/post.php?quote="+quote.value+"&author="+author.value;

if(Titanium.Network.online) {
var xhr = Ti.Network.createHTTPClient();
xhr.setTimeout(99000);
 
xhr.onload = function() {
    Ti.API.info('got my response, http status code ' + this.status);
};
 
xhr.open('GET', url, false);
xhr.send();
}
	var win  = Titanium.UI.createWindow({
		url:'show.js',
		title:'My Quotes',
		barColor:'#1e1e1e'
		
	});
	alert("Quote Added");
	//Titanium.UI.currentWindow.close();
	Titanium.UI.currentTab.open(win, {animation:true});
	//Titanium.UI.currentWindow.close();
		
	//alert(author);
	//alert(quote);
	author = author.value;
	quote = quote.value;

 } //End if statement that checks for a quote

});



win.add(scrollView);



//insert into mysql db for quote feed
//check and see if the person has internet access




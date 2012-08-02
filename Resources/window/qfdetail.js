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

var id = win.quoteID;
var quote = win.quote;
var author = win.author;
var downloaded = win.downloaded;
Titanium.include('dbsettings.js');
var length = quote.length;

if(length >=118) {
var lblquote = Titanium.UI.createLabel({
	color:'#565656',
	text:quote,
	font:{fontSize:16,fontFamily:'Helvetica Neue',fontWeight:'bold'},
	textAlign:'left',
	top:55,
	right:'auto',
	height:'auto',
	width:280
});

} else {
	
var lblquote = Titanium.UI.createLabel({
	color:'#565656',
	text:quote,
	font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight:'bold'},
	textAlign:'left',
	top:55,
	right:'auto',
	height:'auto',
	width:280
});

}
var lblauthor = Titanium.UI.createLabel({
	
	color:'#565656',
	text:author,
	font:{fontSize:16,fontFamily:'Helvetica Neue',fontWeight:'bold'},
	textAlign:'left',
	top:210,
	left:125,
	height:'auto',
	width:200
	
	
});

var add = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.ADD
});

add.addEventListener('click', function(e) {
	alert('Added to your personal database');
	var db = Titanium.Database.open(dbVersion);
	downloaded++;
	//alert(downloaded);
	// Check and see if you have already added the quote or not.
	

	var rows = db.execute('INSERT INTO quotes (name, quote) VALUES("'+author+'","'+quote+'")');
	
var url = "http://quotekeepr.com/includes/bin/post.php?quoteid="+id+"&downloaded="+downloaded;
//alert(url);

var xhr = Ti.Network.createHTTPClient();
xhr.setTimeout(99000);
 
xhr.onload = function() {
    Ti.API.info('got my response, http status code ' + this.status);
};
 
xhr.open('GET', url, false);
xhr.send();

	
});

win.rightNavButton = add;
win.add(lblquote);
win.add(lblauthor);



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
// create table view data object
var data = [];
var help = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.INFO_LIGHT
});
win.rightNavButton = help;

help.addEventListener('click', function(e) {
	var newWin =  Titanium.UI.createWindow({
		title:'Quote Pak Help',
		barColor:'#1e1e1e',
		backgroundColor:'#eee',
		url:'storehelp.js'
		
	});
	Titanium.UI.currentTab.open(newWin,{animation:true});
	
});
function runFeed() {
var resfreshXhr = Ti.Network.createHTTPClient();
resfreshXhr.open("GET","http://quotekeepr.com/includes/store.php?update=true");
resfreshXhr.send();
var xhr = Ti.Network.createHTTPClient();


xhr.open("GET", "http://quotekeepr.com/includes/store.xml");

	

xhr.onload = function()
{
	try
	{
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("item");
		var x = 0;
		for (var c=0;c<items.length;c++)
		{
			var item = items.item(c);
			
		
				
				var quote = item.getElementsByTagName("description").item(0).text;
				var author = item.getElementsByTagName("title").item(0).text;
				var num_quotes = item.getElementsByTagName("num_quotes").item(0).text;
				var added = item.getElementsByTagName("added").item(0).text;
				added = added.substr(0,10);
				var row = Ti.UI.createTableViewRow({height:80,backgroundColor:'#eeeeee'});
				var labelText = author + '\n' + 'Added: ' + added + ' \n' + 'Quotes: ' + num_quotes;
				var label = Ti.UI.createLabel({
					text:labelText,
					left:72,
					top:5,
					bottom:5,
					right:5				
				});
				row.add(label);
				var img;
			
	
				data[x++] = row;
				row.id = item.getElementsByTagName("pak_id").item(0).text;
				row.quote = item.getElementsByTagName("description").item(0).text;
				row.author =  item.getElementsByTagName("title").item(0).text;
				row.num_quotes = item.getElementsByTagName("num_quotes").item(0).text;
				row.added = item.getElementsByTagName("added").item(0).text;
				row.downloaded = item.getElementsByTagName("downloaded").item(0).text;
			
		}
		var tableview = Titanium.UI.createTableView({data:data});
		Titanium.UI.currentWindow.add(tableview);
		tableview.addEventListener('click',function(e)
		{
			
			var win = Titanium.UI.createWindow({
			
			title:e.row.title,
			barColor:'#1e1e1e',
			url:'pak_detail.js',
			backgroundImage: '../single_quote_large2.png'
		
		});	
		win.pakID = e.row.id;
		win.quote = e.row.quote;
		win.desc = e.row.quote;
		win.author = e.row.author;
		win.added = e.row.added;
		win.num_quotes = e.row.num_quotes;
		win.downloaded = e.row.downloaded;
	Titanium.UI.currentTab.open(win,{animation:true});
		
			//var w = Ti.UI.createWindow({title:doctitle});
			//var wb = Ti.UI.createWebView({url:e.row.url});
		
			//win.open({modal:true});
		});
	}
	catch(E)
	{
		alert(E);
	}
};
xhr.send();

}

var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});

win.leftNavButton = refresh;

refresh.addEventListener('click', function(e) { 
	runFeed();
	});

runFeed();

var bb2 = Titanium.UI.createButtonBar({
	labels:['Installed Paks'],
	backgroundColor:'maroon'
});
var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

win.setToolbar([flexSpace,bb2,flexSpace]);
bb2.addEventListener('click', function(e)
{
	//var l.text = 'You clicked index = ' + e.index;
	if(e.index == 0) { 
		
		var  newWin = Titanium.UI.createWindow({
		
		title:'Installed Paks',
		barColor:'#1e1e1e',
		backgroundColor:'#eee',
		url:'installed_paks.js'
		});
	
		Titanium.UI.currentTab.open(newWin,{animation:true});
		
		
		
		}
	
});





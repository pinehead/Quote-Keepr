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
		title:'Quote Feed Help',
		barColor:'#1e1e1e',
		backgroundColor:'#eee',
		url:'qfhelp.js'
		
	});
	Titanium.UI.currentTab.open(newWin,{animation:true});
	
});
function runFeed() {
var resfreshXhr = Ti.Network.createHTTPClient();
resfreshXhr.open("GET","http://quotekeepr.com/includes/rss.php?update=true");
resfreshXhr.send();
var xhr = Ti.Network.createHTTPClient();


xhr.open("GET", "http://quotekeepr.com/includes/feed.xml");

	

xhr.onload = function()
{
	try
	{
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("item");
		var x = 0;
		var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
		for (var c=0;c<items.length;c++)
		{
			var item = items.item(c);
			
		
				
				var quote = item.getElementsByTagName("description").item(0).text;
				var author = item.getElementsByTagName("title").item(0).text;
				quote = author + ' - \n' + quote;
				var row = Ti.UI.createTableViewRow({height:100, 
					backgroundGradient : {
    		   type:'linear',
    		   colors:[{color:'#ffffff',position:0.0},{color:'#eeeeee',position:1.0},{color:'#ffffff',position:0}]
      },
					
					
					});
				var text = quote + '\n - ' + author;
			
				var label1 = Ti.UI.createLabel({
					text:author,
					
					font:{fontSize:12,fontFamily:'Helvetica Neue'},
					left:10,
					top:1				
				});
			//	row.add(label1);
					var label = Ti.UI.createLabel({
					text:quote,
					color:'#565656',
					font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight:'bold'},
					left:10,
					top:10,
					
					bottom:10,
					right:10				
				});
				row.add(label);
			
			
	
				data[x++] = row;
				row.id = item.getElementsByTagName("quote_id").item(0).text;
				row.quote = item.getElementsByTagName("description").item(0).text;
				row.author = item.getElementsByTagName("title").item(0).text;
				row.downloaded = item.getElementsByTagName("downloaded").item(0).text;
			
		}
		var tableview = Titanium.UI.createTableView({data:data});
		Titanium.UI.currentWindow.add(tableview);
		tableview.addEventListener('click',function(e)
		{
			
			var win = Titanium.UI.createWindow({
			
			title:e.row.title,
			barColor:'#1e1e1e',
			url:'qfdetail.js',
			backgroundImage: '../single_quote_large2.png'
		
		});	
		win.quoteID = e.row.id;
		win.quote = e.row.quote;
		win.author = e.row.author;
		win.downloaded = e.row.downloaded;
	Titanium.UI.currentTab.open(win,{animation:true});
		
			//var w = Ti.UI.createWindow({title:doctitle});
			//var wb = Ti.UI.createWebView({url:e.row.url});
		
			w.open({modal:true});
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

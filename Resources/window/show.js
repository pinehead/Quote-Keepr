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


//Create Table View
Titanium.include('dbsettings.js');




var tableview = Titanium.UI.createTableView({
	editable:true
	
});




var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});

function setData(refresh) 
{
	
	if(db) { db.close(); }
	author = "";
	quoteID = "";
	var data = [];


	var db = Titanium.Database.open(dbVersion);

	//var db1 = Titanium.Database.install('../sql/quotes.db', 'tes1t.db');
	var sql = db.execute("SELECT distinct * FROM quotes GROUP BY name");

	while(sql.isValidRow()) {
	var author = sql.fieldByName('name');
	var quoteID = sql.fieldByName('id');
	data.push({title:author, hasChild:true,  id:quoteID, test:'list_quotes.js'});		
	sql.next();		
	}
	
	tableview.setData(data);
	db.close();
	
}

setData();




if (Ti.Platform.name == 'iPhone OS') {
	win.leftNavButton = refresh;
} else {
	refresh.top = 5;
	refresh.title = "Refresh";
	refresh.width = 200;
	tableview.top = 60;
	win.add(refresh);
}


refresh.addEventListener('click', function() 
{
	tableview.setData([]);
	setTimeout(function() 
	
	{
		setData(true);
	
	}, 1000);
	
	
});



tableview.addEventListener('delete', function(e) {
	var db = Titanium.Database.open(dbVersion);
	var author = e.rowData.title
	

	

	var sql = db.execute("DELETE FROM quotes WHERE name='" + author + "'");

	
db.close();

});

tableview.addEventListener('click', function(e) {

	
	if(e.rowData.test) 
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title,
			backgroundColor:'#eee',
			 barColor:'#1e1e1e'
			
		});	
		
		win.author = e.rowData.title;
	Titanium.API.info('Id is: ' + win.author);
	Titanium.UI.currentTab.open(win, {animation:true});
	
	}

});

var create = Titanium.UI.createButton({
	 systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
});



win.rightNavButton = create;
rightnav = true;


create.addEventListener('click', function(e) {
	
	var createWin = Titanium.UI.createWindow({
		title:'Add Quote',
		 barColor:'#1e1e1e',
  	    backgroundColor:'#eee',
    	url:'add.js'
	});
		Titanium.UI.currentTab.open(createWin,{animation:true});

//	createWin.open();

});

win.add(tableview);


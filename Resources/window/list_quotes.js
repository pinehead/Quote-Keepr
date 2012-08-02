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

/*To do on this page*/
//Add create button but if you are under author, then have the add.js auto populate the author.

var showAuthor = win.author;
Titanium.include('dbsettings.js');

var tableview = Titanium.UI.createTableView({
	
	editable:true
//	allowsSlectionDuringEditing:true	
});

function setData() 
{
var data = [];

	var db1 = Titanium.Database.install('../sql/qk.db', dbVersion);
	var sql = db1.execute("SELECT distinct * FROM quotes WHERE name='" + showAuthor + "'");

	while(sql.isValidRow()) {
	var author = sql.fieldByName('quote');
	var quoteID = sql.fieldByName('id');
	data.push({title:author, hasChild:true,id:quoteID, test:'show_quote.js'});		
	sql.next();		
	
	}
	tableview.setData(data);
db1.close();

}

setData();


tableview.addEventListener('delete', function(e) {
	
	var id = e.rowData.id;
	Titanium.API.info('delete id is' + id);
	var db = Titanium.Database.open(dbVersion);
	var sql = db.execute("DELETE FROM quotes WHERE id=" + id + "");
	
	
});


tableview.addEventListener('click', function(e) {

	if(e.rowData.test) 
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title,
			barColor:'#1e1e1e',
			backgroundImage: '../single_quote_large2.png'
		
		});	
		win.quoteID = e.rowData.id;
	Titanium.UI.currentTab.open(win,{animation:true});
	
	}

});
//Create new quote but auto populate author
var create = Titanium.UI.createButton({
	 systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
});

var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});


var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});




if (Ti.Platform.name == 'iPhone OS') {
	win.setToolbar([flexSpace,refresh,flexSpace]);
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


win.rightNavButton = create;
rightnav = true;


create.addEventListener('click', function(e) {
	
	var createWin = Titanium.UI.createWindow({
		title:'Add Quote',
		barColor:'#000',
  	    backgroundColor:'#eee',
    	url:'add.js'
	});
		createWin.author = showAuthor;
		
		Titanium.UI.currentTab.open(createWin,{animation:true});

//	createWin.open();

});

win.add(tableview);


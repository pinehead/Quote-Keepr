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

//name = win.pak;
var db = Titanium.Database.install('../sql/qk.db', dbVersion);

//db.execute("insert into pak (id,name) values (0,'tester')");
//db.execute('insert into pak (name) values ("leadership2")');
var ingrRS = db.execute('select * from pak');

var data = [];
//alert(ingrRS.isValidRow())

while (ingrRS.isValidRow()) {
   // var quote = ingrRS.fieldByName('quote');
    var name = ingrRS.fieldByName('name');
      var id = ingrRS.fieldByName('id');
  // alert(id);

     	trueName = name;
  	name = name;
  	
 
  	data.push({title:name, hasChild:true, author:trueName, installed:true, pakID:id, test:'pak_detail.js'});		
  
  
  
    ingrRS.next();
   }
   
   
   var tableview = Titanium.UI.createTableView({
	data:data,
	editable:false
	
	
});




tableview.addEventListener('click', function(e) {

	
	if(e.rowData.test) 
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			author:e.rowData.title,
			//pakID:e.rowData.pakID,
			installed:true,
			trueName:trueName,
			backgroundColor:'#eee',
			 barColor:'#1e1e1e'
			
		});	
		
		win.quote = e.rowData.title;
		
		win.pakID = e.rowData.pakID;
		win.trueName = e.rowData.trueName;
	Titanium.API.info('Id is: ' + win.author);
	Titanium.UI.currentTab.open(win, {animation:true});
	
	}

});

	

win.add(tableview);
    
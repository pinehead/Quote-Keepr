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
win.backgroundImage = '../box.png';

//get pak info
var db = Titanium.Database.install('../sql/qk.db', dbVersion);

//db.execute("insert into pak (id,name) values (0,'tester')");
var ingrRS = db.execute('select distinct name from pak');


var installedName = win.trueName;
if(installedName == null) { var installedName = win.author;}
var id = win.pakID;

	var query = "select * from pak where id=" + id;
	
var rows = db.execute(query);
	var quote = rows.fieldByName('desc');
	

if (rows.isValidRow()) { var isInstalled = true; }
var quote = 'Description: ' + win.quote;
var num_quotes = win.num_quotes;
var name = 'Pak Name: \n \n' + win.author ;
var downloaded = win.downloaded;
var added =  'Added On: ' + win.added;
if(num_quotes == null) {
	var db1 = Titanium.Database.open(dbVersion);
	var query1 = "select count(*) as quote_count from quotes where pak='"+installedName+"'";
	var sql = db1.execute(query1);
	var num_quotes = sql.fieldByName('quote_count');
	db1.close();

	
	
}


db.close();
var install = Titanium.UI.createButton({
	
	title:'Install Quote Pak',
    height: 35,
    right: 'auto',
    bottom: 15,
    width: 250,
    backgroundColor: '#b3b3b3',
    borderColor: '#cccccc',
    color: '#000000',
    borderWidth: '2',
    borderRadius:5,
    backgroundImage: 'none',
	size: {height:250, width: 220}
	
});

	
	var uninstall = Titanium.UI.createButton({
	
	title:'uninstall Quote Pak',
    height: 35,
    right: 'auto',
    bottom: 15,
    width: 250,
    backgroundColor: '#b3b3b3',
    borderColor: '#cccccc',
    color: '#000000',
    borderWidth: '2',
    borderRadius:5,
    backgroundImage: 'none',
	size: {height:250, width: 220}
	
});
	
	







var lblquote = Titanium.UI.createLabel({
	color:'#565656',
	text:quote + '\n\nQuotes in pak: ' + num_quotes,
	font:{fontSize:18,fontFamily:'Helvetica Neue',fontWeight: 'bold'},
	textAlign:'left',
	top:55,
	right:'auto',
	height:'auto',
	width:280
});

var lblauthor = Titanium.UI.createLabel({
	
	color:'#565656',
	text:name,
	font:{fontSize:16,fontFamily:'Helvetica Neue',fontWeight: 'bold'},
	textAlign:'left',
	top:230,
	left:70,
	height:'auto',
	width:200
	
	
});


var add = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.ADD
});


function install() {
	//check to see if the id is in pak (id) if not then install else notify the person they have already installed it or setup an install status
	var db = Titanium.Database.open(dbVersion);
	var rows = db.execute("select id from pak where id =" + id);
	if(!rows.isValidRow()) { 
		alert("This pak does not exist");
	} else {
		alert("Quote Pak is already installed");
		
	}	
}

uninstall.addEventListener('click', function(e) {
		db = Titanium.Database.open(dbVersion);	
	db.execute("delete from quotes where pak='"+ installedName +"'");

	var query = 'DELETE FROM quotes WHERE pak="' + installedName + '"';	

	db.close();
		db = Titanium.Database.open(dbVersion);	
	//alert(query);
//	query = 'DELETE FROM pak WHERE name="' + installedName + '"'; // change from pak name to pak id 908 pm 
	query = 'DELETE FROM pak where id='+id;
	db.execute(query);
	//alert(query);
	db.close();
	alert("Quote Pak Removed");
	win.remove(uninstall);
	win.add(install);
	
});

install.addEventListener('click', function(e) {

	var xhr = Titanium.Network.createHTTPClient();
	var url = "http://quotekeepr.com/includes/install.php?id=" + win.pakID;

	xhr.open("GET", url);
	

	xhr.onload = function() {
	   try { 
        var json = JSON.parse(this.responseText);  
    } catch(e) {Ti.API.log('ERROR');}

 
for (var i = json.length -1; i >=0 ; --i) {
		var o = json[i];
	
	var author = o.name;
	var quote = o.quote;
	var pak = o.pak;
	var db = Titanium.Database.open(dbVersion);
	var query = 'INSERT INTO quotes (name, quote, pak) VALUES ("'+author+'","'+quote+'","'+pak+'")';

//var query = 'INSERT INTO quotes (name, quote) VALUES("'+author+'","'+quote+'")';
//alert(query);

	db.execute(query);

//	alert("done");

	}
		db.close();
		db = Titanium.Database.open(dbVersion);	
	query = 'insert into pak (name,id,desc) values ("'+win.author+'","'+win.pakID+'","'+win.desc+'")';

	db.execute(query);
	alert("Quote Pak Installed");	
	win.remove(install);
	win.add(uninstall);
	db.close();

	}
	
xhr.send();

	//need to add code that add's the id to the database in order for the check above to work.



 });
	 
	 
	 
	 

add.addEventListener('click', function(e) {
		//check to see if the id is in pak (id) if not then install else notify the person they have already installed it or setup an install status
	var db = Titanium.Database.open(dbVersion);
	var rows = db.execute("select id from pak where id =" + id);
	if(!rows.isValidRow()) { 
		alert("This pak does not exist");
	} else {
		alert("Quote Pak is already installed");
		
	}	
	
});


win.add(lblauthor);

win.add(lblquote);
if(!isInstalled) { 
	win.add(install);
//win.rightNavButton = add;
} else {
win.add(uninstall);
}
	

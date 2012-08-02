
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
*/var win = Titanium.UI.currentWindow;

var aboutText = "Quote Keepr is an inspirational app that is developed to allow you to always remember and utalize those inspirational quotes.  Instead of just leaving them in a journal and never seeing them again.";

var about = Titanium.UI.createLabel({
	text:"Quote Keepr About stuff",
	top:100,
	width:'auto',
	height:'auto',
	textAlign:'center',
	color:'black'	
});

win.add(about);


var notifyLable = Titanium.UI.createLabel({
	text:"Quote Keepr sends you a notification daily with a quote.  What time would you like that to be?",
	top:6,
	width:'auto',
	height:'auto',
	textAlign:'center',
	color:'black'
	
});

win.add(notifyLable);

//tell what time it is currently going to notify


	

var changeTime = Titanium.UI.createButton({
	title:'Change Time',
	 borderRadius: 2,
    height: 25,
    right: 'auto',
    bottom: 15,
    width: 250,
    backgroundColor: '#b3b3b3',
    borderColor: '#cccccc',
    color: '#000000',
    borderWidth: '2',
    backgroundImage: 'none',
	size: {height:250, width: 220}
	
});

win.add(changeTime);

changeTime.addEventListener('click', function(e) {
	var win = Titanium.UI.createWindow({
		title:'Change Notification Time',
		barColor:'black',
		url:'notifyTime.js'
	});
	Titanium.UI.currentTab.open(win,{animation:true});
		
});

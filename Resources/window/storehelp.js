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

var lbltext = "The Quote Pak store allows you to see and download groups of quotes based on topic and genre. View quotes paks then add them to your personal database by clicking on the \"Install Quote Pak\"  button located in the bottom on the quote pak detail page. ";

var lblName = Titanium.UI.createLabel({
	
	color:'#565656',
	text:lbltext,
	font:{fontSize:16,fontFamily:'Helvetica Neue',fontWeight: 'bold'},
	textAlign:'left',
	top:10,
	left:'auto',
	height:'auto',
	width:300
	
	
});

win.add(lblName);
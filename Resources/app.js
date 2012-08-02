// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Quote Keepr',
    backgroundColor:'#eee',
 //  barColor: '#b3b3b3',
    barColor:'#1e1e1e',
    backgroundImage: 'single_quote_large2.png',
    tabBarHidden:false,
    url: 'window/rand_quote.js'
});

var tab1 = Titanium.UI.createTab({  
    icon:'08-chat.png',
    title:'Daily Quote',
    window:win1
});

var win5 = Titanium.UI.createWindow({  
    title:'Quote Paks',
    backgroundColor:'#eee',
 //  barColor: '#b3b3b3',
    barColor:'#1e1e1e',
    backgroundImage: 'single_quote_large2.png',
    tabBarHidden:false,
    url: 'window/store.js'
});

var tab5 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Quote Paks',
    window:win5
});
//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Add Quote',
    backgroundColor:'#eee',
     barColor:'#1e1e1e',
    url:'window/add.js'
});

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var win4 = Titanium.UI.createWindow({
	title:'Public Quote Feed',
	barColor:'#1e1e1e',
	backgroundImage: 'single_quote_large2.png',
	backgroundColor:'#eee',
	url:'window/feed.js'
	
});

var tab4 = Titanium.UI.createTab({
	//icon:'KS_nav_mashup.png',
	icon:'09-chat-2.png',
	title:'Quote Feed',
	window:win4
	
});


var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var win3 = Titanium.UI.createWindow({
	title:'My Quotes',
	backgroundColor:'#eee',
	 barColor:'#1e1e1e',
	url:'window/show.js'
	
});

var tab3 = Titanium.UI.createTab({
	icon:'33-cabinet.png',
	title:'My Quotes',
	window:win3
	
});


//
//  add tabs
//
tabGroup.addTab(tab1);  
//tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);
// open tab group
tabGroup.open();

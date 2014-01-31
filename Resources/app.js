// Table Data
var table = require('data');
var row = require('rows');
var tableData = [];
var db = Titanium.Database.open('redditDb');
//db.execute('DELETE FROM redData');
db.execute('CREATE TABLE IF NOT EXISTS redData (id INTEGER PRIMARY KEY, author TEXT, title TEXT, img TEXT)');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Project 4',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    //icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

win1.add(table.data);

var editWin = Titanium.UI.createWindow({  
    title:'Edit User',
    backgroundColor:'#fff'
});

var authorEdit = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  top: 10, 
  width: 250, height: 60,
  hintText:"Author",
  clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS
});
var titleEdit = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  top: 80, 
  width: 250, height: 60,
  hintText:"Title",
  clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS
});
var imgEdit = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  top: 150, 
  width: 250, height: 60,
  hintText:"Image",
  clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
  keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
  maxLength: 3
});

var saveBtn = Titanium.UI.createButton({
		title: "UPDATE",
        color: "white",
        backgroundColor: "blue",
        top: 230,
        width: 250,
        height: 50,
        borderRadius: 5,
        opacity: 0.75,
        font: { fontSize: 20, fontWeight: "semibold" }
});

var cancelBtn = Titanium.UI.createButton({
		title: "CANCEL",
        color: "white",
        backgroundColor: "blue",
        top: 300,
        width: 250,
        height: 50,
        borderRadius: 5,
        opacity: 0.75,
        font: { fontSize: 20, fontWeight: "semibold" }
});

editWin.add(authorEdit, titleEdit, imgEdit, saveBtn, cancelBtn);

var opt = {
	cancel: 2,
	options: ['Edit', 'Delete', 'Cancel'],
	selectedIndex: 2,
	destructive: 1,
	title: 'Delete or Edit post?'
};

table.data.addEventListener('click', function(e){
	var id = e.rowData.id;
	var author = e.rowData.author;
	var title = e.rowData.title;
	var img = e.rowData.img;
	
	var dialog = Ti.UI.createOptionDialog(opt);
	
	dialog.addEventListener('click', function(e){
		if(e.index === 0){
			authorEdit.value = author;
			titleEdit.value = title;
			imgEdit.value = img;
			
			editWin.open();
			
			var saveIt = function(){
	
				if( authorEdit.hasText() === false){
					alert("Missing Author!");
				}else if( titleEdit.hasText() === false){
					alert("Missing Title!");
				}else if( imgEdit.hasText() === false){
					alert("Missing Image!");
				}else{
					var a = authorEdit.value;
					var t = titleEdit.value;
					var i = imgEdit.value;
					
					db.execute('UPDATE redData SET author=? WHERE id=?', a, id);
					db.close();
					
					authorEdit.value = "";
					titleEdit.value = "";
					imgEdit.value = "";
					
					authorEdit.blur();
					titleEdit.blur();
					imgEdit.blur();
					
					
					data = row.data();
					table.data.setData(data);
					
					saveBtn.removeEventListener('click', saveIt);
					editWin.close();
					
					alert(author + " " + title +  " Age: " + img + " updated!");
				}
			};
			saveBtn.addEventListener('click', saveIt);
			
			var cancelIt = function(){
				cancelBtn.removeEventListener('click', cancelIt);
				editWin.close();
			};
			cancelBtn.addEventListener('click', cancelIt);
			editWin.open();
		} else if(e.index === 1){
			db.execute('DELETE FROM redData WHERE id=?', id);
			
			data = row.data();
			table.data.setData(data);
			
			alert('Deleted');
		}
	});
	dialog.show();
});

//
//  add tabs
//
tabGroup.addTab(tab1);   


// open tab group
tabGroup.open();



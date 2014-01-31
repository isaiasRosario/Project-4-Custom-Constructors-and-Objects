var row = function(){
	var newData = [];
	db = Titanium.Database.open('redditDb');
	dbReddit = db.execute('SELECT * FROM redData');
	while(dbReddit.isValidRow()){
		var author = dbReddit.fieldByName('author');
		var title = dbReddit.fieldByName('title');
		var img = dbReddit.fieldByName('img');
		
		row = Ti.UI.createTableViewRow({
            height:'85',
            hasChild: true
        });
        authorLabel = Ti.UI.createLabel({
            text: "Author: "+ author,
            font:{fontSize:15,fontWeight:'bold'},
	        height:'auto',
	        left:15,
	        bottom:5,
	        color:'#000',
	        touchEnabled:false
        });
		titleLabel = Ti.UI.createLabel({
        	text:"Title: "+ title,
	        font:{fontSize:8},
	        height:'auto',
	        left:15,
	        right:55,
	        top:10,
	        color:'#000',
	        touchEnabled:false
        });
    	if(img === ""){
    		thumbImg = Ti.UI.createImageView({
    		image:"http://webmaster.ypsa.org/wp-content/uploads/2012/08/no_thumb.jpg",
        	right: 5,
        	height: 40, width: 40,
        	top: 5
        	});
    	}else{
    		thumbImg = Ti.UI.createImageView({
    		image:img,
        	right: 5,
        	height: 40, width: 40,
        	top: 5
        	});
    	};  	
        view = Ti.UI.createView({
        	backgroundColor:"#fff",
        	right: 0,
        	height: 50, width: 50,
        	top: 15
        	//opacity:.5
        });
        
 		view.add(thumbImg);
        row.add(authorLabel, titleLabel, view);
        newData.push(row);
		
		dbReddit.next();
	};
	dbReddit.close();
	return newData;
    //table.data.setData(tableData);
  };
  
exports.data = row;
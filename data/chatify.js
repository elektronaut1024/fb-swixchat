self.port.on("replaceNames", function(replacements) {
	function scan(node){
		var child = node.firstChild;
		while ( child ) {
			if ( child.nodeName == '#text' ) {
				if ( replacements[child.textContent] ) {
					child.textContent = replacements[child.textContent];
				}
			}
			child = child.nextSibling;
		}
	}
	
	function update(){
		var elements = document.getElementsByTagName('a');
		
		for ( var i=0; i<elements.length; i++){
			scan(elements[i]);
		};
	}
	
	update();
	
	var updating = false;
	var observer = new MutationObserver(function(mutations) {
		if ( updating ) return;
		updating = true;
		
		setTimeout(function(){
			update();
		    updating = false;
		},500);
	});
	 
	observer.observe(document.body, { childList: true, subtree: true });
});
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

var replacements = null;

function replaceNames(worker){
	worker.port.emit("replaceNames",replacements);
}

pageMod.PageMod({
	include:'https://www.facebook.com/groups/26420784132/*',
	contentScriptFile: self.data.url('chatify.js'),
	contentScriptWhen: "end",
	onAttach: function(worker){
		if ( !replacements ) {
			var request = require("sdk/request").Request({
			  url: "https://www.facebook.com/notes/swixchatch/real-nicknames/10152038569999133",
			  onComplete: function (response) {
				replacements = {};
				var r = /<p>([\w\s]+)\/([\w\s]+)<\/p>/gi;
				
				while ( true ) {
				    var mapping = r.exec(response.text);
				    if ( !mapping ) break;
				    replacements[mapping[1].trim()] = mapping[2].trim();
				}
				
				replaceNames(worker);
			  }
			});
			request.get();
		} else {
			replaceNames(worker);
		}
	}
});
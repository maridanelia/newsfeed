var request = require('request');
var querystring = require('querystring');

var SC_URL = 'https://api.soundcloud.com/tracks.json';
var SC_CLIENT_ID = '1c3aeb3f91390630d351f3c708148086';
var SC_EMBED_URL = 'https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F';


/**
 * Queries SoundCloud for tracks that match the given query.
 *
 * @param query -- the search query to send to SoundCloud
 *
 * Calls @param callback(error, results):
 *  error -- the error that occurred or null if no error
 *  results -- if error is null, contains the search results
 */
exports.search = function(query, callback) {
	//console.log("souncloud opened");
	//console.log(require);
	var url = SC_URL + '?'+querystring.stringify({client_id : SC_CLIENT_ID, q:query});
	
	request(url, function(error,response,body){
		
	
		if(error){
			callback(error);
		}	 else {
			resultsJSON = JSON.parse(response.body);
			results = [];
			for(var i = 0; i < resultsJSON.length; i++){
				var result = {
					'title' : resultsJSON[i].title,
					'source' : SC_EMBED_URL + resultsJSON[i].id
				 };
				 results.push(result);
			}
			
			callback(null,results);
		}
	
	
	});

};

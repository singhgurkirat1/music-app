var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon
var songs = [
{
        'name': 'Alone',
        'artist': 'Alan walker',
        'album': 'Alone',
        'duration': '02:40',
       'fileName': 'song1.mp3',
	   'image':'img.jpg'
    },
    {
        'name': 'Dont Let Me Down',
        'artist': 'The Chainsmokers',
        'album': 'Single Track',
        'duration': '3:28',
        'fileName': 'song2.mp3',
		'image':'song.jpg'
    },
    {
        'name': 'Speaker  box',
        'artist': 'Lafa Taylor,Bassnectar',
        'album': 'Fast and Furious 8',
        'duration': '4:37',
        'fileName': 'song3.mp3',
		'image':'song1.jpg'
    },
    {
        'name': 'Lean On',
        'artist': 'Major Lazer x DJ Snake feat. MØ; ',
        'album': 'Lean On',
        'duration': '2:56',
        'fileName': 'song4.mp3',
		'image':'song2.jpg'
    },
	{
        'name': 'Dil Mere',
        'artist': 'Kunaal Vermaa',
        'album': 'Single Track',
        'duration': '4:46',
        'fileName': 'song5.mp3',
		'image':'song3.jpg'
    },
	{
        'name': 'Saade Aala',
        'artist': 'Sharry Maan',
        'album': 'Saade Aala',
        'duration': '4:41',
        'fileName': 'song6.mp3',
		'image':'song4.jpg'
    },       
	
      
	]


function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
	function changeCurrentSongDetails(songObj) {
    // Code goes here
	 $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}
	function toggleSong() {           //to toggle the  song means of play and pause
		var song = document.querySelector('audio');
		if(song.paused == true) {
		console.log('Playing');
		$('.play-icon').removeClass('fa-play').addClass('fa-pause');
		song.play();
		}
		else {
		console.log('Pausing');
		$('.play-icon').removeClass('fa-pause').addClass('fa-play');
		song.pause();
		}
		} 
		function updateCurrentTime() {        //for current time of song and for  total length of a song
			var song = document.querySelector('audio');
			//console.log(song.currentTime);
			//console.log(song.duration);
			var currentTime = Math.floor(song.currentTime);
			currentTime = fancyTimeFormat(currentTime);
				var duration = Math.floor(song.duration);
				duration = fancyTimeFormat(duration);
				$('.time-elapsed').text(currentTime);
				$('.song-duration').text(duration);

			}
			function pbf(){
				var elm = document.querySelector('audio');
			var cur = elm.currentTime;
			var dur = elm.duration;
			var percentage = (cur/dur)*100;
			$("#progress-filled").css('width',percentage + "%");
			}
			
			 function addSongNameClickEvent(songObj,position) {     //to select a song
					 var id = '#song' + position;
					$(id).click(function() {
					var audio = document.querySelector('audio');
					var currentSong = audio.src;
					var songName = songObj.fileName;//new variable
					if(currentSong.search(songName) != -1)
					{
					toggleSong();
					}
					else {
					audio.src = songName;
					toggleSong();
					  changeCurrentSongDetails(songObj); 
					}
					});
					}

			
			window.onload = function() {
			updateCurrentTime();
				setInterval(function() {
				updateCurrentTime();
				pbf();
				},1000);
				
				
                 for(var i =0; i < songs.length;i++) {         //for name,artist,album,duration and image  of a song
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
		song.find('.song-image').text(obj.image);
        addSongNameClickEvent(obj,i+1)
    }
			$('#songs').DataTable({
        paging: false
    });
			}				
   $('.welcome-screen button').on('click', function() {        //welcome screen funtioning
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
    $('.play-icon').on('click', function() {
       toggleSong();
    });
    $('body').on('keypress', function(event) {                      //spacebar funtioning
	var target = event.target;
	if (event.keyCode == 32 && target.tagName !='INPUT') {
                 toggleSong();  
                }
            });
			$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});
$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});
function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}
					$('audio').on('ended',function() {
						var audio = document.querySelector('audio');
						if(currentSongNumber < 6) {
							var nextSongObj = songs[currentSongNumber];
							audio.src = nextSongObj.fileName; // Change Soure
							toggleSong(); // Play Next Song
							changeCurrentSongDetails(nextSongObj); // Update Image
							currentSongNumber = currentSongNumber + 1; // Change State
						}
						else {
							$('.play-icon').removeClass('fa-pause').addClass('fa-play');
							audio.currentTime = 0;
						}
					})
					

//searchSong function

const searchSong = () => {
    let searchVal=document.getElementById("search-value").value;
    searchVal=searchVal.trim();
    if(searchVal===""){
        let message="Please Enter a Song Name.";
        displayAlert(message,"red");
    }
    else{
        displaySongs(searchVal);
    }
}

//fetchApi function

const displaySongs = (searchKey) => {
    fetch(`https://api.lyrics.ovh/suggest/${searchKey}`).then((response) => {
        return response.json();
    }).then((apiData) => {
        let songData=apiData.data;
        if(songData!=""){
            const searchResult=document.getElementById("search-result");
        searchResult.innerHTML="";
        songData.map((value) => {
            
           let songRow=document.createElement("div");
           songRow.setAttribute("class","single-result row align-items-center my-3 p-3");
           songRow.innerHTML=`
                 <div class="col-md-9">
                   <h3 class="lyrics-name">${value.title}</h3>
                   <p class="author lead">Album by ${value.artist.name}</span></p>
                 </div>
                <div class="col-md-3 text-md-right text-center">
                   <button class="btn btn-success" data-toggle="modal" data-target="#exampleModalLong" id="lyrics" onclick="getLyrics(event)">Get Lyrics </button>
                   <div style="display:none;"><span>${value.artist.name}</span><span>${value.title}</span></div>
                </div>
                `;
            searchResult.appendChild(songRow);
        });
        }
        else{
            let message="No song found.";
            displayAlert(message,"purple");
        }
    })
    
}

//displayAlert function

const displayAlert = (msg,bgColor) => {
    const alert=document.getElementById("alert");
    alert.style.display="block";
    alert.style.backgroundColor=bgColor;
    const alertMsg=document.getElementById("alert-msg");
    alertMsg.innerText=msg;

}

//getLyrics function

const getLyrics = (event) => {
    let lyrics=event.target.nextElementSibling.children;
    let artist=lyrics[0].innerText;
    let title=lyrics[1].innerText;
    //console.log(songTitle);
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`).then((response) => {
        return response.json();
    }).then((apiData) => {
        let songLyrics=apiData.lyrics;
        songLyrics=songLyrics.trim();
        if(songLyrics===""){
            document.getElementById("exampleModalLongTitle").innerText="No lyrics Found.";
        }
        else{
            document.getElementById("exampleModalLongTitle").innerText=title;
            document.getElementById("modal-body").innerText=songLyrics;
        }
        
    })
}
//search-btn
const searchBtn=document.getElementById("search-btn");
//Adding event handler  on searchBtn
searchBtn.addEventListener("click",searchSong);
//Adding event listener on get lyrics button

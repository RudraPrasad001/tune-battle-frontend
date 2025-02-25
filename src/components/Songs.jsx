import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import styles from  "../stylesheets/Songs.module.css"
import { Link } from "react-router-dom";
function Songs(){
    let [songs,setSongs]=useState({data:[[{}]]});
    async function getSongs(){
          setSongs(await axios.get("http://localhost:3000/songs/getSongs"));
         
    }
    useEffect(() => {
        getSongs();
      }, []);
    return(
        <div className={styles.page}>
            <h1 className={styles.headerSong}>Songs in the Playlist</h1>
            <Link to="/" className={styles.link}><button className={styles.submitButton}>Home</button></Link>
            <Link to="/test" className={styles.link}><button className={styles.submitButton}>Start Game</button></Link>
            
            <div className={styles.container}>
            {
            songs.data[0].length>1&&songs.data[0].map((song,index)=><div key={index} className={styles.songBox}>
                <p className ={styles.songName}>{song.name}</p>
                <p className = {styles.songArtist}>{song.artist}</p>
                <iframe className={styles.songPlay} src={song.spotify_url.replace("open.spotify.com/track/", "open.spotify.com/embed/track/")} 
                 height="80px"></iframe>
                </div>)}
            </div>
        </div>
    );
}
export default Songs;
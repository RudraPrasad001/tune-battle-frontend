import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import styles from  "../stylesheets/Test.module.css"
import Confetti from "react-confetti";
import { motion } from "framer-motion";
function Test(){
    let [songs,setSongs]=useState({data:[[{}]]});
    let [songsCount,setCount]=useState(0);
    let [visible,setVisible]=useState(false);
    let [favSong,setFavSong]=useState();
    let [loading, setLoading] = useState(true);

    async function getSongs() {
        setLoading(true);
        
        if (songsCount === 1) {
            console.log("you win");
        }
    
        const twoSongs = await axios.get("https://tune-battle-backend.onrender.com/songs/getTwoSongs");
        const totsongsCount = (await axios.get("https://tune-battle-backend.onrender.com/songs/getSongs")).data[0].length;
    
        setSongs(twoSongs);
        setCount(totsongsCount);
    
        setLoading(false);
    }
    
    
    async function deleteSong(song){
        
        if(songsCount==2){
            setFavSong(song);
            setVisible(true);
        }
        console.log("trying to delete not "+song._id+"   "+songs.data[0][0]._id);
        if(songs.data[0][0]._id==song._id){
            setSongs(await axios.get(`https://tune-battle-backend.onrender.com/songs/delSong/${songs.data[0][1]._id}`));}
        else{
            setSongs(await axios.get(`https://tune-battle-backend.onrender.com/songs/delSong/${songs.data[0][0]._id}`));
        }
        await getSongs();
    }
    useEffect(() => {
        getSongs();
      }, []);
    return(
        <>
        <div className={styles.page}>
            
           <h1 className={styles.headerSong}>Choose your favourite song</h1>
            
           {!visible && (
    <div className={styles.container}>
        {loading ? (
            <>
                <div className={styles.loaderContainer}>
                    <p className={styles.loaderText}>Loading your bangers... 🔄</p>
                </div>
                <div className={styles.loaderContainer}>
                    <p className={styles.loaderText}>Tuning up the vibe... 🎧</p>
                </div>
            </>
        ) : (
            songs.data[0].length > 1 &&
            songs.data[0].map((song, index) => (
                <div
                    key={index}
                    onClick={() => {
                        deleteSong(song);
                    }}
                    className={styles.songBox}
                >
                    <p className={styles.songName}>{song.name}</p>
                    <p className={styles.songArtist}>{song.artist}</p>
                    <iframe
                        className={styles.songPlay}
                        src={song.spotify_url.replace(
                            "open.spotify.com/track/",
                            "open.spotify.com/embed/track/"
                        )}
                        height="80px"
                    ></iframe>
                </div>
            ))
        )}
    </div>
)}

            
                {visible && (
        <>
        <Confetti width={window.innerWidth} height={window.innerHeight} />

        <motion.div
            className={styles.favSongCard}
            initial={{ scale: 0, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
            <h2 className={styles.congratsText}>🏆 The Winner is 🏆</h2>
            <h1 className={styles.songTitle}>🎶 {favSong.name} 🎶</h1>
            <h3 className={styles.songArtist}>by {favSong.artist}</h3>

            <iframe 
                className={styles.spotifyPlayer} 
                src={favSong.spotify_url.replace("open.spotify.com/track/", "open.spotify.com/embed/track/")} 
                height="100" 
                allow="encrypted-media"
            ></iframe>
        </motion.div>
    </>
)}
            </div>
        </>
    );
}
export default Test;
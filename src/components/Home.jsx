import { useState } from "react";
import axios from 'axios';
import styles from "../stylesheets/Home.module.css"
import { Link } from "react-router-dom";
function Home(props){
    const setIdd = props.func;
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const [id,setId] = useState();
    const [displaySeeSongs,setDisplay]=useState(false);
    const handleSubmit =  (e)=>{
        e.preventDefault();
         axios.get(`${backend_url}/playlist/${id.substring(id.lastIndexOf('/')+1)}`)
         .then(
            (res)=>{
                setIdd(res.data);
                setDisplay(true);
            }
         )
         .catch(error =>{
            console.log(error);
         })
    }
    return(
        <div className={styles.container}>
            <img src="https://i.postimg.cc/6qvdYvGX/tutorial.png" className={styles.tutorialImage} alt="Tutorial" />
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <p className={styles.dataField}>TuneBattle</p>
                    <input type="text" className={styles.searchField} onChange={(e)=>{setId(e.target.value)}} onKeyDown={(e)=>{if(e.key==='Enter') handleSubmit()}}  placeholder="Playlist link"></input>
                    <br />
                    <input type="submit" value="fetch data" className={styles.submitButton}></input>
                    <br />
                    {displaySeeSongs &&<><Link  to="/songs"> <button className={styles.submitButton}>See the songs</button></Link>
                                        <Link to="/test"><button className={styles.submitButton}>Start Game</button></Link></>}
                </form>
            </div>
        </div>
    )
}
export default Home;
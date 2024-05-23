import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useState } from 'react';
import { FaThumbsDown, FaThumbsUp, FaWindowClose,FaEnvelope, FaComment, FaSmile } from "react-icons/fa";
import styles from './styles.module.css';


const Button=({title, type})=>{

    return(
        <button className={styles.feedbackbutton} type={type}>{ title}</button>
    )

}

const FeedBackForm=({closePopUp, handleSubmit})=>{
    const [comments, setComment] = useState(" ");
    const [email, setEmail] = useState(" ");

    const handleChange = (e)=>{
        setComment(e.target.value);

    }
    const submitForm=(e)=>{
        e.preventDefault();
        const data={email:email,comments:comments}
        handleSubmit(data);
        setComment(" ");
    setEmail(" ");
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }
    return(

        <form onSubmit={submitForm}  >
            <label>
                <FaSmile  style={{marginRight:3}}/>
                Is this page useful?
            </label>
            <label htmlFor="email">
                <FaEnvelope  style={{marginRight:3}} />
                Email Address
            </label>
            <input type="email" id="email" name="email" value={email} required  onChange={handleEmail} />

            <label htmlFor="msg">
                <FaComment  style={{marginRight:3}} />

                Your Feedback:
            </label>
            <textarea value={comments} id="msg" name="msg" rows="4" cols="20" required onChange={handleChange}>
            </textarea>
            <Button  type={"submit"} title={"Submit"} />
        </form>

    )
}
export default function DocsFeedBack (props) {
    const [ showForm, setShowForm ] = useState(false);
    const [feedBackSuccess,setFeedBackSuccess] = useState(false);
    const [feedBackError,setFeedBackError] = useState(false)
    // const {siteConfig} = useDocusaurusContext();
    const apiUrl = process.env.API_URL;

    const openPopUp = ()=> {
        setShowForm(true)

    }

    const closePopUp = ( )=> {
        setShowForm(false);
    setFeedBackSuccess(false);
    setFeedBackError(false);
    }
    const handleSubmit = (data)=> {

        fetch(`${apiUrl}`,{
            method:"POST",
            body:JSON.stringify({"text":`${data.comments}  by ${data.email}`})
        })
            .then((response)=>{
                if(response.status == 200){
                    setFeedBackSuccess(true)
                }
                else{
                    setFeedBackError(true)
                }

            })
            .catch((error)=>{
                setFeedBackError(true);
            })

    }
    return(

        <div>
            <button class="button button--primary feedback-button" onClick={()=>(setShowForm(true))}>Feedback </button>

            {showForm &&
                <div className="card feedbackCard container">
                    <FaWindowClose onClick={closePopUp} className={styles.closeWindow}/>
                    { feedBackSuccess && <p>Your Comment has been succesfully submitted </p>}
                    { feedBackError && <p> An error occurred while submitting your feedback</p>}
                    <FeedBackForm closePopUp={closePopUp} handleSubmit={handleSubmit} />
                </div>

            }
        </div>
    )
}


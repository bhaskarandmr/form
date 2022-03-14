import React, {useState} from 'react'
import Svg from '../components/svg.js'

const ContactForm = () => {

    // Create all data we need for sending an email.
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [object, setObject] = useState('object')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    
    // Create some variables for checking data before submit the form
    const [validationName, setValidationName] = useState(false)
    const [validationEmail, setValidationEmail] = useState(false)
    const [validationObject, setValidationObject] = useState(false)
    const [validationMessage, setValidationMessage] = useState(false)

    // Create some variables for warning users about the form completion
    const [errorName, setErrorName] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorObject, setErrorObject] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [errorForm, setErrorForm] = useState('')


    // Create some functions for checking data and warning user about the form completion

    // Name field (input)
    const handleChangeName = (e) =>{
        if (e == "" || e == null || /^\s*$/.test(e)) {
            setErrorName("Enter your name correctly.")
            setName(e)
            return setValidationName(false)
        }
        else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(e)) {
            setErrorName("Special characters are not allowed.")
            setName(e)
            return setValidationName(false)
        }
        else if (/[0-9]+/.test(e)) {
            setErrorName("Numbers are not allowed.")
            setName(e)
            return setValidationName(false)
        }
        else if (e.length < 3) {
            setErrorName("Your name must have at least 3 characters.")
            setName(e)
            return setValidationName(false)
        }
        else {
            setErrorName("")
            setName(e)
            return setValidationName(true)
        }
    }

    // Email field (input)
    const handleChangeEmail = (e) =>{

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)) {
            
            setErrorEmail("Enter your email address correctly.")
            setEmail(e)
            return setValidationEmail(false)
        }
        else {

            setErrorEmail("")
            setEmail(e)
            return setValidationEmail(true)
        }
    }

    // Object field (select)
    const handleChangeObject = (e) =>{

        if ( e === "object") {

            setErrorObject("Choose a subject for your message.")
            setObject(e)
            return setValidationObject(false) 
        }
        else {

            setErrorObject("")
            setObject(e)
            return setValidationObject(true)
        }
    }

    // Message field (textarea)
    const handleChangeMessage = (e) =>{

        if (e.trim().length < 30) {

            setErrorMessage("Enter a message of at least 30 characters.")
            setMessage(e)
            return setValidationMessage(false)
        }
        else {

            setErrorMessage("")
            setMessage(e)
            return setValidationMessage(true)
        }
    }

    // Create a function for double checking all fields in the form before sending data
    const handleBeforeSubmit = () => {

        if (validationName == true && validationEmail == true && validationObject == true && validationMessage == true) {    
            setErrorForm("Sending...")
            return true
        }
        else if(validationName == false){
            setErrorForm("Please verify your name.")
        }
        else if(validationEmail == false){
            setErrorForm("Please verify your email address.")
        }
        else if(validationObject == false){
            setErrorForm("Please verify your object message.")
        }
        
        else if(validationMessage == false){
            setErrorForm("Please verify your message.")
        }
        else { 
            setErrorForm("Please complete this form properly.")
        }
    }

    const handleSubmit = (e) => {
        handleBeforeSubmit()
        e.preventDefault()
        if (handleBeforeSubmit() === true) {
            // console.log('Sending...')
            let data = {
            name,
            object,
            email,
            message
            }
            fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            }).then((res) => {
            // console.log('Response received')
            if (res.status === 200) {
                // console.log('Response succeeded!')
                setSubmitted(true)                
                setName('')
                setObject('object')
                setEmail('')
                setMessage('')
                setValidationName(false)
                setValidationEmail(false)
                setValidationObject(false)
                setValidationMessage(false)
                setErrorForm('')
                setTimeout(function(){setSubmitted(false)}, 8000);
            } 
            })   
        }
    }


    return(
    <>
    <Svg/>
    <div className="p-3 pb-md-4 mt-3 mx-auto text-center container">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-envelope-paper" viewBox="0 0 16 16">
            <path d="M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2H4Zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6v-2.55Zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5.417Zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267v2.55Zm13 .566v5.734l-4.778-2.867L15 7.383Zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083l6.965 4.18ZM1 13.116V7.383l4.778 2.867L1 13.117Z"/>
        </svg>
        <h1 className="display-4 fw-normal">Get In Touch</h1>
        <p className="fs-5 text-muted">Leave me a message in the contact form below.</p>
        <p>I will answer you as soon as possible.</p>
    </div>

    <div className="col-lg-6 col-md-6 mt-1 container">

        <form className="text-start">

            {submitted ? 
                <div className="alert alert-success d-flex align-items-center fw-light text-size" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="14" height="14" role="img">
                        <use xlinkHref="#check-circle-fill"/>
                    </svg>
                    <div>
                        You have successfully send your message ! Thanks.
                    </div>
                </div>  
            : ""}

            {errorForm ? 
                <div className="alert alert-blues d-flex align-items-center fw-light" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="16" height="16" role="img">
                        <use xlinkHref="#info-fill"/>
                    </svg>
                    <div>
                        {errorForm}
                    </div>
                </div>  
            : "" }

            <div className="mb-3">
                <label htmlFor="formControlInput1" className="form-label">Your name</label>
                <input type="text" name="name" value={name} className="form-control" id="formControlInput1" placeholder="ex: Julia" onChange={(e)=>{handleChangeName(e.target.value)}}/>
            </div>
            {errorName ? 
                
                <div className="alert alert-purple d-flex align-items-center fw-light text-size" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="14" height="14" role="img">
                        <use xlinkHref="#exclamation-triangle-fill"/>
                    </svg>
                    <div>
                        {errorName}
                    </div>
                </div>  

            : "" }

            <div className="mb-3">
                <label htmlFor="formControlInput2" className="form-label">Adresse Mail</label>
                <input type="email" name="email" value={email} className="form-control" id="formControlInput2" placeholder="ex: julia@example.com" onChange={(e)=>{handleChangeEmail(e.target.value)}}/>
            </div>
            {errorEmail ? 
                
                <div className="alert alert-purple d-flex align-items-center fw-light text-size" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="14" height="14" role="img">
                        <use xlinkHref="#exclamation-triangle-fill"/>
                    </svg>
                    <div>
                        {errorEmail}
                    </div>
                </div>  

            : "" }

            <div className="mb-3">
                <label htmlFor="formControlInput3" className="form-label">Message Object</label>
                <select className="form-select" value={object} name="object" onChange={(e)=>{handleChangeObject(e.target.value)}} aria-label="Select Input">
                    <option value="object" disabled>Choose a subject</option>
                    <option value="jobOffer">Job Offer</option>
                    <option value="contact">Contact</option>
                    <option value="others">Others</option>
                </select>
            </div>
            {errorObject ? 
                
                <div className="alert alert-purple d-flex align-items-center fw-light text-size" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="14" height="14" role="img">
                        <use xlinkHref="#exclamation-triangle-fill"/>
                    </svg>
                    <div>
                        {errorObject}
                    </div>
                </div>  

            : "" }
           
            <div className="mb-3">
                <label htmlFor="formControlTextarea1" className="form-label">Message</label>
                <textarea className="form-control" value={message} name="message" id="formControlTextarea1" rows="3" placeholder="Leave your message here..." onChange={(e)=>{handleChangeMessage(e.target.value)}}></textarea>
            </div>
            {errorMessage ? 
                
                <div className="alert alert-purple d-flex align-items-center fw-light text-size" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="14" height="14" role="img">
                        <use xlinkHref="#exclamation-triangle-fill"/>
                    </svg>
                    <div>
                        {errorMessage}
                    </div>
                </div>  

            : "" }

            <div className="col-12 mb-3">
                <button className="btn btn-purple" type="button" onClick={(e) => handleSubmit(e)}>Send my message</button>
            </div> 
            
        </form>
       
    </div> 

    </>
)}

export default ContactForm
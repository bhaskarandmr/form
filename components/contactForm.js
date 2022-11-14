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

    // Create function for sending data
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
      
        <h3 className="display-4 fw-normal">
இது உங்களுக்கான வழிகாட்டி நிகழ்ச்சி
</h3>
        <p className="fs-5 text-muted">Register for FREE</p>
        <p>Get your guidance on IAS studies</p>
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
                <label htmlFor="formControlInput2" className="form-label">Email Address</label>
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
                <label htmlFor="formControlInput3" className="form-label">Subject/label>
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

import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {

    const emailInputRef = useRef();

    function registrationHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const bodyTransfer = {
            email: enteredEmail
        };

        fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify(bodyTransfer),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <section className={classes.newsletter}>
        <h2>Sign up to stay updated!</h2>
        <form onSubmit={registrationHandler}>
            <div className={classes.control}>
            <input
                type='email'
                id='email'
                ref={emailInputRef}
                placeholder='Your email'
                aria-label='Your email'
            />
            <button>Register</button>
            </div>
        </form>
        </section>
    );
}

export default NewsletterRegistration;
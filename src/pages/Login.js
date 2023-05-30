import { useState } from 'react';
import styles from '../styles/login.module.css';
import { toast } from 'react-hot-toast';
import { UseAuth } from '../hooks';
import { Navigate } from 'react-router-dom';

const Login = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const auth = UseAuth();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        setLoggingIn(true);
        if(!email || !password){
            return toast.error("This didn't work.");
        }
        const response = await auth.login(email, password);
        if(response.success){
            toast.success('Successfully logged in!')
        }else{
            toast.error(response.message);
        }
        setLoggingIn(false);

    }
    if(auth.user){
        return <Navigate to='/'></Navigate>;
    }

    return (<form className={styles.loginForm} onSubmit={handleSubmit}>
        <span className={styles.loginSignupHeader}>Log In</span>
        
        <div className={styles.field}>
            <input type='email'
             placeholder='Email'
             value={email}
             onChange={(e)=>{setEmail(e.target.value)}} />
        </div>

        <div className={styles.field}>
            <input type='password'
             placeholder='Password'
             value={password}
             onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div className={styles.field}>
            <button disabled={loggingIn}>{loggingIn? 'Logging In..' :'Log In'}</button>
        </div>

    </form>);

}

export default Login;
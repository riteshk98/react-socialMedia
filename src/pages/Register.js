import styles from '../styles/login.module.css';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { UseAuth } from '../hooks';
import { useNavigate, Navigate } from 'react-router-dom';

const Register=()=>{
    const [email, setEmail] = useState('');
    const [userName, setName] = useState('');
    const [password, setPassword] = useState('');
    const [registerIn, setRegisterIn] = useState(false);
    const auth = UseAuth();
    const history = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        setRegisterIn(true);
        if(!email || !password){
            return toast.error("This didn't work.");
        }
        const response = await auth.register(userName,email, password,password);
        if(response.success){
            history('/login');
            toast.success('Successfully registered!')
        }else{
            toast.error(response.message);
        }
        setRegisterIn(false);

    };

    if(auth.user){
        return <Navigate to='/'></Navigate>;
    }


    return (<form className={styles.loginForm} onSubmit={handleSubmit}>
        <span className={styles.loginSignupHeader}>Register</span>

        <div className={styles.field}>
            <input type='name'
             placeholder='Name'
             required value={userName}
             onChange={(e)=>{setName(e.target.value)}} />
        </div>
        
        <div className={styles.field}>
            <input type='email'
             placeholder='Email'
             required value={email}
             onChange={(e)=>{setEmail(e.target.value)}} />
        </div>

        <div className={styles.field}>
            <input type='password'
             placeholder='Password'
             required value={password}
             onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div className={styles.field}>
            <button  disabled={registerIn}>{registerIn? 'Signing Up' :'Sign Up'}</button>
        </div>

    </form>)
};


export default Register;
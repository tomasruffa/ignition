import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import { saveToken, getToken } from '../../apollo/path'
import { useRouter } from 'next/router'
import { REGISTER_USER, LOGIN_USER } from '../../apollo/methods'
import PersonIcon from '@material-ui/icons/Person';

const Start = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isDisable, setIsDisable] = useState(false)
  const router = useRouter();

  useEffect(async function() {
    const token = await getToken();
    if (token) {
      router.push('/dashboard')
    }
  },[]);

  const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const cleanFields = () => {
      setUsername('')
      setPassword('')
      setEmail('')
    }
    const [registerNewUser, { loading, error, data }] = useMutation(REGISTER_USER)
  
    useEffect(() => {
      if(data?.signup?.token) {
        saveToken(data.signup.token)
        router.push('/')
      }
    }, [loading])
    
    return (
      <div className="start__card__container">
        <TextField
          id="standard-error-helper-text"
          label="Username"
          value={username}
          onChange={data => {setUsername(data.target.value)}}
        />
        <TextField
          id="standard-error-helper-text"
          label="Password"
          value={password}
          type="password"
          onChange={data => {setPassword(data.target.value)}}
        />
        <TextField
          id="standard-error-helper-text"
          label="Email"
          value={email}
          onChange={data => {setEmail(data.target.value)}}
        />
        <div className="start__card__container__bttn">
          <Button
            className="start__card__container__bttn__primary"
            variant="contained"
            color="primary"
            disabled={isDisable}
            onClick={() => registerNewUser(
              {
                variables: {
                  name: username,
                  password: password,
                  email: email
                }
              }
            )}
          >
          Register
          </Button>
          <a
            className="start__card__container__bttn__secondary"
            disabled={isDisable}
            onClick={() => {setIsLogin(!isLogin); cleanFields()}}>
            I already have an account
          </a>
        </div>
    </div>
    )
  }

  const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const cleanFields = () => {
      setPassword('')
      setEmail('')
    }
    const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER)
  
    useEffect(() => {
      if(data?.login?.token) {
        saveToken(data.login.token)
        router.push('/')
      }
    }, [loading])
    
    return (
      <div className="start__card__container">
        <TextField
          id="standard-error-helper-text"
          label="Email"
          value={email}
          onChange={data => {setEmail(data.target.value)}}
        />
        <TextField
          id="standard-error-helper-text"
          label="Password"
          value={password}
          type="password"
          onChange={data => {setPassword(data.target.value)}}
        />
        <div className="start__card__container__bttn">
          <Button
            className="start__card__container__bttn__primary"
            variant="contained"
            color="primary"
            disabled={isDisable}
            onClick={() => loginUser(
              {
                variables: {
                  email: email,
                  password: password
                }
              }
            )}
          >
          Login
          </Button>
          <a
            className="start__card__container__bttn__secondary"
            disabled={isDisable}
            onClick={() => {setIsLogin(!isLogin); cleanFields()}}>
            I need an account
          </a>
        </div>
    </div>
    )
  }


  return (
    <div className="start">
      <Paper elevation={2} className="start__card">
        <div className="start__card__ignition">
          <div className="start__card__ignition__header">
            <svg width="24" height="35" viewBox="0 0 24 35" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Ignition | The GTM Platform</title><path fill-rule="evenodd" clip-rule="evenodd" d="M12.892 32.517c1.283-2.305 1.084-6.685 0-8.738C10.738 19.7 7.13 11.164 13.996 4.49 17.529 1.052 22.628.95 22.628.95s-.324 3.407-2.404 7.094c-2.08 3.687-1.556 11.735-1.556 11.735s.393 4.92-.95 8.05c-.962 2.246-2.449 3.838-4.38 5.045-.444.278-.686.075-.446-.356z" fill="url(#logo-gradient-1)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M.004 23.623c.54-5.118 4.118-9.322 11.175-11.575 6.96-2.223 9.9-7.7 11.352-11.606.227-.611.922-.567 1.019 0 1.165 6.818.441 13.732-6.664 16.787-3.44 1.48-7.727 1.827-11.705 3.37-2.005.777-3.494 1.815-4.466 3.113-.314.418-.76.375-.711-.09z" fill="url(#logo-gradient-2)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M2 35s-.03-7.29 3.05-10.56c3.08-3.268 6.225-.475 4.422 3.392C7.669 31.698 2 35 2 35z" fill="url(#logo-gradient-3)"></path><defs><linearGradient id="logo-gradient-1" class="logo-gradient" x1="3.686" y1="16.974" x2="25.548" y2="25.588" gradientUnits="userSpaceOnUse"><stop stop-color="#FF8540"></stop><stop offset="1" stop-color="#E72828"></stop></linearGradient><linearGradient id="logo-gradient-2" x1="12" y1="-11.334" x2="-10.667" y2="12.666" gradientUnits="userSpaceOnUse"><stop stop-color="#FFBD98"></stop><stop offset="1" stop-color="#E72828"></stop></linearGradient><linearGradient id="logo-gradient-3" class="logo-gradient" x1="-2" y1="29" x2="9.077" y2="36.385" gradientUnits="userSpaceOnUse"><stop stop-color="#FF8540"></stop><stop offset="1" stop-color="#E72828"></stop></linearGradient></defs></svg>
            <span>Ignition</span>
          </div>
          {isLogin ? <Login /> : <Register />}
        </div>
      </Paper>
    </div>
  )
}

export default Start;

import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Link, useNavigate, redirect } from 'react-router-dom';
import { login } from '../services/auth.service';
import { useUserContext } from '../context/UserContext';
import Loader from '../components/Loader';

const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');

  const { user, setUser } = useUserContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
      const getUser = await login({
        email: email,
        password: password,
      });
      console.log('getUser', getUser);
      if (getUser?.error) {
        setMessage([getUser?.error?.message]);
      } else {
        localStorage.setItem(
          'authToken',
          JSON.stringify({ token: getUser.token, user: getUser.user })
        );
        setUser({ token: getUser.token, user: getUser.user });
      }
      setLoader(false);
    } catch (error) {
      setMessage(error?.error?.detail);
      setLoader(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigation('/group');
    }
  }, [user]);

  return (
    <>
      {loader && <Loader />}
      <main className="login__main__section">
        <section className="login__logo__section">
          <h3>Welcome to FunFox</h3>
          <p>
            FunFox offers a better alternative to traditional primary school
            tutoring. Thanks to the quality of our teachers and the depth of our
            programs, we’ve quickly developed a reputation as a leader in
            providing exceptional learning experiences.
          </p>
        </section>
        <section className="login__logo__form">
          <section>
            <h4>Login</h4>
            <form onSubmit={handleLogin}>
              <div>
                <label>Email</label>
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  className="input"
                  type="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                />
              </div>
              {Array.isArray(message) && (
                <div className="error__section">
                  <ul>
                    {message?.map((message) => {
                      return <li>{message}</li>;
                    })}
                  </ul>
                </div>
              )}
              <Button text="Login" className="bg-primary auth__button" />
            </form>
            <p className="auth__text">
              Don't Have Account{' '}
              <Link to={'/signup'} className="text-primary">
                Sign up
              </Link>{' '}
              here
            </p>
          </section>
        </section>
      </main>
    </>
  );
};

export default Login;

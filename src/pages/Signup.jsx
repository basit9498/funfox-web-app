import React, { useState } from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { register } from '../services/auth.service';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
      await register({
        name: name,
        email: email,
        password: password,
        conform_password: conformPassword,
      });

      setName('');
      setEmail('');
      setPassword('');
      setConformPassword('');
      setMessage('User has been register');
      setLoader(false);
    } catch (error) {
      setMessage(error?.error?.detail);
      setLoader(false);
    }
  };

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
            <h4>Signup</h4>
            {!Array.isArray(message) && message && (
              <div className="success__section">
                <span>{message}</span>
              </div>
            )}
            <form onSubmit={handleRegister}>
              <div>
                <label>Name</label>
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Name"
                />
              </div>
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
              <div>
                <label>Confrim Password</label>
                <input
                  className="input"
                  type="Password"
                  value={conformPassword}
                  onChange={(e) => setConformPassword(e.target.value)}
                  placeholder="Enter confrim Password"
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
              <Button text="Register" className="bg-primary auth__button" />
            </form>
            <p className="auth__text">
              already Have Account{' '}
              <Link to={'/'} className="text-primary">
                Login
              </Link>{' '}
              here
            </p>
          </section>
        </section>
      </main>
    </>
  );
};

export default Signup;

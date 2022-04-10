import {
  ChangeEvent,
  FormEvent,
  Ref,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import { adminStore } from '../stores/admin.store';

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
    return () => {};
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pwd }),
      });
      let res = await response.json();
      if (res) {
        setAuth(user, pwd);
        setSuccess(true);
        setErrMsg('');
        adminStore.setIsAdmin(true);
        adminStore.setUsername(user);
      } else {
        setErrMsg('Неправильный логин или пароль');
        setSuccess(false);
      }
    } catch (error) {
    } finally {
      setUser('');
      setPwd('');
    }
  }

  return (
    <>
      {success ? (
        <section className="login-success">
          <h1>You are logged in!</h1>
          <br />
          <Link to={'dash'}>
            <div>Go to Dashboard</div>
          </Link>
        </section>
      ) : (
        <section className="login-form">
          <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'}>
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form className="login-form__form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUser(e.target.value);
              }}
              value={user}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPwd(e.target.value);
              }}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
        </section>
      )}
    </>
  );
}

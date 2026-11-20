import { useState } from "react";
import { signIn } from "../../services/adminService";
import { img } from "../../utils/img";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn(email.trim(), password);
    } catch {
      setError("Incorrect email or password.");
      setBusy(false);
    }
  };

  return (
    <div className="adm-auth">
      <div className="adm-auth-brand">
        <img src={img("crest.png")} alt="Tonaldo FC" />
        <h1>
          Tonaldo FC
          <br />
          website admin
        </h1>
        <p>Manage your gallery, coaches and sponsors in one place.</p>
        <ul>
          <li>Upload photos and logos</li>
          <li>Update coaches and sponsors</li>
          <li>Changes appear on the website straight away</li>
        </ul>
      </div>
      <div className="adm-auth-form">
        <form onSubmit={submit}>
          <h2>Sign in</h2>
          <p>Use your admin email and password.</p>
          <label>
            Email
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <small className="adm-err">{error}</small>}
          <button className="btn wide" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
          <a href="/" className="adm-back">
            ← Back to website
          </a>
        </form>
      </div>
    </div>
  );
}

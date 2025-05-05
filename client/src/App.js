import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    designation: "",
    organization: "",
    invited_by: "",
  });
  const [message, setMessage] = useState("");
  const [invites, setInvites] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/invites", form);
    setMessage(res.data.message);
    loadInvites();
  };

  const loadInvites = async () => {
    const res = await axios.get(`http://localhost:5000/api/invites?page=${page}`);
    setInvites(res.data);
  };

  useEffect(() => {
    loadInvites();
  }, [page]);

  return (
    <div className="container">
      <h1 className="title">🎉 Viksit Bharat Dialogues & Awards (VBDA) 2025 Invitation Generator</h1>

      <div className="form">
        {["name", "email", "designation", "organization", "invited_by"].map((f) => (
          <div key={f} className="form-group">
            <label>{f.charAt(0).toUpperCase() + f.slice(1)}</label>
            <input
              name={f}
              value={form[f]}
              onChange={handleChange}
              placeholder={`Enter ${f}`}
            />
          </div>
        ))}
        <button className="submit-button" onClick={handleSubmit}>Generate Invitation</button>
      </div>

      {message && (
        <div className="message-box">
          <strong>Generated Message:</strong>
          <pre>{message}</pre>
        </div>
      )}

      <h2 className="subtitle">📋 All Invites</h2>
      <div className="invite-list">
        {invites.map((inv) => (
          <div key={inv.id} className="invite-card">
            <h3>{inv.name}</h3>
            <p><strong>{inv.designation}</strong> at <em>{inv.organization}</em></p>
            <p>📧 {inv.email}</p>
            <p>📝 Invited By: {inv.invited_by}</p>
            <pre className="message-preview">{inv.message}</pre>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => Math.max(p - 1, 1))}>
          ⬅ Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next ➡</button>
      </div>
    </div>
  );
}

export default App;

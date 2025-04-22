
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [rfps, setRfps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/rfps.json')
      .then(response => response.json())
      .then(data => setRfps(data))
      .catch(error => console.error("Failed to fetch RFPs:", error));
  }, []);

  const filteredRfps = rfps.filter(rfp =>
    rfp.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">RFP/RFQ Search</h1>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded mb-6 w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid gap-4 max-w-2xl">
        {filteredRfps.map((rfp, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-4 border border-gray-200">
            <h2 className="text-lg font-semibold text-green-700">{rfp.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Posted:</strong> {rfp.date} &nbsp; | &nbsp;
              <strong>Source:</strong> {rfp.source}
            </p>
            <a
              href={rfp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View RFP
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

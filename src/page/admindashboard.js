import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("volunteers");
  const [volunteers, setVolunteers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [filterText, setFilterText] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsImage, setNewsImage] = useState(null);
  const [uploadedNews, setUploadedNews] = useState([]);

  useEffect(() => {
    // Mock volunteer data
    setVolunteers([
      {
        _id: "1",
        name: "John Doe",
        phone: "1234567890",
        email: "john@example.com",
        location: "Zone A",
        task: "Health",
        status: "Available",
        digitalId: "john_id.png",
      },
      {
        _id: "2",
        name: "Jane Smith",
        phone: "0987654321",
        email: "jane@example.com",
        location: "Zone B",
        task: "Logistics",
        status: "Busy",
        digitalId: "jane_id.png",
      },
    ]);

    // Mock contact messages
    setMessages([
      {
        _id: "1",
        name: "Alemayehu Tesfaye",
        email: "alemayehu@example.com",
        message: "Need help in Zone A — water flooding.",
        latitude: 9.0123,
        longitude: 38.7345,
        image: "contact1.png",
      },
      {
        _id: "2",
        name: "Meskerem Alemayehu",
        email: "meskerem@example.com",
        message: "Fire alert near Zone B.",
        latitude: 8.9806,
        longitude: 38.7578,
        image: "contact2.png",
      },
    ]);
  }, []);

  const sendAlert = () => {
    if (!alertMessage.trim()) return alert("Please type an alert message.");
    const filtered = volunteers.filter(
      (v) =>
        v.location.toLowerCase().includes(filterText.toLowerCase()) ||
        v.task.toLowerCase().includes(filterText.toLowerCase())
    );
    if (filtered.length) {
      alert(`📢 Alert sent to ${filtered.length} volunteers!`);
      setAlertMessage("");
      setFilterText("");
    } else {
      alert("No volunteers match the filter.");
    }
  };

  const handleNewsUpload = (e) => {
    e.preventDefault();
    if (!newsImage) return alert("Please select an image!");

    const reader = new FileReader();
    reader.readAsDataURL(newsImage);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 100;
        const maxHeight = 100;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        const newNews = {
          id: Date.now(),
          title: newsTitle,
          imageUrl: compressedDataUrl,
        };
        setUploadedNews([newNews, ...uploadedNews]);
        setNewsTitle("");
        setNewsImage(null);
      };
    };
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Segoe UI, sans-serif",
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
    },
    nav: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    navBtn: (active) => ({
      padding: "8px 15px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: active ? "#2563eb" : "#1e3a8a",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "bold",
    }),
    // section: { backgroundColor: "#fff", padding: "15px", borderRadius: "10px", marginBottom: "30px" },
    //sectionTitle: { marginBottom: "15px", color: "#2563eb", fontSize: "18px" },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #ddd",
      fontSize: "13px",
    },
    thead: { backgroundColor: "#2563eb", color: "#fff", textAlign: "center" },
    cell: {
      border: "1px solid #ddd",
      padding: "6px",
      verticalAlign: "middle",
      textAlign: "center",
    },
    evenRow: { backgroundColor: "#f9f9f9" },
    oddRow: { backgroundColor: "#fff" },
    imageCard: {
      width: "40px",
      height: "40px",
      borderRadius: "6px",
      objectFit: "cover",
      border: "1px solid #ddd",
      margin: "auto",
    },
    input: {
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      marginBottom: "8px",
    },
    textarea: {
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      width: "60%",
      height: "50px",
      marginBottom: "8px",
    },
    button: {
      backgroundColor: "#2563eb",
      color: "#fff",
      padding: "8px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      width: "fit-content",
    },
    form: { display: "flex", flexDirection: "column", gap: "8px" },
    newsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "5px",
      marginTop: "10px",
    },
    newsCard: {
      borderRadius: "8px",
      overflow: "hidden",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "250px",
      width: "250px",
    },
    newsImage: { width: "100%", height: "150px", objectFit: "cover" },
    newsTitle: {
      padding: "5px",
      fontWeight: "600",
      textAlign: "center",
      fontSize: "12px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navigation Tabs */}
      <div style={styles.nav}>
        <button
          style={styles.navBtn(activeTab === "volunteers")}
          onClick={() => setActiveTab("volunteers")}
        >
          👥 Volunteers
        </button>
        <button
          style={styles.navBtn(activeTab === "alerts")}
          onClick={() => setActiveTab("alerts")}
        >
          🔔 Send Alert
        </button>
        <button
          style={styles.navBtn(activeTab === "contacts")}
          onClick={() => setActiveTab("contacts")}
        >
          📩 Contact Messages
        </button>
        <button
          style={styles.navBtn(activeTab === "news")}
          onClick={() => setActiveTab("news")}
        >
          📰 Upload News
        </button>
      </div>

      {/* Volunteers */}
      {activeTab === "volunteers" && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>👥 Volunteer List</h2>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.cell}>#</th>
                <th style={styles.cell}>Name</th>
                <th style={styles.cell}>Phone</th>
                <th style={styles.cell}>Email</th>
                <th style={styles.cell}>Location</th>
                <th style={styles.cell}>Task</th>
                <th style={styles.cell}>Status</th>
                <th style={styles.cell}>Digital ID</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((v, i) => (
                <tr
                  key={v._id}
                  style={i % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  <td style={styles.cell}>{i + 1}</td>
                  <td style={styles.cell}>{v.name}</td>
                  <td style={styles.cell}>{v.phone}</td>
                  <td style={styles.cell}>{v.email}</td>
                  <td style={styles.cell}>{v.location}</td>
                  <td style={styles.cell}>{v.task}</td>
                  <td style={styles.cell}>{v.status}</td>
                  <td style={styles.cell}>
                    {v.digitalId ? (
                      <img
                        src={`./uploads/${v.digitalId}`}
                        alt="ID"
                        style={styles.imageCard}
                      />
                    ) : (
                      "No ID"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Alerts */}
      {activeTab === "alerts" && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🔔 Send Alert</h2>
          <input
            type="text"
            placeholder="Filter by location or task..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Type alert message here..."
            value={alertMessage}
            onChange={(e) => setAlertMessage(e.target.value)}
            style={styles.textarea}
          />
          <button onClick={sendAlert} style={styles.button}>
            Send Alert
          </button>
        </section>
      )}

      {/* Contacts */}
      {activeTab === "contacts" && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>💬 Contact Messages</h2>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.cell}>#</th>
                <th style={styles.cell}>Name</th>
                <th style={styles.cell}>Email</th>
                <th style={styles.cell}>Message</th>
                <th style={styles.cell}>GPS</th>
                <th style={styles.cell}>Image</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, i) => (
                <tr
                  key={msg._id}
                  style={i % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  <td style={styles.cell}>{i + 1}</td>
                  <td style={styles.cell}>{msg.name}</td>
                  <td style={styles.cell}>{msg.email}</td>
                  <td style={styles.cell}>{msg.message}</td>
                  <td style={styles.cell}>
                    {msg.latitude && msg.longitude ? (
                      <a
                        href={`https://www.google.com/maps?q=${msg.latitude},${msg.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📍 Map
                      </a>
                    ) : (
                      "No GPS"
                    )}
                  </td>
                  <td style={styles.cell}>
                    {msg.image ? (
                      <img
                        src={`./uploads/${msg.image}`}
                        alt="Uploaded"
                        style={styles.imageCard}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* News */}
      {activeTab === "news" && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📰 Upload Daily News</h2>
          <form onSubmit={handleNewsUpload} style={styles.form}>
            <input
              type="text"
              placeholder="Enter news title..."
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewsImage(e.target.files[0])}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Upload News
            </button>
          </form>

          <div style={styles.newsGrid}>
            {uploadedNews.map((n) => (
              <div key={n.id} style={styles.newsCard}>
                <img src={n.imageUrl} alt={n.title} style={styles.newsImage} />
                <div style={styles.newsTitle}>{n.title}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default AdminDashboard;

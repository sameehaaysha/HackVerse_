import { useState } from "react";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState([

    
  {
    facultyName: "Dr. Priya",
    facultyId: "FAC001",
    department: "AIML",
    programme: "AI in Education FDP",
    organizer: "ABC University",
    startDate: "2026-08-08",
    endDate: "2026-08-08",
    type: "FDP",
    mode: "Online",
    status: "Approved"
  },
  {
    facultyName: "Dr. Rahul Sharma",
    facultyId: "FAC002",
    department: "CSE",
    programme: "AI in Education FDP",
    organizer: "ABC University",
    startDate: "2026-08-07",
    endDate: "2026-08-07",
    type: "FDP",
    mode: "Online",
    status: "Approved"
  },
  {
    facultyName: "Dr. Anitha Rao",
    facultyId: "FAC003",
    department: "AIML",
    programme: "Machine Learning Workshop",
    organizer: "ABC University",
    startDate: "2026-08-06",
    endDate: "2026-08-06",
    type: "Workshop",
    mode: "Offline",
    status: "Approved"
  },
  {
    facultyName: "Dr. Kiran Kumar",
    facultyId: "FAC004",
    department: "ECE",
    programme: "Emerging Technologies Workshop",
    organizer: "ABC University",
    startDate: "2026-08-05",
    endDate: "2026-08-05",
    type: "Workshop",
    mode: "Online",
    status: "Approved"
  },
  {
    facultyName: "Dr. Sneha Patel",
    facultyId: "FAC005",
    department: "CSE",
    programme: "Emerging Technologies Conference",
    organizer: "ABC University",
    startDate: "2026-08-04",
    endDate: "2026-08-04",
    type: "Conference",
    mode: "Online",
    status: "Approved"
  }
]);
  const [form, setForm] = useState({
    facultyName: "",
    facultyId: "",
    department: "",
    programme: "",
    organizer: "",
    startDate: "",
    endDate: "",
    type: "",
    mode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setRecords([
      ...records,
      {
        ...form,
        status: "Pending",
      },
    ]);

    setForm({
      facultyName: "",
      facultyId: "",
      department: "",
      programme: "",
      organizer: "",
      startDate: "",
      endDate: "",
      type: "",
      mode: "",
    });

    setShowForm(false);

    alert("FDP participation submitted successfully!");
  };

  const updateStatus = (index, status) => {
    const updatedRecords = [...records];
    updatedRecords[index].status = status;
    setRecords(updatedRecords);
  };
  const generateReport = () => {
  if (records.length === 0) {
    alert("No records available for report.");
    return;
  }

  let report = "FACULTY DEVELOPMENT & PARTICIPATION REPORT\n\n";

  records.forEach((record, index) => {
    report += `Record ${index + 1}\n`;
    report += `Faculty Name: ${record.facultyName}\n`;
    report += `Faculty ID: ${record.facultyId}\n`;
    report += `Department: ${record.department}\n`;
    report += `Programme: ${record.programme}\n`;
    report += `Organizer: ${record.organizer}\n`;
    report += `Start Date: ${record.startDate}\n`;
    report += `End Date: ${record.endDate}\n`;
    report += `Type: ${record.type}\n`;
    report += `Mode: ${record.mode}\n`;
    report += `Status: ${record.status}\n`;
    report += "----------------------------------------\n\n";
  });

  const blob = new Blob([report], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Faculty_FDP_Report.txt";

  link.click();

  URL.revokeObjectURL(url);
};

  return (
    <div className="app">

      <header>
        <h1>V09 - Faculty Development & Participation</h1>
        <p>Faculty Development Management System</p>
      </header>

      <main>

        <section className="welcome">
          <h2>Welcome to FDP Portal</h2>
          <p>
            Manage Faculty Development Programmes, workshops,
            conferences and participation records in one place.
          </p>
        </section>

        <section className="cards">

          <div className="card">
            <h3>Total Faculty</h3>
            <h2>5</h2>
          </div>

          <div className="card">
            <h3>Total FDPs</h3>
            <h2>{records.filter(r => r.type === "FDP").length + 2}</h2>
          </div>

          <div className="card">
            <h3>Workshops</h3>
            <h2>{records.filter(r => r.type === "Workshop").length + 2}</h2>
          </div>

          <div className="card">
            <h3>Conferences</h3>
            <h2>{records.filter(r => r.type === "Conference").length + 1}</h2>
          </div>

        </section>

        <section className="actions">

          <button onClick={() => setShowForm(true)}>
            + Add Participation
          </button>

          <button
            onClick={() =>
              document
                .getElementById("records")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Records
          </button>

          <button onClick={generateReport}>
  Generate Report
</button>

        </section>

        {showForm && (
          <section className="form-box">

            <h2>Add Faculty Participation</h2>

            <form onSubmit={handleSubmit}>

              <input
                name="facultyName"
                value={form.facultyName}
                onChange={handleChange}
                placeholder="Faculty Name"
                required
              />

              <input
                name="facultyId"
                value={form.facultyId}
                onChange={handleChange}
                placeholder="Faculty ID"
                required
              />

              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Department"
                required
              />

              <input
                name="programme"
                value={form.programme}
                onChange={handleChange}
                placeholder="FDP / Programme Name"
                required
              />

              <input
                name="organizer"
                value={form.organizer}
                onChange={handleChange}
                placeholder="Organizer"
                required
              />

              <label>Start Date</label>

              <input
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                type="date"
                required
              />

              <label>End Date</label>

              <input
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                type="date"
                required
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="FDP">FDP</option>
                <option value="Workshop">Workshop</option>
                <option value="Conference">Conference</option>
                <option value="Seminar">Seminar</option>
              </select>

              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
                required
              >
                <option value="">Select Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>

              <label>Upload Certificate</label>

              <input type="file" />

              <button type="submit">
                Submit Participation
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
              >
                Close
              </button>

            </form>

          </section>
        )}
        <div className="filters">
  <input
    type="text"
    placeholder="Search faculty..."
    onChange={(e) => setSearch(e.target.value)}
  />

  <select onChange={(e) => setFilterType(e.target.value)}>
    <option value="All">All</option>
    <option value="FDP">FDP</option>
    <option value="Workshop">Workshop</option>
    <option value="Conference">Conference</option>
  </select>
</div>

        <section id="records" className="records">

          <h2>Faculty Participation Records</h2>

          {records.length === 0 ? (
            <p>No participation records submitted yet.</p>
          ) : (

            <table>

              <thead>
                <tr>
                  <th>Faculty</th>
                  <th>Programme</th>
                  <th>Type</th>
                  <th>Organizer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {records.map((record, index) => (

                  <tr key={index}>

                    <td>{record.facultyName}</td>

                    <td>{record.programme}</td>

                    <td>{record.type}</td>

                    <td>{record.organizer}</td>

                    <td>{record.startDate}</td>

                    <td>{record.status}</td>

                    <td>

                      {record.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(index, "Approved")
                            }
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(index, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {record.status === "Approved" && (
                        <span>✅ Approved</span>
                      )}

                      {record.status === "Rejected" && (
                        <span>❌ Rejected</span>
                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </section>

      </main>

    </div>
  );
}

export default App;
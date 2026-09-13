import React, { useEffect, useState } from "react";

const API_URL = "https://careos-gtd7.onrender.com/api/patients";

const ReceptionDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchPatients = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.success) {
        setPatients(data.patients);
      }
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();

    const interval = setInterval(fetchPatients, 5000);

    return () => clearInterval(interval);
  }, []);

  const proceedToDoctor = async (patientId) => {
    try {
      setUpdatingId(patientId);

      const response = await fetch(
        `${API_URL}/${patientId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "proceeded_to_doctor",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setPatients((currentPatients) =>
          currentPatients.map((patient) =>
            patient._id === patientId
              ? {
                  ...patient,
                  status: "proceeded_to_doctor",
                }
              : patient
          )
        );
      }
    } catch (error) {
      console.error("Failed to proceed patient:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  // Show pending + proceeded patients
  const receptionPatients = patients.filter(
    (patient) =>
      patient.status === "reception_pending" ||
      patient.status === "registered" ||
      patient.status === "proceeded_to_doctor"
  );

  const pendingPatients = patients.filter(
    (patient) =>
      patient.status === "reception_pending" ||
      patient.status === "registered"
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <p className="text-sm font-medium text-blue-600">
              CareOS
            </p>

            <h1 className="text-2xl font-bold">
              Reception Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage incoming patient registrations
            </p>
          </div>

          <button
            onClick={fetchPatients}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-50"
          >
            ↻ Refresh
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Incoming Patients
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {pendingPatients.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Registered
            </p>

            <p className="mt-2 text-3xl font-bold">
              {patients.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Records Available
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {
                patients.filter(
                  (patient) => patient.hasMedicalRecords
                ).length
              }
            </p>
          </div>

        </div>

        {/* Patient List */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold">
              Incoming Patients
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Patients registered through CareOS AI
            </p>
          </div>

          {loading ? (

            <div className="px-6 py-12 text-center text-slate-500">
              Loading patients...
            </div>

          ) : receptionPatients.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                ✓
              </div>

              <h3 className="font-semibold">
                No incoming patients
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                New AI call registrations will appear here
                automatically.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {receptionPatients.map((patient) => (

                <div
                  key={patient._id}
                  className="p-6 transition hover:bg-slate-50"
                >

                  <div className="flex flex-col gap-5">

                    {/* Top Section */}
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                      {/* Patient Info */}
                      <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                          {patient.name?.charAt(0)?.toUpperCase() ||
                            "P"}
                        </div>

                        <div>

                          <h3 className="text-lg font-semibold">
                            {patient.name}
                          </h3>

                          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">

                            <span>
                              Age: {patient.age}
                            </span>

                            <span>
                              📞 {patient.phoneNumber}
                            </span>

                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">

                            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                              {patient.problem}
                            </span>

                            {patient.duration && (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                {patient.duration}
                              </span>
                            )}

                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                              {patient.severity}
                            </span>

                          </div>

                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="flex flex-col gap-3 lg:items-end">

                        <div className="flex flex-wrap gap-2 text-xs">

                          <span
                            className={`rounded-full px-3 py-1 font-medium ${
                              patient.hasMedicalRecords
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {patient.hasMedicalRecords
                              ? "Medical Records Available"
                              : "No Medical Records"}
                          </span>

                          {patient.documents?.length > 0 && (
                            <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600">
                              {patient.documents.length} Document
                              {patient.documents.length > 1
                                ? "s"
                                : ""}
                            </span>
                          )}

                        </div>

                        {/* Proceed Button */}
                        {patient.status === "proceeded_to_doctor" ? (

                          <button
                            disabled
                            className="rounded-xl bg-emerald-100 px-5 py-2.5 text-sm font-semibold text-emerald-700 cursor-default"
                          >
                            ✓ Proceeded
                          </button>

                        ) : (

                          <button
                            onClick={() =>
                              proceedToDoctor(patient._id)
                            }
                            disabled={updatingId === patient._id}
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {updatingId === patient._id
                              ? "Proceeding..."
                              : "Proceed to Doctor →"}
                          </button>

                        )}

                      </div>

                    </div>

                    {/* AI Summary */}
                    {patient.aiSummary && (
                      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5">

                        <div className="mb-2 flex items-center gap-2">

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            🤖
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-slate-800">
                              AI Patient Summary
                            </h4>

                            <p className="text-xs text-slate-500">
                              Generated from the patient's AI call
                            </p>
                          </div>

                        </div>

                        <p className="text-sm leading-6 text-slate-700">
                          {patient.aiSummary}
                        </p>

                      </div>
                    )}

                    {/* Previous Consultation */}
                    {patient.previousConsultation && (
                      <div className="text-sm text-slate-600">

                        <span className="font-medium text-slate-800">
                          Previous Consultation:
                        </span>{" "}

                        {patient.previousConsultation}

                      </div>
                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </main>
    </div>
  );
};

export default ReceptionDashboard;

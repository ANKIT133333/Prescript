import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

const Dashboard = () => {
  const { aToken, getDashData, dashboard } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken, getDashData]);

  const data = dashboard || {};
  const latestAppointments = Array.isArray(data.latestAppointment)
    ? data.latestAppointment
    : data.latestAppointment
      ? [data.latestAppointment]
      : [];

  const cards = [
    {
      label: 'Doctors',
      value: data.doctors ?? 0,
      color: 'from-blue-500 to-sky-500',
      icon: '👩‍⚕️',
    },
    {
      label: 'Patients',
      value: data.patients ?? 0,
      color: 'from-emerald-500 to-green-500',
      icon: '🧑‍🤝‍🧑',
    },
    {
      label: 'Appointments',
      value: data.appointments ?? 0,
      color: 'from-violet-500 to-purple-500',
      icon: '📅',
    },
    {
      label: 'Recent',
      value: latestAppointments.length,
      color: 'from-amber-500 to-orange-500',
      icon: '⏳',
    },
  ];

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Overview
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        </div>

        <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
          Live performance
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className={`h-1.5 bg-gradient-to-r ${card.color}`} />
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-800">{card.value}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Recent appointments</h2>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {latestAppointments.length} items
            </span>
          </div>

          {latestAppointments.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
              No appointments available yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Doctor</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestAppointments.map((appointment, index) => (
                    <tr key={appointment?._id || index} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 pr-4 font-medium text-slate-700">
                        {appointment?.userData?.name || 'Unknown patient'}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        {appointment?.docData?.name || 'Doctor not assigned'}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        {appointment?.date
                          ? new Date(appointment.date).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="py-3">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          {appointment?.status || 'Confirmed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Quick actions</h2>

          <div className="mt-5 space-y-3">
            <Link
              to="/add-doctor"
              className="block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + Add doctor
            </Link>
            <Link
              to="/doctor-list"
              className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              View doctors
            </Link>
            <Link
              to="/app-appointment"
              className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Manage appointments
            </Link>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">System health</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-800">Excellent</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

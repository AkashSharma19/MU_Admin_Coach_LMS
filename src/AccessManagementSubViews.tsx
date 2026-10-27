import {
  Plus,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Laptop
} from 'lucide-react'

interface SubViewProps {
  viewId: string
  onActionNotify: (msg: string) => void
}

export default function AccessManagementSubView({ viewId, onActionNotify }: SubViewProps) {
  if (viewId === 'Roles and Permission') {
    return (
      <div className="space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Roles & Permissions Matrix
            </h1>
            <p className="text-xs text-slate-500">
              Configure fine-grained access control policies for students, staff, and leadership
            </p>
          </div>
          <button
            onClick={() => onActionNotify('New Custom Role builder initiated')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create Custom Role</span>
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-gray-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3.5 px-5">Role Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Assigned Users</th>
                <th className="py-3.5 px-4">Curriculum Edit</th>
                <th className="py-3.5 px-4">Attendance Audit</th>
                <th className="py-3.5 px-4">Student Impersonation</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { role: 'Super Admin', type: 'System', users: 3, curr: true, att: true, imp: true, status: 'Active' },
                { role: 'Program Director', type: 'Academic', users: 6, curr: true, att: true, imp: true, status: 'Active' },
                { role: 'Course Faculty', type: 'Academic', users: 48, curr: true, att: true, imp: false, status: 'Active' },
                { role: 'Program Associate', type: 'Operations', users: 14, curr: true, att: true, imp: false, status: 'Active' },
                { role: 'Teaching Assistant', type: 'Academic', users: 22, curr: false, att: true, imp: false, status: 'Active' },
                { role: 'Student Cohort Member', type: 'Student', users: 313, curr: false, att: false, imp: false, status: 'Active' }
              ].map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-5 font-semibold text-slate-800">{r.role}</td>
                  <td className="py-3.5 px-4 text-slate-500">{r.type}</td>
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">{r.users} accounts</td>
                  <td className="py-3.5 px-4">{r.curr ? <CheckCircle2 className="h-4 w-4 text-teal-600" /> : <XCircle className="h-4 w-4 text-slate-300" />}</td>
                  <td className="py-3.5 px-4">{r.att ? <CheckCircle2 className="h-4 w-4 text-teal-600" /> : <XCircle className="h-4 w-4 text-slate-300" />}</td>
                  <td className="py-3.5 px-4">{r.imp ? <CheckCircle2 className="h-4 w-4 text-teal-600" /> : <XCircle className="h-4 w-4 text-slate-300" />}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (viewId === 'User Active Session' || viewId === 'User Active Session Logs') {
    return (
      <div className="space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {viewId === 'User Active Session' ? 'Active Real-Time User Sessions' : 'Session Audit Logs'}
            </h1>
            <p className="text-xs text-slate-500">
              Live device connections and authorization tokens currently accessing the LMS cluster
            </p>
          </div>
          <button
            onClick={() => onActionNotify('Terminated all inactive guest sessions')}
            className="px-3.5 py-2 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold cursor-pointer"
          >
            Revoke Inactive Sessions
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-gray-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3.5 px-5">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Client Device & Browser</th>
                <th className="py-3.5 px-4">IP Address</th>
                <th className="py-3.5 px-4">Login Time</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Akash Sharma', role: 'Super Admin', device: 'Chrome 122 (macOS Sonoma)', ip: '103.21.144.92', time: '12 mins ago' },
                { name: 'Mansa Bihani', role: 'Student (PGPTBM-C7)', device: 'Safari 17.2 (iOS Mobile)', ip: '49.36.12.80', time: '34 mins ago' },
                { name: 'Dr. Mahima Gupta', role: 'Faculty', device: 'Chrome 121 (Windows 11)', ip: '14.139.241.11', time: '1 hour ago' },
                { name: 'Adarsh Raj', role: 'Student (PGPTBM-C7)', device: 'Firefox 124 (macOS)', ip: '115.110.23.4', time: '2 hours ago' }
              ].map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-5 font-semibold text-slate-800">{s.name}</td>
                  <td className="py-3.5 px-4 text-slate-500">{s.role}</td>
                  <td className="py-3.5 px-4 text-slate-700 flex items-center gap-2">
                    <Laptop className="h-3.5 w-3.5 text-slate-400" />
                    <span>{s.device}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{s.ip}</td>
                  <td className="py-3.5 px-4 text-slate-500">{s.time}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onActionNotify(`Session terminated for ${s.name}`)}
                      className="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (viewId === 'Biometric Logs') {
    return (
      <div className="space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Biometric Access & Turnstile Logs
            </h1>
            <p className="text-xs text-slate-500">
              Live hardware event log from Masters' Union Cybercity campus access gates
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold text-emerald-700">Gate Sensors Live</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-gray-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3.5 px-5">Timestamp</th>
                <th className="py-3.5 px-4">Student / Staff ID</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Gate Location</th>
                <th className="py-3.5 px-4">Biometric Method</th>
                <th className="py-3.5 px-4 text-center">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { time: '13:08:42', id: '#6360', name: 'Mansa Bihani', gate: 'Tower A - Main Turnstile 02', method: 'Facial Scan', res: 'Authorized' },
                { time: '13:05:11', id: '#6359', name: 'Adarsh Raj', gate: 'Tower A - Main Turnstile 01', method: 'RFID Card + Fingerprint', res: 'Authorized' },
                { time: '12:58:30', id: '#6358', name: 'Akshay Wilson', gate: 'Auditorium 3 Entrance', method: 'Facial Scan', res: 'Authorized' },
                { time: '12:44:19', id: '#5012', name: 'Dr. Mahima Gupta', gate: 'Faculty Lounge Gate 4', method: 'Facial Scan', res: 'Authorized' },
                { time: '12:31:02', id: '#9901', name: 'Guest Visitor', gate: 'Ground Reception Flap', method: 'Visitor QR', res: 'Expired Pass' }
              ].map((b, i) => (
                <tr key={i} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-5 font-mono text-slate-500">{b.time}</td>
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">{b.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{b.name}</td>
                  <td className="py-3.5 px-4 text-slate-600">{b.gate}</td>
                  <td className="py-3.5 px-4 text-slate-600">{b.method}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        b.res === 'Authorized'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {b.res}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Default fallback for other sub-views
  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{viewId}</h1>
          <p className="text-xs text-slate-500">Access Management sub-module for {viewId}</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-slate-500 shadow-xs">
        <ShieldCheck className="h-12 w-12 text-teal-600 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-800">{viewId} Operational</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          All settings, records and event triggers for {viewId} are synchronized with the primary database.
        </p>
      </div>
    </div>
  )
}

'use client';

import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api-client';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        apiClient.get('/admin/users?limit=50'),
        apiClient.get('/admin/stats'),
      ]);
      setUsers(usersRes.data.data);
      setStats(statsRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSuspend = async (id: number) => {
    await apiClient.put(`/admin/users/${id}/suspend`);
    fetchData();
  };

  const changeRole = async (id: number, role: string) => {
    await apiClient.put(`/admin/users/${id}/role?role=${role}`);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">📊 Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">👑 {user?.full_name} (Admin)</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
            >
              Logout
            </button>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{stats.total_users}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold">{stats.active_users}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Verified</p>
              <p className="text-2xl font-bold">{stats.verified_users}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Chars</p>
              <p className="text-2xl font-bold">{stats.total_characters_used}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.full_name || 'N/A'}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      u.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {u.is_active ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => toggleSuspend(u.id)}
                      className="px-2 py-1 bg-yellow-500 text-white text-xs rounded"
                    >
                      Toggle
                    </button>
                    {u.role === 'user' ? (
                      <button
                        onClick={() => changeRole(u.id, 'admin')}
                        className="px-2 py-1 bg-purple-500 text-white text-xs rounded"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => changeRole(u.id, 'user')}
                        className="px-2 py-1 bg-gray-500 text-white text-xs rounded"
                      >
                        Make User
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
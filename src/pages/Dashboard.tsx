import { useState } from 'react';
import { Link } from 'react-router';
import Navigation from '@/components/Navigation';
import DottedGrid from '@/components/DottedGrid';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/providers/trpc';
import {
  FolderOpen, CreditCard, Star, Settings,
  LogOut, Plus, ChevronRight, CheckCircle,
  Lock, Download, MessageSquare
} from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  active: 'text-blue-400 bg-blue-400/10',
  in_review: 'text-purple-400 bg-purple-400/10',
  revision: 'text-orange-400 bg-orange-400/10',
  delivered: 'text-green-400 bg-green-400/10',
  completed: 'text-green-400 bg-green-400/10',
  cancelled: 'text-red-400 bg-red-400/10',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  active: 'Active',
  in_review: 'In Review',
  revision: 'Revision',
  delivered: 'Delivered',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

type TabType = 'projects' | 'payments' | 'reviews' | 'settings';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('projects');

  const { data: projects, isLoading: projectsLoading } = trpc.project.list.useQuery();
  const { data: payments } = trpc.payment.list.useQuery();
  const { data: reviews } = trpc.review.list.useQuery();

  const tabs = [
    { id: 'projects' as TabType, label: 'My Projects', icon: FolderOpen },
    { id: 'payments' as TabType, label: 'Payments', icon: CreditCard },
    { id: 'reviews' as TabType, label: 'Reviews', icon: Star },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="relative min-h-screen bg-black">
      <DottedGrid />
      <Navigation />

      <main className="relative z-10 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              {user?.avatar ? (
                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full border border-white/20" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#7C3AED]/30 border border-[#7C3AED]/50 flex items-center justify-center text-sm text-white font-medium">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div>
                <h1 className="text-xl font-semibold text-white">{user?.name || 'Dashboard'}</h1>
                <p className="text-xs text-white/40">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-4 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/30'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#7C3AED]' : 'text-white/40'}`} />
                    <span className={`text-sm ${activeTab === tab.id ? 'text-white font-medium' : 'text-white/50'}`}>
                      {tab.label}
                    </span>
                  </button>
                ))}

                <div className="pt-4 border-t border-white/10">
                  <Link
                    to="/start-project"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 hover:bg-[#7C3AED]/30 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#7C3AED]" />
                    <span className="text-sm text-white font-medium">New Project</span>
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors mt-2"
                  >
                    <LogOut className="w-4 h-4 text-white/40" />
                    <span className="text-sm text-white/50">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">My Projects</h2>
                    <span className="text-xs text-white/40">{projects?.length || 0} total</span>
                  </div>

                  {projectsLoading ? (
                    <div className="glass rounded-2xl p-12 text-center">
                      <div className="w-8 h-8 border-2 border-[#7C3AED]/30 border-t-[#7C3AED] rounded-full animate-spin mx-auto" />
                    </div>
                  ) : projects && projects.length > 0 ? (
                    projects.map((project) => (
                      <div
                        key={project.id}
                        className="glass rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-sm font-medium text-white">
                              {project.title || `${project.category} Project`}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${statusColors[project.status || 'pending'] || ''}`}>
                                {statusLabels[project.status || 'pending'] || project.status || 'Pending'}
                              </span>
                              <span className="text-xs text-white/30 capitalize">{project.package} package</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/20" />
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/60 rounded-full transition-all"
                              style={{
                                width: project.status === 'completed' ? '100%' :
                                  project.status === 'delivered' ? '90%' :
                                  project.status === 'in_review' ? '70%' :
                                  project.status === 'active' ? '40%' :
                                  project.status === 'pending' ? '10%' : '0%',
                              }}
                            />
                          </div>
                          <div className="flex justify-between mt-2">
                            {['Pending', 'Active', 'Review', 'Delivery', 'Complete'].map((label, i) => (
                              <span key={i} className="text-[10px] text-white/20">{label}</span>
                            ))}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          {project.status === 'delivered' && (
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-green-400 hover:bg-green-500/20 transition-colors">
                              <CheckCircle className="w-3 h-3" />
                              Approve
                            </button>
                          )}
                          {project.status === 'delivered' && (
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-xs text-[#7C3AED] hover:bg-[#7C3AED]/20 transition-colors">
                              <Download className="w-3 h-3" />
                              Download
                            </button>
                          )}
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 hover:bg-white/10 transition-colors">
                            <MessageSquare className="w-3 h-3" />
                            Messages
                          </button>
                          {project.depositPaid === 0 && (
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-400">
                              <Lock className="w-3 h-3" />
                              Pay Deposit
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="glass rounded-2xl p-12 text-center">
                      <FolderOpen className="w-10 h-10 text-white/10 mx-auto mb-4" />
                      <p className="text-white/40 mb-4">No projects yet</p>
                      <Link to="/start-project" className="btn-primary inline-flex items-center gap-2 text-sm py-2 px-4">
                        <Plus className="w-4 h-4" />
                        Start Your First Project
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white mb-4">Payments</h2>
                  {payments && payments.length > 0 ? (
                    payments.map((payment) => (
                      <div key={payment.id} className="glass rounded-2xl p-6 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white capitalize">{payment.type} Payment</div>
                          <div className="text-xs text-white/40 mt-1">
                            {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : ''}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-white">${payment.amount}</div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            payment.status === 'paid' ? 'text-green-400 bg-green-400/10' :
                            payment.status === 'pending' ? 'text-yellow-400 bg-yellow-400/10' :
                            'text-red-400 bg-red-400/10'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="glass rounded-2xl p-12 text-center">
                      <CreditCard className="w-10 h-10 text-white/10 mx-auto mb-4" />
                      <p className="text-white/40">No payments yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white mb-4">My Reviews</h2>
                  {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-[#7C3AED] fill-[#7C3AED]' : 'text-white/10'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-white/60">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="glass rounded-2xl p-12 text-center">
                      <Star className="w-10 h-10 text-white/10 mx-auto mb-4" />
                      <p className="text-white/40">No reviews yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="glass rounded-2xl p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-white">Account Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-white/40 mb-2 block">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user?.name || ''}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7C3AED]/50"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/40 mb-2 block">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email || ''}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7C3AED]/50"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/40 mb-2 block">Phone</label>
                      <input
                        type="tel"
                        defaultValue={user?.phone || ''}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7C3AED]/50"
                      />
                    </div>
                    <button className="btn-primary text-sm">Save Changes</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// app/dashboard/page.jsx
"use client";
import  useAuthStore  from "@/context/authStore";
import { 
  Users, 
  Activity, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Building
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuthStore();

  const stats = [
    {
      title: "Active Sessions",
      value: "1",
      icon: Activity,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Account Status",
      value: user?.status ? "Active" : "Inactive",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "User Role",
      value: user?.role || "Member",
      icon: Shield,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Modules Access",
      value: user?.permissions?.length || 0,
      icon: BarChart3,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-8 ">
   

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-card border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Details */}
        <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Profile Information</h3>
                <p className="text-sm text-muted-foreground">Your account details</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{user?.email || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">{user?.phone || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl">
                <Building className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Company</p>
                  <p className="text-sm text-muted-foreground">{user?.company || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">{user?.address || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Account Activity</h3>
                <p className="text-sm text-muted-foreground">Recent account information</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">Account Created</p>
                  <p className="text-xs text-green-600">{user?.createdAt || "Unknown"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-xl">
                <Activity className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">Current Session</p>
                  <p className="text-xs text-blue-600">Active now</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-xl">
                <Shield className="w-5 h-5 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-800">Role Assignment</p>
                  <p className="text-xs text-purple-600 capitalize">{user?.role || "Member"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authorized Modules Table */}
      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border/50 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Authorized Modules</h3>
              <p className="text-sm text-muted-foreground">Your access permissions</p>
            </div>
          </div>
        </div>
        
        {user?.permissions?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20">
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Module Name</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Sub-menus</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {user.permissions.map((perm, index) => (
                  <tr key={perm.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-accent/20 to-accent/30 rounded-lg flex items-center justify-center">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                        </div>
                        <span className="font-medium text-foreground">{perm.label}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {perm.children?.map((child, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
                          >
                            {child.label}
                          </span>
                        )) || (
                          <span className="text-xs text-muted-foreground italic">No sub-menus</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No modules assigned to your account</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react'
import {
  Search,
  Download,
  RotateCcw,
  Check,
  X,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Users,
  Headphones,
  CreditCard,
  FileText,
  GraduationCap,
  BookOpen,
  Award,
  Briefcase,
  Settings,
  Calendar,
  MessageSquare,
  BarChart2,
  Sparkles,
  Layers
} from 'lucide-react'

export interface PermissionRecord {
  id: string
  resource: string
  subCategory?: string
  permission: string
  roles: {
    superAdmin: boolean
    orgAdmin: boolean
    manager: boolean
    teacher: boolean
    teachingAssistant: boolean
    student: boolean
    master: boolean
    courseOwners: boolean
    nonTeachingAssistant: boolean
    counsellor: boolean
    guest: boolean
  }
}

const ROLES_LIST = [
  { id: 'superAdmin', label: 'Super Admin', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'orgAdmin', label: 'Org Admin', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'manager', label: 'Manager', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'teacher', label: 'Teacher', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { id: 'teachingAssistant', label: 'Teaching Assistant', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'student', label: 'Student', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'master', label: 'Master', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'courseOwners', label: 'Course Owners', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'nonTeachingAssistant', label: 'Non Teaching Assistant', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { id: 'counsellor', label: 'Counsellor', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'guest', label: 'Guest', color: 'bg-gray-100 text-gray-700 border-gray-200' },
] as const

type RoleId = typeof ROLES_LIST[number]['id']

// Definition of Side Tab Groups matching sidebar navigation
interface SideTabItem {
  id: string
  label: string
  resource: string
  icon: any
  subTabs?: { id: string; label: string; subCategory?: string }[]
}

const SIDE_TABS: SideTabItem[] = [
  { id: 'all', label: 'All Resources', resource: 'All', icon: Layers },
  {
    id: 'access-management',
    label: 'Access Management',
    resource: 'Access management',
    icon: ShieldCheck,
    subTabs: [
      { id: 'all-access', label: 'All Access Management' },
      { id: 'user-management', label: 'User Management', subCategory: 'User Management' },
      { id: 'roles-permission', label: 'Roles and Permission', subCategory: 'Roles & Permission' },
      { id: 'team-setup', label: 'Team Setup', subCategory: 'Team Setup' },
      { id: 'user-active-session', label: 'User Active Session', subCategory: 'User Active Session' },
      { id: 'help-desk', label: 'Help Desk', subCategory: 'Help Desk' },
      { id: 'impersonation-logs', label: 'Impersonation Logs', subCategory: 'Impersonation Logs' },
      { id: 'user-active-session-logs', label: 'User Active Session Logs', subCategory: 'Session Logs' },
      { id: 'biometric-logs', label: 'Biometric Logs', subCategory: 'Biometric Logs' },
    ]
  },
  { id: 'cohort-management', label: 'Cohort Management', resource: 'Cohort Management', icon: Users },
  { id: 'course-management', label: 'Course Management', resource: 'Course Management', icon: BookOpen },
  { id: 'program-management', label: 'Program Management', resource: 'Program Management', icon: GraduationCap },
  { id: 'category-management', label: 'Category Management', resource: 'Category management', icon: CreditCard },
  { id: 'coach-forms', label: 'Coach Forms', resource: 'Coach Form', icon: FileText },
  { id: 'grade', label: 'Grade & Assessment', resource: 'Grade', icon: Award },
  { id: 'career-coach', label: 'Career Coach & Placements', resource: 'Career Coach', icon: Briefcase },
  { id: 'configuration', label: 'System Configuration', resource: 'Configuration', icon: Settings },
  { id: 'ticket-access', label: 'Ticket Access & Support', resource: 'Ticket Access', icon: Headphones },
  { id: 'events', label: 'Events & Clubs', resource: 'Events', icon: Calendar },
  { id: 'communication', label: 'Communication & Feed', resource: 'Communication', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics & Logs', resource: 'Analytics', icon: BarChart2 },
  { id: 'ai-console', label: 'AI Console & Apps', resource: 'AI Console Resource', icon: Sparkles },
]

const INITIAL_PERMISSIONS: PermissionRecord[] = [
  // Access Management: Aligned with the 8 new side tabs
  // 1. User Management sub-tab
  { id: 'am-1', resource: 'Access management', subCategory: 'User Management', permission: 'View Student Directory', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: 'am-2', resource: 'Access management', subCategory: 'User Management', permission: 'Edit Student Details', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-3', resource: 'Access management', subCategory: 'User Management', permission: 'Add New Student', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-4', resource: 'Access management', subCategory: 'User Management', permission: 'Student Tab View', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: 'am-5', resource: 'Access management', subCategory: 'User Management', permission: 'Employee Tab View', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-6', resource: 'Access management', subCategory: 'User Management', permission: 'Counsellor Tab View', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-7', resource: 'Access management', subCategory: 'User Management', permission: 'Add Employee Account', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-8', resource: 'Access management', subCategory: 'User Management', permission: 'View Employee Profile', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-9', resource: 'Access management', subCategory: 'User Management', permission: 'Edit Employee Profile', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-10', resource: 'Access management', subCategory: 'User Management', permission: 'User Actions & Status Toggle', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-11', resource: 'Access management', subCategory: 'User Management', permission: 'Student Login Access', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-12', resource: 'Access management', subCategory: 'User Management', permission: 'Employee Login Access', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-13', resource: 'Access management', subCategory: 'User Management', permission: 'Reset Password', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-14', resource: 'Access management', subCategory: 'User Management', permission: 'Upload & Download CSV', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-15', resource: 'Access management', subCategory: 'User Management', permission: 'Edit Own Profile', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },

  // 2. Roles & Permission sub-tab
  { id: 'am-16', resource: 'Access management', subCategory: 'Roles & Permission', permission: 'Roles & Permissions View Matrix', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-17', resource: 'Access management', subCategory: 'Roles & Permission', permission: 'Edit Roles & Policy Overrides', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-18', resource: 'Access management', subCategory: 'Roles & Permission', permission: 'Export Permissions CSV', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // 3. Team Setup sub-tab
  { id: 'am-19', resource: 'Access management', subCategory: 'Team Setup', permission: 'Team Setup — View Teams', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: 'am-20', resource: 'Access management', subCategory: 'Team Setup', permission: 'Team Setup — Create & Edit Team', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-21', resource: 'Access management', subCategory: 'Team Setup', permission: 'Team Setup — Member Assignment', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-22', resource: 'Access management', subCategory: 'Team Setup', permission: 'Groups Management', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },

  // 4. User Active Session sub-tab
  { id: 'am-23', resource: 'Access management', subCategory: 'User Active Session', permission: 'User Active Session — View Live Sessions', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-24', resource: 'Access management', subCategory: 'User Active Session', permission: 'User Active Session — Revoke & Terminate', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-25', resource: 'Access management', subCategory: 'User Active Session', permission: 'Auto Logout Governance', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // 5. Help Desk sub-tab
  { id: 'am-26', resource: 'Access management', subCategory: 'Help Desk', permission: 'Help Desk — View Tickets & Escalations', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: true, guest: false } },
  { id: 'am-27', resource: 'Access management', subCategory: 'Help Desk', permission: 'Help Desk — Assign & Respond', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: 'am-28', resource: 'Access management', subCategory: 'Help Desk', permission: 'Help Desk — Ticket Configuration', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-29', resource: 'Access management', subCategory: 'Help Desk', permission: 'Ai Issue Report Clickup', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-30', resource: 'Access management', subCategory: 'Help Desk', permission: 'New Feature Request Admin', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // 6. Impersonation Logs sub-tab
  { id: 'am-31', resource: 'Access management', subCategory: 'Impersonation Logs', permission: 'Impersonation Logs — View Audit Trail', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-32', resource: 'Access management', subCategory: 'Impersonation Logs', permission: 'Export Impersonation Records', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // 7. User Active Session Logs sub-tab
  { id: 'am-33', resource: 'Access management', subCategory: 'Session Logs', permission: 'Session Logs — Historical View', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-34', resource: 'Access management', subCategory: 'Session Logs', permission: 'User Journey Audit Logs', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // 8. Biometric Logs sub-tab
  { id: 'am-35', resource: 'Access management', subCategory: 'Biometric Logs', permission: 'Biometric Logs — View Turnstile Events', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-36', resource: 'Access management', subCategory: 'Biometric Logs', permission: 'Attendance Exemption', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: 'am-37', resource: 'Access management', subCategory: 'Biometric Logs', permission: 'Hardware Device Sync & Status', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // General Access Management controls
  { id: 'am-38', resource: 'Access management', permission: 'Counselling / Disciplinary Logs', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: true, guest: false } },
  { id: 'am-39', resource: 'Access management', permission: 'Resource Access Preference', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: 'am-40', resource: 'Access management', permission: 'Travel Document Approval', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Cohort Management
  { id: '1', resource: 'Cohort Management', permission: 'Publish Grades', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '2', resource: 'Cohort Management', permission: 'Attendance Feedback', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '3', resource: 'Cohort Management', permission: 'Mark/Edit Attendance', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '4', resource: 'Cohort Management', permission: 'Create Group', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '5', resource: 'Cohort Management', permission: 'Publish Group', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '6', resource: 'Cohort Management', permission: 'Grading Template', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '7', resource: 'Cohort Management', permission: 'Attendance Template', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '8', resource: 'Cohort Management', permission: 'Doubt & Discussion', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '9', resource: 'Cohort Management', permission: 'Manage Students', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '10', resource: 'Cohort Management', permission: 'NPS', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '11', resource: 'Cohort Management', permission: 'Download Section - Wise Attendance', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '12', resource: 'Cohort Management', permission: 'Download Attendance Report', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '13', resource: 'Cohort Management', permission: 'Edit Cohort', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '14', resource: 'Cohort Management', permission: 'Cohort Consent', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '15', resource: 'Cohort Management', permission: 'Delete Cohort', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '16', resource: 'Cohort Management', permission: 'Feedback Toggle', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '17', resource: 'Cohort Management', permission: 'Attendance Report', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '18', resource: 'Cohort Management', permission: 'Delete Session', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '19', resource: 'Cohort Management', permission: 'Session Attendance', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '20', resource: 'Cohort Management', permission: 'Session Feedback', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '21', resource: 'Cohort Management', permission: 'Grade View Responses', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '22', resource: 'Cohort Management', permission: 'Upload Grades Csv', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '23', resource: 'Cohort Management', permission: 'View Course Details', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '24', resource: 'Cohort Management', permission: 'View Cohort Details', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '25', resource: 'Cohort Management', permission: 'Create Sessions', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '26', resource: 'Cohort Management', permission: 'Schedule Sessions', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '27', resource: 'Cohort Management', permission: 'Edit Resources', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '28', resource: 'Cohort Management', permission: 'View Doubt Thread', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '29', resource: 'Cohort Management', permission: 'Edit Session', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '30', resource: 'Cohort Management', permission: 'Add Resources', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '31', resource: 'Cohort Management', permission: 'View Resources', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '32', resource: 'Cohort Management', permission: 'Delete Resources', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '33', resource: 'Cohort Management', permission: 'Add Cohort', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '34', resource: 'Cohort Management', permission: 'Ticket configuration', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '35', resource: 'Cohort Management', permission: 'Session', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '36', resource: 'Cohort Management', permission: 'Resource', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '37', resource: 'Cohort Management', permission: 'Grades', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '38', resource: 'Cohort Management', permission: 'Groups', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '39', resource: 'Cohort Management', permission: 'Messages', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '40', resource: 'Cohort Management', permission: 'Failed Course Email', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: true, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '41', resource: 'Cohort Management', permission: 'Faculty Feedback', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Program Management
  { id: '73', resource: 'Program Management', permission: 'Program List', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '74', resource: 'Program Management', permission: 'Edit Program', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '75', resource: 'Program Management', permission: 'Program View', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '76', resource: 'Program Management', permission: 'Delete Program', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '77', resource: 'Program Management', permission: 'Add Program', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Course Management
  { id: '78', resource: 'Course Management', permission: 'Edit Session', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '79', resource: 'Course Management', permission: 'Course List', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '80', resource: 'Course Management', permission: 'Edit Course', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '81', resource: 'Course Management', permission: 'Add Session', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '82', resource: 'Course Management', permission: 'Course Detail', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '83', resource: 'Course Management', permission: 'Duplicate Course', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '84', resource: 'Course Management', permission: 'Duplicate Course & Session', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '85', resource: 'Course Management', permission: 'Publish/Unpublish Course', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '86', resource: 'Course Management', permission: 'Delete Course', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '87', resource: 'Course Management', permission: 'Edit Course Detail', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '88', resource: 'Course Management', permission: 'Add Course Session', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '89', resource: 'Course Management', permission: 'Add Course Master', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '90', resource: 'Course Management', permission: 'Attendance', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Category management
  { id: '91', resource: 'Category management', permission: 'Category List', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '92', resource: 'Category management', permission: 'Edit Category', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '93', resource: 'Category management', permission: 'Delete Category', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '94', resource: 'Category management', permission: 'Add Sub Category', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '95', resource: 'Category management', permission: 'Add Category', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Configuration
  { id: '96', resource: 'Configuration', permission: 'Course Domain', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '97', resource: 'Configuration', permission: 'Course Question', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '98', resource: 'Configuration', permission: 'Ticket Configuration (Global Assignee)', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '99', resource: 'Configuration', permission: 'New feature', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '100', resource: 'Configuration', permission: 'Placement Level', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '101', resource: 'Configuration', permission: 'Course Type', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '102', resource: 'Configuration', permission: 'Course Tag', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '103', resource: 'Configuration', permission: 'Course Mode', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '104', resource: 'Configuration', permission: 'Class Type', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '105', resource: 'Configuration', permission: 'Grading Template', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '106', resource: 'Configuration', permission: 'Club Type', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '107', resource: 'Configuration', permission: 'Biometric Room', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '108', resource: 'Configuration', permission: 'Biometric Device', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '109', resource: 'Configuration', permission: 'Device Connect', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '110', resource: 'Configuration', permission: 'Nps Management', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '111', resource: 'Configuration', permission: 'Theme Management', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '112', resource: 'Configuration', permission: 'Email Configuration', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '113', resource: 'Configuration', permission: 'Ticket Configuration (Reply Template)', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '114', resource: 'Configuration', permission: 'Navigation Menu', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '115', resource: 'Configuration', permission: 'Student Profile', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '116', resource: 'Configuration', permission: 'Session Feedback', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '117', resource: 'Configuration', permission: 'Timezone Management', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '118', resource: 'Configuration', permission: 'Zoom Meeting', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '119', resource: 'Configuration', permission: 'IT Feedback', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '120', resource: 'Configuration', permission: 'Attendance Remark', roles: { superAdmin: false, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '121', resource: 'Configuration', permission: 'Student Holiday', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Grade
  { id: '122', resource: 'Grade', permission: 'Publish Grade', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '123', resource: 'Grade', permission: 'Upload/Download Grade', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '124', resource: 'Grade', permission: 'Draft->Review', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '125', resource: 'Grade', permission: 'Review->Publish', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '126', resource: 'Grade', permission: 'Grade logs', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Career Coach
  { id: '127', resource: 'Career Coach', permission: 'Change Placement Status', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '128', resource: 'Career Coach', permission: 'Post Job', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '129', resource: 'Career Coach', permission: 'Create Company', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '130', resource: 'Career Coach', permission: 'Edit Company Details', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '131', resource: 'Career Coach', permission: 'Edit Job', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '132', resource: 'Career Coach', permission: 'Delete Job', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '133', resource: 'Career Coach', permission: 'Edit Applicant', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '134', resource: 'Career Coach', permission: 'Delete Applicant', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '135', resource: 'Career Coach', permission: 'View Applicant', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '136', resource: 'Career Coach', permission: 'Update Hiring WorkFlow', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '137', resource: 'Career Coach', permission: 'Move To Applicant', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '138', resource: 'Career Coach', permission: 'Debar Student', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '139', resource: 'Career Coach', permission: 'Schedule Interview', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '140', resource: 'Career Coach', permission: 'Change Interview Round', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '141', resource: 'Career Coach', permission: 'Add Placement Skills', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '142', resource: 'Career Coach', permission: 'Edit Placement Skills', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '143', resource: 'Career Coach', permission: 'Add Job Category', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '144', resource: 'Career Coach', permission: 'Placement Dashboard', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '145', resource: 'Career Coach', permission: 'Placement Company List', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '146', resource: 'Career Coach', permission: 'Placement Job List', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '147', resource: 'Career Coach', permission: 'Placement Configuration', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '148', resource: 'Career Coach', permission: 'View Job Detail', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Events
  { id: '149', resource: 'Events', permission: 'Event Planning', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '150', resource: 'Events', permission: 'Events', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '151', resource: 'Events', permission: 'Club', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '152', resource: 'Events', permission: 'View Events', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '153', resource: 'Events', permission: 'Manage Participants', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '154', resource: 'Events', permission: 'Edit Events', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '155', resource: 'Events', permission: 'Copy Link', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '156', resource: 'Events', permission: 'Add Photos', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '157', resource: 'Events', permission: 'Create Event', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '158', resource: 'Events', permission: 'Polls Access', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '159', resource: 'Events', permission: 'Post Create', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '160', resource: 'Events', permission: 'Post Deleted', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '161', resource: 'Events', permission: 'Post Access', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },

  // Ticket Access
  { id: '162', resource: 'Ticket Access', permission: 'Concern Analytics', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '163', resource: 'Ticket Access', permission: 'Escalation Matrix', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '164', resource: 'Ticket Access', permission: 'Tickets Access', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: true, guest: false } },
  { id: '165', resource: 'Ticket Access', permission: 'Ticket Assign To', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '166', resource: 'Ticket Access', permission: 'Unresolved Board', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },

  // Communication
  { id: '167', resource: 'Communication', permission: 'Announcements Access', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '168', resource: 'Communication', permission: 'Push Notification', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '169', resource: 'Communication', permission: 'Messages', roles: { superAdmin: true, orgAdmin: false, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '170', resource: 'Communication', permission: 'Email Board', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '171', resource: 'Communication', permission: 'Whatsapp Board', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '172', resource: 'Communication', permission: 'Feed', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Analytics
  { id: '173', resource: 'Analytics', permission: 'Analytics Logs', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '174', resource: 'Analytics', permission: 'Session Notes', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '175', resource: 'Analytics', permission: 'Usage Analytics', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '176', resource: 'Analytics', permission: 'Performance Statistics', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '177', resource: 'Analytics', permission: 'Student Performance', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '178', resource: 'Analytics', permission: 'Tree View', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '179', resource: 'Analytics', permission: 'Learning Analytics', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '180', resource: 'Analytics', permission: 'NPS Analysis', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '181', resource: 'Analytics', permission: 'Session Feedback Analytics', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '182', resource: 'Analytics', permission: 'Session Video', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '183', resource: 'Analytics', permission: 'Live Term Tracker', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '184', resource: 'Analytics', permission: 'Faculty Performance', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '185', resource: 'Analytics', permission: 'Session Resource', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Coach Form
  { id: '186', resource: 'Coach Form', permission: 'Coach Form List', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '187', resource: 'Coach Form', permission: 'Create Coach Form', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '188', resource: 'Coach Form', permission: 'Edit Coach Form', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '189', resource: 'Coach Form', permission: 'Delete Coach Form', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '190', resource: 'Coach Form', permission: 'Publish Coach Form', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '191', resource: 'Coach Form', permission: 'View Coach Form Responses', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '192', resource: 'Coach Form', permission: 'Grade Coach Form', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '193', resource: 'Coach Form', permission: 'Coach Form Analytics', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '194', resource: 'Coach Form', permission: 'Coach Form Placements', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '195', resource: 'Coach Form', permission: 'Share Coach Form Publicly', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '196', resource: 'Coach Form', permission: 'Reset Coach Form Submissions', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '197', resource: 'Coach Form', permission: 'Generate Coach Form Questions With AI', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '198', resource: 'Coach Form', permission: 'View All Coach Forms', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '199', resource: 'Coach Form', permission: 'Manage Coach Form Integrations', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // AI Console Resource
  { id: '200', resource: 'AI Console Resource', permission: 'AI Console — View', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '201', resource: 'AI Console Resource', permission: 'AI Console — Operate', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },

  // Other modules
  { id: '202', resource: 'Dashboard', permission: 'Dashboard', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: false, student: false, master: true, courseOwners: false, nonTeachingAssistant: true, counsellor: false, guest: false } },
  { id: '203', resource: 'News Feeds', permission: 'News Access', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '204', resource: 'Review Request', permission: 'Review Request', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '205', resource: 'Review Request', permission: 'Review Request Course Approve', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '206', resource: 'Leave Management', permission: 'View Leave', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '207', resource: 'Integration', permission: 'Integration Management', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '208', resource: 'Cdn Management', permission: 'Cdn Upload Access', roles: { superAdmin: true, orgAdmin: true, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '209', resource: 'Schedule Calendar', permission: 'Schedule', roles: { superAdmin: true, orgAdmin: true, manager: true, teacher: true, teachingAssistant: true, student: false, master: true, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '210', resource: 'Apps', permission: 'Cowork', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
  { id: '211', resource: 'Apps', permission: 'Orbit', roles: { superAdmin: true, orgAdmin: false, manager: false, teacher: false, teachingAssistant: false, student: false, master: false, courseOwners: false, nonTeachingAssistant: false, counsellor: false, guest: false } },
]

interface RolesAndPermissionsPageProps {
  onActionNotify?: (message: string) => void
}

export default function RolesAndPermissionsPage({
  onActionNotify = () => {}
}: RolesAndPermissionsPageProps) {
  const [permissions, setPermissions] = useState<PermissionRecord[]>(INITIAL_PERMISSIONS)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSideTab, setActiveSideTab] = useState<string>('access-management')
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [activeRoleFilter, setActiveRoleFilter] = useState<RoleId | 'All'>('All')
  const [activeViewMode, setActiveViewMode] = useState<'matrix' | 'roleView'>('matrix')
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<RoleId>('teacher')
  const [expandedResources, setExpandedResources] = useState<Record<string, boolean>>({})
  const [hasChanges, setHasChanges] = useState(false)

  // Current Side Tab config
  const currentTabConfig = useMemo(() => {
    return SIDE_TABS.find((t) => t.id === activeSideTab) || SIDE_TABS[0]
  }, [activeSideTab])

  // Count permissions per side tab
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: permissions.length }
    SIDE_TABS.forEach((t) => {
      if (t.id !== 'all') {
        counts[t.id] = permissions.filter((p) => p.resource === t.resource).length
      }
    })
    return counts
  }, [permissions])

  // Filtered permissions
  const filteredPermissions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return permissions.filter((p) => {
      const matchSearch =
        !q ||
        p.permission.toLowerCase().includes(q) ||
        p.resource.toLowerCase().includes(q) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(q))

      // Tab filter
      let matchTab = true
      if (activeSideTab !== 'all') {
        matchTab = p.resource === currentTabConfig.resource
        if (matchTab && activeSubCategory !== 'All') {
          matchTab = p.subCategory === activeSubCategory
        }
      }

      // Status filter
      let matchStatus = true
      if (selectedStatus === 'Granted') {
        if (activeRoleFilter !== 'All') {
          matchStatus = p.roles[activeRoleFilter] === true
        } else {
          matchStatus = Object.values(p.roles).some((v) => v === true)
        }
      } else if (selectedStatus === 'Not Granted') {
        if (activeRoleFilter !== 'All') {
          matchStatus = p.roles[activeRoleFilter] === false
        } else {
          matchStatus = Object.values(p.roles).some((v) => v === false)
        }
      }

      return matchSearch && matchTab && matchStatus
    })
  }, [permissions, searchQuery, activeSideTab, currentTabConfig, activeSubCategory, selectedStatus, activeRoleFilter])

  // Group by Resource
  const groupedByResource = useMemo(() => {
    const map = new Map<string, PermissionRecord[]>()
    filteredPermissions.forEach((p) => {
      const group = map.get(p.resource) || []
      group.push(p)
      map.set(p.resource, group)
    })
    return map
  }, [filteredPermissions])

  // Count granted per role
  const roleStats = useMemo(() => {
    const counts: Record<RoleId, number> = {
      superAdmin: 0,
      orgAdmin: 0,
      manager: 0,
      teacher: 0,
      teachingAssistant: 0,
      student: 0,
      master: 0,
      courseOwners: 0,
      nonTeachingAssistant: 0,
      counsellor: 0,
      guest: 0
    }
    permissions.forEach((p) => {
      ROLES_LIST.forEach((r) => {
        if (p.roles[r.id]) {
          counts[r.id]++
        }
      })
    })
    return counts
  }, [permissions])

  const togglePermission = (permId: string, roleKey: RoleId) => {
    setPermissions((prev) =>
      prev.map((item) => {
        if (item.id === permId) {
          const updated = {
            ...item,
            roles: {
              ...item.roles,
              [roleKey]: !item.roles[roleKey]
            }
          }
          return updated
        }
        return item
      })
    )
    setHasChanges(true)
  }

  const toggleResourceForRole = (resourceName: string, roleKey: RoleId, grant: boolean) => {
    setPermissions((prev) =>
      prev.map((item) => {
        if (item.resource === resourceName) {
          return {
            ...item,
            roles: {
              ...item.roles,
              [roleKey]: grant
            }
          }
        }
        return item
      })
    )
    setHasChanges(true)
    onActionNotify(
      `${grant ? 'Granted' : 'Revoked'} all "${resourceName}" permissions for ${
        ROLES_LIST.find((r) => r.id === roleKey)?.label
      }`
    )
  }

  const handleReset = () => {
    if (confirm('Reset all permission overrides back to system baseline?')) {
      setPermissions(INITIAL_PERMISSIONS)
      setHasChanges(false)
      onActionNotify('Permissions reset to default Masters\' Union RBAC schema')
    }
  }

  const handleSave = () => {
    setHasChanges(false)
    onActionNotify('RBAC security policy saved & broadcasted across all active cluster nodes!')
  }

  const exportCSV = () => {
    const headers = ['Resource', 'SubCategory', 'Permissions', ...ROLES_LIST.map((r) => r.label)].join(',')
    const rows = permissions.map((p) => {
      const roleVals = ROLES_LIST.map((r) => (p.roles[r.id] ? 'Granted' : 'Not Granted'))
      return `"${p.resource}","${p.subCategory || ''}","${p.permission}",${roleVals.join(',')}`
    })
    const csvContent = [headers, ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `MU_Roles_Permissions_Matrix_${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
    onActionNotify('Roles & Permissions Matrix exported as CSV')
  }

  const toggleExpand = (res: string) => {
    setExpandedResources((prev) => ({
      ...prev,
      [res]: !prev[res]
    }))
  }

  const handleExpandAll = () => {
    const nextState: Record<string, boolean> = {}
    Array.from(groupedByResource.keys()).forEach((r) => {
      nextState[r] = true
    })
    setExpandedResources(nextState)
  }

  const handleCollapseAll = () => {
    setExpandedResources({})
  }

  return (
    <div className="space-y-4 pb-14 animate-in fade-in duration-150">
      {/* 1. Header Row (No Breadcrumbs) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Roles & Permissions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/70">
              11 Roles • {permissions.length} Grants
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Fine-grained access control tailored across your LMS side tabs and system resources
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {hasChanges && (
            <div className="flex items-center gap-2 animate-in fade-in">
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Discard</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          )}

          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Matrix</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats Bar: Role Coverage Pill Carousel */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Permission Coverage By Role
          </span>
          <span className="text-[11px] text-slate-400">
            Click role to filter or focus
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setActiveRoleFilter('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeRoleFilter === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Roles (Matrix)
          </button>
          {ROLES_LIST.map((role) => {
            const isSelected = activeRoleFilter === role.id
            const count = roleStats[role.id]
            const pct = Math.round((count / permissions.length) * 100)

            return (
              <button
                key={role.id}
                onClick={() => {
                  setActiveRoleFilter(role.id)
                  setSelectedRoleForDetail(role.id)
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? `${role.color} ring-2 ring-teal-600/30 font-bold shadow-xs`
                    : 'bg-white border-gray-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{role.label}</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/5">
                  {count} ({pct}%)
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Main Split View: Left Side-Tabs Panel + Right Matrix/Role Panel */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* Left Side-Tabs Panel */}
        <aside className="w-full lg:w-72 shrink-0 bg-white border border-gray-200 rounded-xl p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between px-1 pb-1 border-b border-gray-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-teal-600" />
              <span>Side Tabs Navigation</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {SIDE_TABS.length - 1} Modules
            </span>
          </div>

          {/* Navigation Item Tabs */}
          <div className="space-y-1 max-h-[calc(100vh-22rem)] overflow-y-auto pr-0.5 scrollbar-thin">
            {SIDE_TABS.map((tab) => {
              const TabIcon = tab.icon
              const isTabActive = activeSideTab === tab.id
              const count = tabCounts[tab.id] || 0

              return (
                <div key={tab.id} className="space-y-0.5">
                  <button
                    onClick={() => {
                      setActiveSideTab(tab.id)
                      setActiveSubCategory('All')
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all cursor-pointer text-left ${
                      isTabActive
                        ? 'bg-teal-50/80 text-teal-800 font-bold border border-teal-200/80 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <TabIcon
                        className={`h-4 w-4 shrink-0 ${
                          isTabActive ? 'text-teal-600' : 'text-slate-400'
                        }`}
                      />
                      <span className="truncate">{tab.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isTabActive
                          ? 'bg-teal-600 text-white font-semibold'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>

                  {/* Sub-tabs when Access Management is active */}
                  {tab.id === 'access-management' && isTabActive && tab.subTabs && (
                    <div className="pl-6 pr-1 py-1 space-y-0.5 border-l-2 border-teal-200/60 ml-4 my-1">
                      {tab.subTabs.map((sub) => {
                        const isSubActive =
                          (sub.id === 'all-access' && activeSubCategory === 'All') ||
                          activeSubCategory === sub.subCategory

                        return (
                          <button
                            key={sub.id}
                            onClick={() =>
                              setActiveSubCategory(sub.subCategory || 'All')
                            }
                            className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition-colors cursor-pointer flex items-center justify-between ${
                              isSubActive
                                ? 'bg-teal-600 text-white font-semibold shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                            }`}
                          >
                            <span className="truncate">{sub.label}</span>
                            {sub.subCategory && (
                              <span
                                className={`text-[9px] font-mono ml-1 ${
                                  isSubActive ? 'text-teal-100' : 'text-slate-400'
                                }`}
                              >
                                {
                                  permissions.filter(
                                    (p) => p.subCategory === sub.subCategory
                                  ).length
                                }
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </aside>

        {/* Right Main Panel: Matrix / Focus View */}
        <div className="flex-1 w-full space-y-3 min-w-0">
          {/* Filter & View Switcher Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[260px]">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search ${currentTabConfig.label.toLowerCase()} permissions...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="relative min-w-[130px]">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-xs text-slate-700 font-medium focus:outline-none focus:border-teal-600 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Granted">Granted Only</option>
                  <option value="Not Granted">Not Granted Only</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {(searchQuery || selectedStatus !== 'All' || activeRoleFilter !== 'All' || activeSubCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedStatus('All')
                    setActiveRoleFilter('All')
                    setActiveSubCategory('All')
                  }}
                  className="text-xs text-slate-500 hover:text-teal-700 font-semibold cursor-pointer underline px-1"
                >
                  Reset
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-gray-200">
              <button
                onClick={() => setActiveViewMode('matrix')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeViewMode === 'matrix'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Matrix Grid
              </button>
              <button
                onClick={() => setActiveViewMode('roleView')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeViewMode === 'roleView'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Role Focus
              </button>
            </div>
          </div>

          {/* Matrix or Role Focus */}
          {activeViewMode === 'matrix' ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto max-h-[calc(100vh-22rem)] scrollbar-thin">
                <table className="w-full text-left border-collapse text-xs">
                  {/* Sticky Table Header */}
                  <thead className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-xs border-b border-gray-200 text-slate-700">
                    <tr>
                      <th className="py-3 px-4 font-bold text-slate-800 w-[260px] sticky left-0 z-30 bg-slate-50 border-r border-gray-200 shadow-[1px_0_0_rgba(0,0,0,0.05)]">
                        <div className="flex items-center justify-between">
                          <span>Permissions ({filteredPermissions.length})</span>
                          <div className="flex items-center gap-1.5 font-normal text-[10px] text-slate-500">
                            <button
                              onClick={handleExpandAll}
                              className="hover:text-teal-700 underline cursor-pointer"
                            >
                              Expand all
                            </button>
                            <span>•</span>
                            <button
                              onClick={handleCollapseAll}
                              className="hover:text-teal-700 underline cursor-pointer"
                            >
                              Collapse all
                            </button>
                          </div>
                        </div>
                      </th>
                      {ROLES_LIST.map((role) => {
                        const isHighlighted = activeRoleFilter === role.id
                        return (
                          <th
                            key={role.id}
                            className={`py-3 px-3 text-center min-w-[125px] font-semibold transition-colors border-r border-gray-100 ${
                              isHighlighted
                                ? 'bg-teal-50/80 text-teal-800 font-bold'
                                : 'text-slate-700'
                            }`}
                          >
                            <div className="truncate text-[11px] leading-tight" title={role.label}>
                              {role.label}
                            </div>
                            <span className="text-[10px] font-normal text-slate-400 font-mono block mt-0.5">
                              {roleStats[role.id]} granted
                            </span>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>

                  {/* Table Body Grouped by Resource */}
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {Array.from(groupedByResource.entries()).map(([resourceName, perms]) => {
                      // If specific side tab is active (and not "all"), auto-expand; otherwise obey expandedResources state
                      const isExpanded =
                        activeSideTab !== 'all' ||
                        !!expandedResources[resourceName] ||
                        Boolean(searchQuery.trim())

                      return (
                        <tr key={resourceName} className="contents">
                          {/* Section Header Row for Resource */}
                          <tr className="bg-slate-100/70 border-y border-gray-200 text-slate-800 font-bold">
                            <td
                              colSpan={ROLES_LIST.length + 1}
                              className="py-2.5 px-4 text-xs sticky left-0 z-10 bg-slate-100/90 backdrop-blur-xs"
                            >
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => toggleExpand(resourceName)}
                                  className="flex items-center gap-2 hover:text-teal-700 transition-colors cursor-pointer"
                                >
                                  <span className="p-0.5 rounded hover:bg-slate-200 text-slate-500">
                                    {isExpanded ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </span>
                                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                    {resourceName}
                                  </span>
                                  <span className="text-[11px] font-normal text-slate-400 font-mono">
                                    ({perms.length} {perms.length === 1 ? 'permission' : 'permissions'})
                                  </span>
                                </button>

                                {/* Batch action quick menu */}
                                <div className="hidden sm:flex items-center gap-2 text-[11px] font-normal text-slate-500">
                                  <span>Quick Apply:</span>
                                  <button
                                    onClick={() =>
                                      toggleResourceForRole(resourceName, 'superAdmin', true)
                                    }
                                    className="text-teal-700 hover:underline cursor-pointer"
                                  >
                                    Super Admin All
                                  </button>
                                  <span>•</span>
                                  <button
                                    onClick={() =>
                                      toggleResourceForRole(resourceName, 'teacher', true)
                                    }
                                    className="text-teal-700 hover:underline cursor-pointer"
                                  >
                                    Teacher All
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>

                          {/* Items under this resource */}
                          {isExpanded &&
                            perms.map((perm) => (
                              <tr
                                key={perm.id}
                                className="hover:bg-slate-50/80 transition-colors group"
                              >
                                {/* Permission Name Column (Sticky left) */}
                                <td className="py-2.5 px-4 font-medium text-slate-800 sticky left-0 bg-white group-hover:bg-slate-50 border-r border-gray-200 shadow-[1px_0_0_rgba(0,0,0,0.05)] z-10">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="min-w-0">
                                      <span
                                        className="truncate block"
                                        title={perm.permission}
                                      >
                                        {perm.permission}
                                      </span>
                                      {perm.subCategory && (
                                        <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-100 font-normal inline-block mt-0.5">
                                          {perm.subCategory}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                                      #{perm.id}
                                    </span>
                                  </div>
                                </td>

                                {/* Role Toggles */}
                                {ROLES_LIST.map((role) => {
                                  const isGranted = perm.roles[role.id]
                                  const isHighlighted = activeRoleFilter === role.id

                                  return (
                                    <td
                                      key={role.id}
                                      onClick={() => togglePermission(perm.id, role.id)}
                                      className={`py-2 px-2 text-center border-r border-gray-100 cursor-pointer select-none transition-colors ${
                                        isHighlighted ? 'bg-teal-50/30' : ''
                                      } hover:bg-teal-50/60`}
                                      title={`Click to ${
                                        isGranted ? 'revoke' : 'grant'
                                      } "${perm.permission}" for ${role.label}`}
                                    >
                                      <div className="flex items-center justify-center">
                                        {isGranted ? (
                                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs group-hover:scale-105 transition-transform">
                                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                                          </span>
                                        ) : (
                                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-50 text-slate-300 border border-gray-200/60 group-hover:border-slate-300 group-hover:text-slate-400 transition-colors">
                                            <X className="h-3 w-3" />
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                  )
                                })}
                              </tr>
                            ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Matrix Footer Legend */}
              <div className="p-3 border-t border-gray-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                    <span className="font-medium text-slate-700">Granted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-slate-50 text-slate-300 border border-gray-200">
                      <X className="h-2.5 w-2.5" />
                    </span>
                    <span className="font-medium text-slate-700">Not Granted</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">
                    Tip: Click any cell to toggle authorization.
                  </span>
                </div>

                <div className="text-[11px] text-slate-500">
                  Showing <strong className="text-slate-800">{filteredPermissions.length}</strong> of{' '}
                  {permissions.length} total permissions
                </div>
              </div>
            </div>
          ) : (
            /* Role Focus View */
            <div className="space-y-4">
              {/* Active Role Selector Strip */}
              <div className="flex items-center gap-2 overflow-x-auto p-1 bg-slate-100 rounded-xl">
                {ROLES_LIST.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRoleForDetail(role.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedRoleForDetail === role.id
                        ? 'bg-white text-slate-900 shadow-xs border border-gray-200 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>

              {/* Detail Card for the selected role */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {ROLES_LIST.find((r) => r.id === selectedRoleForDetail)?.label} Permissions
                      </h3>
                      <p className="text-xs text-slate-500">
                        Granted {roleStats[selectedRoleForDetail]} of {permissions.length} total operational privileges (
                        {Math.round((roleStats[selectedRoleForDetail] / permissions.length) * 100)}% coverage)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setPermissions((prev) =>
                          prev.map((item) => ({
                            ...item,
                            roles: { ...item.roles, [selectedRoleForDetail]: true }
                          }))
                        )
                        setHasChanges(true)
                        onActionNotify(`Granted all permissions for ${ROLES_LIST.find((r) => r.id === selectedRoleForDetail)?.label}`)
                      }}
                      className="px-3 py-1.5 rounded-lg border border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-semibold cursor-pointer"
                    >
                      Grant All
                    </button>
                    <button
                      onClick={() => {
                        setPermissions((prev) =>
                          prev.map((item) => ({
                            ...item,
                            roles: { ...item.roles, [selectedRoleForDetail]: false }
                          }))
                        )
                        setHasChanges(true)
                        onActionNotify(`Revoked all permissions for ${ROLES_LIST.find((r) => r.id === selectedRoleForDetail)?.label}`)
                      }}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold cursor-pointer"
                    >
                      Revoke All
                    </button>
                  </div>
                </div>

                {/* List by Resources */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from(groupedByResource.entries()).map(([resName, perms]) => {
                    const grantedInResource = perms.filter((p) => p.roles[selectedRoleForDetail]).length
                    const totalInResource = perms.length

                    return (
                      <div
                        key={resName}
                        className="border border-gray-200/90 rounded-xl bg-slate-50/40 p-4 space-y-3 shadow-2xs hover:shadow-xs transition-shadow"
                      >
                        <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 truncate" title={resName}>
                              {resName}
                            </h4>
                            <span className="text-[10px] text-slate-400">
                              {grantedInResource} of {totalInResource} granted
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleResourceForRole(resName, selectedRoleForDetail, true)}
                              className="p-1 rounded text-teal-700 hover:bg-teal-50 text-[10px] font-semibold cursor-pointer"
                              title="Grant All in this group"
                            >
                              All
                            </button>
                            <button
                              onClick={() => toggleResourceForRole(resName, selectedRoleForDetail, false)}
                              className="p-1 rounded text-rose-600 hover:bg-rose-50 text-[10px] font-semibold cursor-pointer"
                              title="None in this group"
                            >
                              None
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 text-xs">
                          {perms.map((p) => {
                            const isGranted = p.roles[selectedRoleForDetail]
                            return (
                              <div
                                key={p.id}
                                onClick={() => togglePermission(p.id, selectedRoleForDetail)}
                                className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer select-none ${
                                  isGranted
                                    ? 'bg-white border-emerald-200 text-slate-800 shadow-2xs'
                                    : 'bg-slate-100/60 border-transparent text-slate-400'
                                }`}
                              >
                                <div className="min-w-0 pr-2">
                                  <span className="text-xs truncate block" title={p.permission}>
                                    {p.permission}
                                  </span>
                                  {p.subCategory && (
                                    <span className="text-[9px] text-teal-600 font-mono">
                                      {p.subCategory}
                                    </span>
                                  )}
                                </div>
                                <span
                                  className={`p-1 rounded-md shrink-0 ${
                                    isGranted ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-400'
                                  }`}
                                >
                                  {isGranted ? (
                                    <Check className="h-3 w-3 stroke-[2.5]" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

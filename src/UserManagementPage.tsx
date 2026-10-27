import { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Plus,
  Download,
  Upload,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
  X,
  Info,
  RotateCw,
  Users,
  Eye,
  KeyRound,
  UserCheck,
  UserX,
  FileSpreadsheet,
  AlertCircle,
  MessageCircle,
  Globe,
  SlidersHorizontal,
  Mail,
  Phone,
  Calendar,
  Building,
  ShieldCheck
} from 'lucide-react'

export interface UserRecord {
  id: string
  name: string
  salutation?: string
  email: string
  contact: string
  program: string
  programShort: string
  cohort: string
  consent: 'Not Applicable' | 'Consented' | 'Pending' | 'Declined'
  biometric: 'Yes' | 'No'
  programCohortStatus: 'Active' | 'Inactive' | 'Pending' | 'Completed'
  userStatus: 'Active' | 'Inactive' | 'Suspended'
  avatarUrl: string
  gender?: 'M' | 'F' | 'O'
  role: 'Student' | 'Employee' | 'Counsellor'
  enrollmentDate?: string
  term?: string
  section?: string
  department?: string
  designation?: string
  attendancePct?: number
}

const INITIAL_STUDENTS: UserRecord[] = [
  {
    id: '6360',
    salutation: 'Ms.',
    name: 'Mansa Bihani',
    email: 'mansa.bihani2027@mastersunion.edu.in',
    contact: '+919398649093',
    program: 'PGP in Technology and Business Management',
    programShort: 'PGP in Technology and B...',
    cohort: 'PGPTBM-C7',
    consent: 'Not Applicable',
    biometric: 'No',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    gender: 'F',
    role: 'Student',
    enrollmentDate: '15-06-2024',
    term: 'Term 1',
    section: 'Section 1',
    attendancePct: 96
  },
  {
    id: '6359',
    name: 'Adarsh Raj',
    email: 'adarsh.raj2027@mastersunion.org',
    contact: '+918310667351',
    program: 'PGP in Technology and Business Management',
    programShort: 'PGP in Technology and B...',
    cohort: 'PGPTBM-C7',
    consent: 'Not Applicable',
    biometric: 'No',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    gender: 'M',
    role: 'Student',
    enrollmentDate: '15-06-2024',
    term: 'Term 1',
    section: 'Section 2',
    attendancePct: 92
  },
  {
    id: '6358',
    salutation: 'Mr.',
    name: 'Akshay Wilson',
    email: 'akshay.wilson2027@mastersunion.edu.in',
    contact: '+917559838823',
    program: 'PGP in Technology and Business Management',
    programShort: 'PGP in Technology and B...',
    cohort: 'PGPTBM-C7',
    consent: 'Not Applicable',
    biometric: 'No',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    gender: 'M',
    role: 'Student',
    enrollmentDate: '15-06-2024',
    term: 'Term 1',
    section: 'Section 1',
    attendancePct: 88
  },
  {
    id: '6357',
    salutation: 'Ms.',
    name: 'Ananya Verma',
    email: 'ananya.verma2027@mastersunion.org',
    contact: '+919810452319',
    program: 'PGP in Technology and Business Management',
    programShort: 'PGP in Technology and B...',
    cohort: 'PGPTBM-C7',
    consent: 'Consented',
    biometric: 'Yes',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    gender: 'F',
    role: 'Student',
    enrollmentDate: '16-06-2024',
    term: 'Term 1',
    section: 'Section 3',
    attendancePct: 98
  },
  {
    id: '6356',
    salutation: 'Mr.',
    name: 'Rohan Mehra',
    email: 'rohan.mehra2026@mastersunion.org',
    contact: '+919871234567',
    program: 'PGP Rise (Working Professionals)',
    programShort: 'PGP Rise...',
    cohort: 'Rise-C2',
    consent: 'Consented',
    biometric: 'Yes',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    gender: 'M',
    role: 'Student',
    enrollmentDate: '01-08-2024',
    term: 'Term 2',
    section: 'Section 1',
    attendancePct: 91
  },
  {
    id: '6355',
    salutation: 'Ms.',
    name: 'Sneha Gupta',
    email: 'sneha.gupta2027@mastersunion.edu.in',
    contact: '+919811223344',
    program: 'PGP in Technology and Business Management',
    programShort: 'PGP in Technology and B...',
    cohort: 'PGPTBM-C6',
    consent: 'Pending',
    biometric: 'No',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    gender: 'F',
    role: 'Student',
    enrollmentDate: '10-06-2023',
    term: 'Term 4',
    section: 'Section 2',
    attendancePct: 94
  },
  {
    id: '6354',
    salutation: 'Mr.',
    name: 'Kabir Singhal',
    email: 'kabir.singhal2027@mastersunion.org',
    contact: '+919712398765',
    program: 'UG Programme in Technology & Business',
    programShort: 'UG Programme in Tech...',
    cohort: 'UGTBM-C3',
    consent: 'Not Applicable',
    biometric: 'No',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    gender: 'M',
    role: 'Student',
    enrollmentDate: '20-07-2024',
    term: 'Term 1',
    section: 'Section 1',
    attendancePct: 85
  },
  {
    id: '6353',
    salutation: 'Ms.',
    name: 'Pooja Sen',
    email: 'pooja.sen2026@mastersunion.edu.in',
    contact: '+919654321098',
    program: 'PGP in Technology and Business Management',
    programShort: 'PGP in Technology and B...',
    cohort: 'PGPTBM-C6',
    consent: 'Declined',
    biometric: 'No',
    programCohortStatus: 'Active',
    userStatus: 'Inactive',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    gender: 'F',
    role: 'Student',
    enrollmentDate: '15-06-2023',
    term: 'Term 3',
    section: 'Section 1',
    attendancePct: 62
  },
  {
    id: '6352',
    salutation: 'Mr.',
    name: 'Tanmay Bhatia',
    email: 'tanmay.bhatia2027@mastersunion.org',
    contact: '+919988776655',
    program: 'PGP in Technology and Business Management',
    programShort: 'PGP in Technology and B...',
    cohort: 'PGPTBM-C7',
    consent: 'Consented',
    biometric: 'Yes',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    gender: 'M',
    role: 'Student',
    enrollmentDate: '18-06-2024',
    term: 'Term 1',
    section: 'Section 2',
    attendancePct: 97
  },
  {
    id: '6351',
    salutation: 'Ms.',
    name: 'Divya Nair',
    email: 'divya.nair2027@mastersunion.edu.in',
    contact: '+919123456780',
    program: 'PGP in Technology and Business Management',
    programShort: 'PGP in Technology and B...',
    cohort: 'PGPTBM-C7',
    consent: 'Not Applicable',
    biometric: 'No',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    gender: 'F',
    role: 'Student',
    enrollmentDate: '18-06-2024',
    term: 'Term 1',
    section: 'Section 3',
    attendancePct: 90
  },
  {
    id: '6350',
    salutation: 'Mr.',
    name: 'Gaurav Agarwal',
    email: 'gaurav.agarwal2027@mastersunion.org',
    contact: '+919876012345',
    program: 'PGP Rise (Working Professionals)',
    programShort: 'PGP Rise...',
    cohort: 'Rise-C2',
    consent: 'Consented',
    biometric: 'Yes',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    gender: 'M',
    role: 'Student',
    enrollmentDate: '01-08-2024',
    term: 'Term 2',
    section: 'Section 1',
    attendancePct: 89
  },
  {
    id: '6349',
    salutation: 'Ms.',
    name: 'Ritika Roy',
    email: 'ritika.roy2027@mastersunion.edu.in',
    contact: '+919765432190',
    program: 'UG Programme in Technology & Business',
    programShort: 'UG Programme in Tech...',
    cohort: 'UGTBM-C3',
    consent: 'Not Applicable',
    biometric: 'No',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    gender: 'F',
    role: 'Student',
    enrollmentDate: '22-07-2024',
    term: 'Term 1',
    section: 'Section 2',
    attendancePct: 93
  }
]

const INITIAL_EMPLOYEES: UserRecord[] = [
  {
    id: '5012',
    salutation: 'Dr.',
    name: 'Mahima Gupta',
    email: 'mahima.gupta@mastersunion.org',
    contact: '+919811002233',
    program: 'Academics & Faculty Operations',
    programShort: 'Academics & Faculty Ops...',
    cohort: 'Faculty Core',
    consent: 'Consented',
    biometric: 'Yes',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80',
    gender: 'F',
    role: 'Employee',
    department: 'Academics',
    designation: 'Professor & Area Chair'
  },
  {
    id: '5011',
    salutation: 'Mr.',
    name: 'Rohan Kapoor',
    email: 'rohan.kapoor@mastersunion.org',
    contact: '+919822334455',
    program: 'Program Management Office',
    programShort: 'PMO - PGPTBM',
    cohort: 'PMO Staff',
    consent: 'Consented',
    biometric: 'Yes',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    gender: 'M',
    role: 'Employee',
    department: 'Program Delivery',
    designation: 'Lead Program Associate'
  },
  {
    id: '5010',
    salutation: 'Ms.',
    name: 'Priya Sharma',
    email: 'priya.sharma@mastersunion.org',
    contact: '+919933445566',
    program: 'Curriculum & Student Operations',
    programShort: 'Student Experience Team',
    cohort: 'Ops Staff',
    consent: 'Consented',
    biometric: 'Yes',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    gender: 'F',
    role: 'Employee',
    department: 'Student Experience',
    designation: 'Senior Operations Specialist'
  }
]

const INITIAL_COUNSELLORS: UserRecord[] = [
  {
    id: '4005',
    salutation: 'Mr.',
    name: 'Vikram Malhotra',
    email: 'vikram.malhotra@mastersunion.org',
    contact: '+919899112233',
    program: 'Admissions & Career Advisory',
    programShort: 'Admissions Advisory',
    cohort: 'UG & PG Advisory',
    consent: 'Consented',
    biometric: 'Yes',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    gender: 'M',
    role: 'Counsellor',
    department: 'Admissions & Outreach',
    designation: 'Principal Career Counsellor'
  },
  {
    id: '4004',
    salutation: 'Ms.',
    name: 'Sneha Desai',
    email: 'sneha.desai@mastersunion.org',
    contact: '+919877665544',
    program: 'Student Welfare & Coaching',
    programShort: 'Student Welfare',
    cohort: 'All Cohorts',
    consent: 'Consented',
    biometric: 'Yes',
    programCohortStatus: 'Active',
    userStatus: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    gender: 'F',
    role: 'Counsellor',
    department: 'Student Support',
    designation: 'Senior Mental Health & Life Coach'
  }
]

interface UserManagementPageProps {
  onActionNotify?: (message: string) => void
}

export default function UserManagementPage({
  onActionNotify = () => {}
}: UserManagementPageProps) {
  // Tabs: Student, Employee, Counsellor
  const [activeUserTab, setActiveUserTab] = useState<'Student' | 'Employee' | 'Counsellor'>('Student')

  // Data states
  const [students, setStudents] = useState<UserRecord[]>(INITIAL_STUDENTS)
  const [employees, setEmployees] = useState<UserRecord[]>(INITIAL_EMPLOYEES)
  const [counsellors, setCounsellors] = useState<UserRecord[]>(INITIAL_COUNSELLORS)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProgramFilter, setSelectedProgramFilter] = useState('')
  const [selectedCohortFilter, setSelectedCohortFilter] = useState('')
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('')

  // Selection
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Modals & Drawers
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false)
  const [isStatusInfoModalOpen, setIsStatusInfoModalOpen] = useState(false)
  const [selectedUserForDrawer, setSelectedUserForDrawer] = useState<UserRecord | null>(null)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false)
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // New Student Form State
  const [formData, setFormData] = useState({
    salutation: 'Mr.',
    firstName: '',
    lastName: '',
    email: '',
    contact: '+91',
    program: 'PGP in Technology and Business Management',
    cohort: 'PGPTBM-C7',
    term: 'Term 1',
    section: 'Section 1',
    biometricConsent: false,
    userStatus: 'Active' as 'Active' | 'Inactive'
  })

  // Close active menu on click outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.row-action-menu-container')) {
        setActiveMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleDocumentClick)
    return () => document.removeEventListener('mousedown', handleDocumentClick)
  }, [])

  // Active dataset
  const currentDataset = useMemo(() => {
    if (activeUserTab === 'Student') return students
    if (activeUserTab === 'Employee') return employees
    return counsellors
  }, [activeUserTab, students, employees, counsellors])

  // Filtered dataset
  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return currentDataset.filter((user) => {
      const matchesQuery =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.contact.toLowerCase().includes(q) ||
        user.id.includes(q)

      const matchesProgram =
        !selectedProgramFilter ||
        user.program.toLowerCase() === selectedProgramFilter.toLowerCase()

      const matchesCohort =
        !selectedCohortFilter ||
        user.cohort.toLowerCase() === selectedCohortFilter.toLowerCase()

      const matchesStatus =
        !selectedStatusFilter ||
        user.userStatus.toLowerCase() === selectedStatusFilter.toLowerCase()

      return matchesQuery && matchesProgram && matchesCohort && matchesStatus
    })
  }, [currentDataset, searchQuery, selectedProgramFilter, selectedCohortFilter, selectedStatusFilter])

  // Pagination calculation
  const totalItems = filteredUsers.length
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const paginatedUsers = useMemo(() => {
    const start = (safeCurrentPage - 1) * rowsPerPage
    return filteredUsers.slice(start, start + rowsPerPage)
  }, [filteredUsers, safeCurrentPage, rowsPerPage])

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowIds(paginatedUsers.map((u) => u.id))
    } else {
      setSelectedRowIds([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRowIds((prev) => [...prev, id])
    } else {
      setSelectedRowIds((prev) => prev.filter((item) => item !== id))
    }
  }

  const handleClearAllFilters = () => {
    setSearchQuery('')
    setSelectedProgramFilter('')
    setSelectedCohortFilter('')
    setSelectedStatusFilter('')
    onActionNotify('All search filters cleared')
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      onActionNotify('User roster refreshed from server')
    }, 600)
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.firstName || !formData.email) {
      alert('Please fill in required fields')
      return
    }

    const fullName = `${formData.salutation} ${formData.firstName} ${formData.lastName}`.trim()
    const newId = (Math.floor(6361 + Math.random() * 200)).toString()

    const newRecord: UserRecord = {
      id: newId,
      salutation: formData.salutation,
      name: fullName,
      email: formData.email,
      contact: formData.contact,
      program: formData.program,
      programShort: formData.program.length > 25 ? `${formData.program.slice(0, 24)}...` : formData.program,
      cohort: formData.cohort,
      consent: formData.biometricConsent ? 'Consented' : 'Not Applicable',
      biometric: formData.biometricConsent ? 'Yes' : 'No',
      programCohortStatus: 'Active',
      userStatus: formData.userStatus,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: activeUserTab,
      enrollmentDate: new Date().toLocaleDateString('en-GB'),
      term: formData.term,
      section: formData.section,
      attendancePct: 100
    }

    if (activeUserTab === 'Student') {
      setStudents([newRecord, ...students])
    } else if (activeUserTab === 'Employee') {
      setEmployees([newRecord, ...employees])
    } else {
      setCounsellors([newRecord, ...counsellors])
    }

    setIsCreateModalOpen(false)
    onActionNotify(`New ${activeUserTab} "${fullName}" created successfully!`)
    setFormData({
      salutation: 'Mr.',
      firstName: '',
      lastName: '',
      email: '',
      contact: '+91',
      program: 'PGP in Technology and Business Management',
      cohort: 'PGPTBM-C7',
      term: 'Term 1',
      section: 'Section 1',
      biometricConsent: false,
      userStatus: 'Active'
    })
  }

  const handleToggleStatus = (user: UserRecord) => {
    const newStatus: 'Active' | 'Inactive' = user.userStatus === 'Active' ? 'Inactive' : 'Active'
    const updater = (prev: UserRecord[]): UserRecord[] =>
      prev.map((u) => (u.id === user.id ? { ...u, userStatus: newStatus } : u))

    if (activeUserTab === 'Student') setStudents(updater)
    else if (activeUserTab === 'Employee') setEmployees(updater)
    else setCounsellors(updater)

    onActionNotify(`Status for ${user.name} changed to ${newStatus}`)
    setActiveMenuId(null)
  }

  const handleDeleteUser = (user: UserRecord) => {
    if (confirm(`Are you sure you want to remove ${user.name} (${user.id})?`)) {
      const filterer = (prev: UserRecord[]) => prev.filter((u) => u.id !== user.id)
      if (activeUserTab === 'Student') setStudents(filterer)
      else if (activeUserTab === 'Employee') setEmployees(filterer)
      else setCounsellors(filterer)

      onActionNotify(`User ${user.name} removed`)
      setActiveMenuId(null)
      if (selectedUserForDrawer?.id === user.id) {
        setSelectedUserForDrawer(null)
      }
    }
  }

  const handleBatchStatus = (newStatus: 'Active' | 'Inactive') => {
    const updater = (prev: UserRecord[]) =>
      prev.map((u) => (selectedRowIds.includes(u.id) ? { ...u, userStatus: newStatus } : u))

    if (activeUserTab === 'Student') setStudents(updater)
    else if (activeUserTab === 'Employee') setEmployees(updater)
    else setCounsellors(updater)

    onActionNotify(`${selectedRowIds.length} records updated to ${newStatus}`)
    setSelectedRowIds([])
  }

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-150">
      {/* 1. Top Action Row (No Breadcrumbs) */}
      <div className="flex items-center justify-end gap-2.5">
        <button
          onClick={() => setIsCsvModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-slate-500" />
          <span>Upload/Download CSV</span>
        </button>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>+ Create {activeUserTab}</span>
        </button>
      </div>

      {/* 2. User Category Tabs Row (Student, Employee, Counsellor) + Info Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 gap-3 pt-1">
        {/* Horizontal Underline Tabs */}
        <div className="flex items-center gap-8">
          {(['Student', 'Employee', 'Counsellor'] as const).map((tab) => {
            const isActive = activeUserTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveUserTab(tab)}
                className={`pb-3 text-sm font-semibold transition-all relative cursor-pointer ${
                  isActive
                    ? 'text-teal-700'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0d9488] rounded-t-full" />
                )}
              </button>
            )
          })}
        </div>

        {/* Tab-level info and quick actions on right */}
        <div className="flex items-center gap-2 pb-2">
          <button
            onClick={() => setIsStatusInfoModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-teal-600 text-teal-700 hover:bg-teal-50/60 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
          >
            <span>{activeUserTab} Status Info</span>
            <Info className="h-3.5 w-3.5 ml-0.5 text-teal-600" />
          </button>

          <button
            onClick={() => {
              onActionNotify(`Exporting ${activeUserTab} directory to CSV...`)
            }}
            title="Download directory"
            className="p-1.5 rounded-lg border border-teal-600 text-teal-700 hover:bg-teal-50 transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 3. Search and Multi-Filter Control Box */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center gap-3">
        {/* Search input with leading magnifying glass */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600" />
          <input
            type="text"
            placeholder="Search by name, email or contact"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f8fafc] border border-gray-200/90 rounded-lg pl-10 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown: Select Program */}
        <div className="relative min-w-[160px]">
          <select
            value={selectedProgramFilter}
            onChange={(e) => setSelectedProgramFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-xs text-slate-700 font-medium focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
          >
            <option value="">Select Program</option>
            <option value="PGP in Technology and Business Management">
              PGP in Technology and Business Management
            </option>
            <option value="PGP Rise (Working Professionals)">PGP Rise</option>
            <option value="UG Programme in Technology & Business">
              UG Programme in Technology & Business
            </option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Dropdown: Select Cohort */}
        <div className="relative min-w-[140px]">
          <select
            value={selectedCohortFilter}
            onChange={(e) => setSelectedCohortFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-xs text-slate-700 font-medium focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
          >
            <option value="">Select Cohort</option>
            <option value="PGPTBM-C7">PGPTBM-C7</option>
            <option value="PGPTBM-C6">PGPTBM-C6</option>
            <option value="Rise-C2">Rise-C2</option>
            <option value="UGTBM-C3">UGTBM-C3</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Dropdown: Select Status */}
        <div className="relative min-w-[130px]">
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-xs text-slate-700 font-medium focus:outline-none focus:border-teal-600 cursor-pointer shadow-2xs"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Clear all action */}
        <button
          onClick={handleClearAllFilters}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
          <span>Clear all</span>
        </button>
      </div>

      {/* 4. Results Count Header with refresh spinner */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800">
            Showing {totalItems > 0 ? (safeCurrentPage - 1) * rowsPerPage + 1 : 0}-
            {Math.min(safeCurrentPage * rowsPerPage, totalItems)} of {totalItems > 0 ? '313' : '0'}{' '}
            {activeUserTab.toLowerCase()}s
          </span>
          <button
            onClick={handleRefresh}
            title="Refresh list"
            className="text-teal-600 hover:text-teal-800 transition-transform cursor-pointer"
          >
            <RotateCw
              className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </button>
        </div>

        {/* Batch action indicator when multiple rows are checked */}
        {selectedRowIds.length > 0 && (
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-200/80 px-3 py-1 rounded-lg text-xs animate-in fade-in">
            <span className="font-semibold text-teal-800">
              {selectedRowIds.length} selected
            </span>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => handleBatchStatus('Active')}
              className="text-teal-700 hover:underline font-medium cursor-pointer"
            >
              Activate
            </button>
            <button
              onClick={() => handleBatchStatus('Inactive')}
              className="text-rose-600 hover:underline font-medium cursor-pointer"
            >
              Deactivate
            </button>
            <button
              onClick={() => setSelectedRowIds([])}
              className="text-slate-500 hover:text-slate-700 ml-1 cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* 5. User Management Table matching screenshot */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200/80 bg-white text-slate-700 text-xs font-bold">
                {/* Select All Checkbox */}
                <th className="py-3.5 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      paginatedUsers.length > 0 &&
                      paginatedUsers.every((u) => selectedRowIds.includes(u.id))
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                  />
                </th>

                <th className="py-3.5 px-4 font-semibold text-slate-700">ID</th>
                <th className="py-3.5 px-4 font-semibold text-slate-700 min-w-[200px]">
                  {activeUserTab}
                </th>
                <th className="py-3.5 px-4 font-semibold text-slate-700">Contact</th>
                <th className="py-3.5 px-4 font-semibold text-slate-700 min-w-[180px]">
                  Program · Cohort
                </th>
                <th className="py-3.5 px-4 font-semibold text-slate-700 min-w-[140px]">
                  Consent · Biometric
                </th>
                <th className="py-3.5 px-4 font-semibold text-slate-700 min-w-[160px]">
                  Program · Cohort Status
                </th>
                <th className="py-3.5 px-4 font-semibold text-slate-700">User Status</th>
                <th className="py-3.5 px-4 w-12 text-center font-semibold text-slate-700">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-xs">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="h-8 w-8 text-slate-300" />
                      <p className="text-sm font-semibold text-slate-600">No records found</p>
                      <p className="text-xs text-slate-400">
                        Try adjusting your search terms or clearing your filters
                      </p>
                      <button
                        onClick={handleClearAllFilters}
                        className="mt-2 text-xs font-semibold text-teal-600 hover:underline cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => {
                  const isSelected = selectedRowIds.includes(user.id)
                  const isMenuOpen = activeMenuId === user.id

                  return (
                    <tr
                      key={user.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isSelected ? 'bg-teal-50/20' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(user.id, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                        />
                      </td>

                      {/* ID */}
                      <td className="py-3.5 px-4 font-medium text-slate-600">
                        {user.id}
                      </td>

                      {/* Student / Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="h-8 w-8 rounded-full object-cover border border-gray-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <button
                              onClick={() => setSelectedUserForDrawer(user)}
                              className="font-semibold text-slate-800 hover:text-teal-700 transition-colors text-left block truncate cursor-pointer"
                            >
                              {user.salutation ? `${user.salutation} ` : ''}
                              {user.name}
                            </button>
                            <span
                              className="text-[11px] text-slate-400 block truncate"
                              title={user.email}
                            >
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4 text-slate-600 font-normal whitespace-nowrap">
                        {user.contact}
                      </td>

                      {/* Program · Cohort */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <p
                            className="text-xs text-slate-700 font-medium truncate max-w-[220px]"
                            title={user.program}
                          >
                            {user.programShort}
                          </p>
                          <span className="text-[11px] text-slate-400 font-normal block">
                            {user.cohort}
                          </span>
                        </div>
                      </td>

                      {/* Consent · Biometric */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${
                              user.consent === 'Consented'
                                ? 'bg-teal-50 text-teal-700 border border-teal-200/60'
                                : user.consent === 'Declined'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-[#e9ecef] text-slate-600 font-normal'
                            }`}
                          >
                            {user.consent}
                          </span>
                          <span className="text-[11px] text-slate-400 block">
                            Biometric: {user.biometric}
                          </span>
                        </div>
                      </td>

                      {/* Program · Cohort Status */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                            {user.programCohortStatus}
                          </span>
                          <span className="text-[11px] text-emerald-600 font-medium block">
                            Cohort: {user.programCohortStatus}
                          </span>
                        </div>
                      </td>

                      {/* User Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            user.userStatus === 'Active'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : 'bg-rose-50 text-rose-600 border border-rose-100'
                          }`}
                        >
                          {user.userStatus}
                        </span>
                      </td>

                      {/* Actions (Three dots ⋮) */}
                      <td className="py-3.5 px-4 text-center relative row-action-menu-container">
                        <button
                          onClick={() =>
                            setActiveMenuId(isMenuOpen ? null : user.id)
                          }
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                          <div className="absolute right-4 top-10 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1.5 animate-in fade-in zoom-in-95 text-left divide-y divide-gray-100">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  setSelectedUserForDrawer(user)
                                  setActiveMenuId(null)
                                }}
                                className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                              >
                                <Eye className="h-3.5 w-3.5 text-slate-400" />
                                <span>View Full Profile</span>
                              </button>

                              <button
                                onClick={() => {
                                  onActionNotify(`Impersonating ${user.name}...`)
                                  setActiveMenuId(null)
                                }}
                                className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                              >
                                <UserCheck className="h-3.5 w-3.5 text-teal-600" />
                                <span>Impersonate User</span>
                              </button>

                              <button
                                onClick={() => {
                                  onActionNotify(`Password reset link sent to ${user.email}`)
                                  setActiveMenuId(null)
                                }}
                                className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                              >
                                <KeyRound className="h-3.5 w-3.5 text-slate-400" />
                                <span>Reset Password</span>
                              </button>
                            </div>

                            <div className="py-1">
                              <button
                                onClick={() => handleToggleStatus(user)}
                                className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                              >
                                <RotateCw className="h-3.5 w-3.5 text-slate-400" />
                                <span>
                                  Mark as {user.userStatus === 'Active' ? 'Inactive' : 'Active'}
                                </span>
                              </button>

                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 cursor-pointer font-medium"
                              >
                                <UserX className="h-3.5 w-3.5 text-rose-500" />
                                <span>Remove Record</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 6. Pagination Footer matching screenshot */}
        <div className="p-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-end gap-6 text-xs text-slate-600 select-none">
          {/* Rows per page dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">
              {activeUserTab}s per page
            </span>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="appearance-none bg-white border border-gray-200 rounded-md px-2.5 py-1 pr-6 text-xs text-slate-700 font-semibold focus:outline-none focus:border-teal-600 cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Current Range Label */}
          <div className="font-medium text-slate-700">
            {totalItems > 0 ? (safeCurrentPage - 1) * rowsPerPage + 1 : 0}-
            {Math.min(safeCurrentPage * rowsPerPage, totalItems)} of {totalItems > 0 ? '313' : '0'}
          </div>

          {/* Page navigation controls |< < > >| */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={safeCurrentPage <= 1}
              title="First Page"
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={safeCurrentPage <= 1}
              title="Previous Page"
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={safeCurrentPage >= totalPages}
              title="Next Page"
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={safeCurrentPage >= totalPages}
              title="Last Page"
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 7. Slide-over User Profile Drawer */}
      {selectedUserForDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setSelectedUserForDrawer(null)}
            className="fixed inset-0 bg-black/45 backdrop-blur-[0.5px] transition-opacity"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
              {/* Drawer Header */}
              <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-teal-600" />
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">
                    {selectedUserForDrawer.role} Profile & Access
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedUserForDrawer(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Profile Card */}
                <div className="flex items-center gap-4 bg-slate-50 border border-gray-200/80 p-4 rounded-xl">
                  <img
                    src={selectedUserForDrawer.avatarUrl}
                    alt={selectedUserForDrawer.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {selectedUserForDrawer.salutation ? `${selectedUserForDrawer.salutation} ` : ''}
                      {selectedUserForDrawer.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      MU-ID: #{selectedUserForDrawer.id}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {selectedUserForDrawer.userStatus}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                        {selectedUserForDrawer.cohort}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Contact & Identifiers
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Mail className="h-3.5 w-3.5" />
                        <span>Email</span>
                      </div>
                      <span className="font-medium text-slate-800 font-mono text-[11px]">
                        {selectedUserForDrawer.email}
                      </span>
                    </div>

                    <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Phone className="h-3.5 w-3.5" />
                        <span>Phone</span>
                      </div>
                      <span className="font-medium text-slate-800">
                        {selectedUserForDrawer.contact}
                      </span>
                    </div>

                    <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Building className="h-3.5 w-3.5" />
                        <span>Program</span>
                      </div>
                      <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">
                        {selectedUserForDrawer.program}
                      </span>
                    </div>

                    <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Enrollment Date</span>
                      </div>
                      <span className="font-medium text-slate-800">
                        {selectedUserForDrawer.enrollmentDate || '15-06-2024'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Biometric & Compliance */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Campus Biometrics & Access
                  </h4>
                  <div className="p-4 bg-teal-50/50 border border-teal-200/70 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-teal-900">Biometric Consent:</span>
                      <span className="font-bold text-teal-800">{selectedUserForDrawer.consent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-teal-900">Physical Turnstile Access:</span>
                      <span className="font-bold text-teal-800">
                        {selectedUserForDrawer.biometric === 'Yes' ? 'Enabled' : 'Restricted'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-teal-900">Academic Attendance:</span>
                      <span className="font-bold text-teal-800">
                        {selectedUserForDrawer.attendancePct || 94}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Governance Actions */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Super Admin Actions
                  </h4>
                  <button
                    onClick={() => {
                      onActionNotify(`Impersonating ${selectedUserForDrawer.name}`)
                      setSelectedUserForDrawer(null)
                    }}
                    className="w-full py-2.5 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <UserCheck className="h-4 w-4" />
                    <span>Impersonate Session</span>
                  </button>

                  <button
                    onClick={() => {
                      onActionNotify(`Temporary access code sent to ${selectedUserForDrawer.contact}`)
                    }}
                    className="w-full py-2 px-3 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                  >
                    <KeyRound className="h-4 w-4 text-slate-500" />
                    <span>Generate One-Time Passcode</span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-200 bg-slate-50 flex items-center justify-between">
                <button
                  onClick={() => handleToggleStatus(selectedUserForDrawer)}
                  className="py-2 px-3 rounded-lg border border-gray-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Toggle Status
                </button>
                <button
                  onClick={() => setSelectedUserForDrawer(null)}
                  className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Create Student Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsCreateModalOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-[0.5px]"
          />
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-lg w-full z-10 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Create New {activeUserTab}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add a single account to Masters' Union LMS portal
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Title
                  </label>
                  <select
                    value={formData.salutation}
                    onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-2.5 py-2 text-xs text-slate-800"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mansa"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bihani"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name2027@mastersunion.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+919398649093"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-600 focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Program
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-2.5 py-2 text-xs text-slate-800"
                  >
                    <option value="PGP in Technology and Business Management">
                      PGP in Technology and Business Management
                    </option>
                    <option value="PGP Rise (Working Professionals)">PGP Rise</option>
                    <option value="UG Programme in Technology & Business">
                      UG Programme in Technology & Business
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Cohort
                  </label>
                  <select
                    value={formData.cohort}
                    onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-2.5 py-2 text-xs text-slate-800"
                  >
                    <option value="PGPTBM-C7">PGPTBM-C7</option>
                    <option value="PGPTBM-C6">PGPTBM-C6</option>
                    <option value="Rise-C2">Rise-C2</option>
                    <option value="UGTBM-C3">UGTBM-C3</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-slate-50">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">
                    Campus Biometric & Proctoring Consent
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Enable biometric gate scan authentication
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.biometricConsent}
                  onChange={(e) =>
                    setFormData({ ...formData, biometricConsent: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Create {activeUserTab}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. Upload / Download CSV Modal */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsCsvModalOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-[0.5px]"
          />
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-md w-full z-10 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Bulk CSV Import & Export
                </h3>
              </div>
              <button
                onClick={() => setIsCsvModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Drag and drop zone */}
              <div className="border-2 border-dashed border-gray-200 hover:border-teal-500 rounded-2xl p-6 text-center bg-slate-50/60 hover:bg-teal-50/30 transition-all cursor-pointer">
                <Upload className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-800">
                  Drag and drop your CSV file here
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supports .csv or .xlsx up to 10MB
                </p>
                <button
                  type="button"
                  onClick={() => onActionNotify('Select file dialog opened')}
                  className="mt-3 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs"
                >
                  Browse Files
                </button>
              </div>

              {/* Sample Template */}
              <div className="p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Sample CSV Template
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Pre-formatted columns with validation schema
                  </p>
                </div>
                <button
                  onClick={() => onActionNotify('Downloaded MU_Student_Import_Template.csv')}
                  className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setIsCsvModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsCsvModalOpen(false)
                    onActionNotify('Import queued: 24 new student records successfully added!')
                  }}
                  className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Process Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. Status Info Modal */}
      {isStatusInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsStatusInfoModalOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-[0.5px]"
          />
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-lg w-full z-10 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Student Lifecycle & Status Definitions
                </h3>
              </div>
              <button
                onClick={() => setIsStatusInfoModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/50 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                  <span className="font-bold text-slate-800">Operational & Good Standing</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Student has full LMS privileges, active cohort enrollment, attendance tracking, and credential verification.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-200 bg-slate-50 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 text-slate-700">
                    Not Applicable / Biometric
                  </span>
                  <span className="font-bold text-slate-800">Remote or Pending Registration</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Assigned when biometric turnstile authorization has not been requested or the student is purely enrolled in hybrid/online terms.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/50 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                    Inactive / Suspended
                  </span>
                  <span className="font-bold text-slate-800">Access Restricted</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Account login privileges are temporarily paused due to administrative review, leave of absence, or academic probation.
                </p>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setIsStatusInfoModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. Floating Widgets in bottom right corner (from screenshot) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {/* Chat notification bubble with badge '1' */}
        <div className="relative">
          <button
            onClick={() => setIsChatWidgetOpen(!isChatWidgetOpen)}
            className="w-12 h-12 rounded-full bg-white border border-gray-200 text-emerald-600 shadow-xl hover:shadow-2xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
            title="Masters' Union Live Support"
          >
            <MessageCircle className="h-6 w-6 text-emerald-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              1
            </span>
          </button>
        </div>

        {/* Support globe icon button */}
        <button
          onClick={() => setIsSupportModalOpen(true)}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 text-teal-700 shadow-lg hover:shadow-xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          title="Campus Portal Status"
        >
          <Globe className="h-5 w-5 text-teal-700" />
        </button>
      </div>

      {/* Floating Chat Mini-Window */}
      {isChatWidgetOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-3 duration-150">
          <div className="bg-[#0d9488] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse" />
              <div>
                <h4 className="text-xs font-bold leading-tight">Masters' Union Helpdesk</h4>
                <p className="text-[10px] text-teal-100">Super Admin Assistance Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatWidgetOpen(false)}
              className="text-teal-100 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 space-y-3 text-xs bg-slate-50 min-h-[160px]">
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-slate-700 leading-relaxed shadow-2xs">
              👋 Hi Akash! Need help managing student permissions, biometric scans, or bulk CSV imports?
            </div>
          </div>
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 text-xs bg-slate-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-teal-600"
            />
            <button
              onClick={() => {
                onActionNotify('Support request dispatched to campus engineering')
                setIsChatWidgetOpen(false)
              }}
              className="px-2.5 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Support Portal Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsSupportModalOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-[0.5px]"
          />
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-sm w-full z-10 p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900">Campus Cloud Network</h3>
              </div>
              <button
                onClick={() => setIsSupportModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between font-medium">
                <span>Identity & Access Gateway</span>
                <span className="font-bold">Operational (99.98%)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between font-medium">
                <span>Biometric Turnstiles Node</span>
                <span className="font-bold">Online</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between font-medium">
                <span>LMS Cohort Sync Daemon</span>
                <span className="font-bold">Syncing</span>
              </div>
            </div>
            <button
              onClick={() => setIsSupportModalOpen(false)}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
            >
              Close Status
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

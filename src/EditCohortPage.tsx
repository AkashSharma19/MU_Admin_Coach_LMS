import { useState, type FormEvent } from 'react'
import {
  Bold,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Info,
  Italic,
  Link,
  List,
  ListOrdered,
  Pencil,
  Plus,
  Search,
  Trash2,
  Underline,
  X,
} from 'lucide-react'
import type { CohortItem } from './App'

interface EditCohortPageProps {
  cohort: CohortItem
  programName: string
  onDiscard: () => void
  onSave: (cohort: CohortItem) => void
}

interface TermSectionDraft {
  id: string
  name: string
  courses: string[]
  students: string[]
}

interface TermDraft {
  id: string
  name: string
  startDate: string
  endDate: string
  industryCredit: number
  coreCredit: number
  outclassCredit: number
  minCredit: number
  maxCredit: number
  country: string
  requiredDocuments: string
  sections: TermSectionDraft[]
  capstoneSection: string
}

const EDIT_TABS = [
  'General Details',
  'Terms & Section',
  'Term Planner',
  'Display Options',
  'Placement Criteria',
  'Custom Electives',
  'Document Repository',
  'Feedback Question',
  'Review Requests',
  'Concern Config',
  'Holidays',
]

const CONFIGURED_TABS = ['General Details', 'Terms & Section', 'Display Options']

const ACADEMIC_DASHBOARD_MODULES = [
  'Courses',
  'Messages',
  'Schedule',
  'Attendance',
  'Assignments',
  'Grades',
  'Case Studies',
  'Term Planner',
  'Academic Summary',
  'Session Notes',
  'Learning Dashboard',
  'Course Learn',
  'Leaderboard',
]

const PLACEMENT_DASHBOARD_MODULES = [
  'Profile',
  'Courses',
  'Eligibility Checklist',
  'Domain Progress',
  'Career Coach',
  'Report Card',
]

const AVAILABLE_TERM_COURSES = [
  'Knowledge Sessions',
  'Leadership Lessons by CXOs',
  'Generative AI - Foundations',
  'Art of Communication',
  'Excel for Managers',
  'Digital Marketing',
  'Dropshipping Operations',
  'Business Strategy and Execution',
]

const AVAILABLE_TERM_STUDENTS = [
  'Aayush Mehta',
  'Aditi Sharma',
  'Aditya Singh Roy',
  'Akash Kumar',
  'Ananya Singh',
  'Arjun Malhotra',
  'Riya Kapoor',
  'Sakshi Shah',
  'Vivek Nair',
  'Zoya Khan',
]

const MANAGERS = [
  'Mrs. Ashita Birla',
  'Dr. Gopika Kumar',
  'Miss. Riti Marwah',
  'Mr. Siddharth Jangir',
  'Ms. Sonali Awasthi',
  'Mr. Radhika Goyal',
]

const CONTRIBUTORS = [
  'Mr. Tarun Gupta',
  'Dr. Bhupesh Manoharan',
  'Mrs. Arjoo Mahajan',
  'Mr. Akash Sharma',
  'Ms. Khushi Roy',
  'Mr. Anand Sinha',
  'Miss. Sakshi Shah',
  'Dr. Garima Chaldaker',
]

const description =
  "This cohort offers a fast-paced, globally inspired management education. Combining rigorous academics with real-world exposure, the curriculum is driven by practical questions co-taught by CXOs, public leaders, and industry experts."

function toInputDate(date: string) {
  const [day, month, year] = date.split('/')
  return year && month && day ? `${year}-${month}-${day}` : date
}

function toDisplayDate(date: string) {
  const [year, month, day] = date.split('-')
  return year && month && day ? `${day}/${month}/${year}` : date
}

function createTermDrafts(
  cohort: CohortItem,
  requestedTermCount = cohort.terms,
  requestedSectionCount = Math.max(cohort.section, 1),
): TermDraft[] {
  const start = new Date(toInputDate(cohort.startDate))
  const end = new Date(toInputDate(cohort.endDate))
  const termCount = Math.max(requestedTermCount, 1)
  const duration = Math.max(end.getTime() - start.getTime(), termCount * 86400000)

  return Array.from({ length: termCount }, (_, index) => {
    const termStart = new Date(start.getTime() + (duration * index) / termCount)
    const termEnd = new Date(start.getTime() + (duration * (index + 1)) / termCount)
    return {
      id: `term-${index + 1}`,
      name: `Term ${index + 1}`,
      startDate: termStart.toISOString().slice(0, 10),
      endDate: termEnd.toISOString().slice(0, 10),
      industryCredit: 10,
      coreCredit: 3,
      outclassCredit: 0,
      minCredit: 13,
      maxCredit: 13,
      country: 'India',
      requiredDocuments: '',
      sections: Array.from({ length: Math.max(requestedSectionCount, 1) }, (_, sectionIndex) => ({
        id: `term-${index + 1}-section-${sectionIndex + 1}`,
        name: `Section ${sectionIndex + 1}`,
        courses: index === 0 && sectionIndex === 0 ? AVAILABLE_TERM_COURSES.slice(0, 2) : [],
        students: index === 0 && sectionIndex === 0 ? AVAILABLE_TERM_STUDENTS.slice(0, 3) : [],
      })),
      capstoneSection: '',
    }
  })
}

function FieldLabel({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-[11px] font-semibold text-slate-700">
      {children}
      {required && <span className="ml-0.5 text-rose-500">*</span>}
    </label>
  )
}

function Toggle({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="flex items-center gap-2.5 text-left"
    >
      <span className={`relative h-[18px] w-8 rounded-full p-0.5 transition-colors ${checked ? 'bg-teal-600' : 'bg-slate-300'}`}>
        <span className={`block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-3.5' : ''}`} />
      </span>
      <span className="text-xs font-medium text-slate-700">{label}</span>
      <Info className="h-3 w-3 text-slate-400" />
    </button>
  )
}

export default function EditCohortPage({ cohort, programName, onDiscard, onSave }: EditCohortPageProps) {
  const [activeTab, setActiveTab] = useState('General Details')
  const [name, setName] = useState(cohort.name)
  const [cohortSize] = useState(cohort.cohortSize ?? 0)
  const [startDate, setStartDate] = useState(toInputDate(cohort.startDate))
  const [endDate, setEndDate] = useState(toInputDate(cohort.endDate))
  const [modality, setModality] = useState<CohortItem['modality']>(cohort.modality)
  const [status] = useState<CohortItem['status']>(cohort.status)
  const [industryCredits, setIndustryCredits] = useState(33)
  const [coreCredits, setCoreCredits] = useState(27)
  const [courseTypeCredits, setCourseTypeCredits] = useState(120)
  const [emergencyNumber, setEmergencyNumber] = useState('')
  const [askFeedback, setAskFeedback] = useState(false)
  const [profileMandatory, setProfileMandatory] = useState(false)
  const [attendanceCalculation, setAttendanceCalculation] = useState(false)
  const [zoomPresentMinimum, setZoomPresentMinimum] = useState(50)
  const [zoomAccount, setZoomAccount] = useState('zoom.edu@mastersunion.org')
  const [displayOption, setDisplayOption] = useState<'leaderboard' | 'custom'>('leaderboard')
  const [showAcademics, setShowAcademics] = useState(true)
  const [showPlacement, setShowPlacement] = useState(true)
  const [showMentorship, setShowMentorship] = useState(false)
  const [showMentorUnion, setShowMentorUnion] = useState(true)
  const [showReachOut, setShowReachOut] = useState(true)
  const [showApps, setShowApps] = useState(false)
  const [editingDashboardArea, setEditingDashboardArea] = useState<'academics' | 'placement' | null>(null)
  const [academicModules, setAcademicModules] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ACADEMIC_DASHBOARD_MODULES.map(module => [module, !['Session Notes', 'Course Learn'].includes(module)]))
  )
  const [placementModules, setPlacementModules] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PLACEMENT_DASHBOARD_MODULES.map(module => [module, true]))
  )
  const [customCardTitle, setCustomCardTitle] = useState('')
  const [customCardImage, setCustomCardImage] = useState('')
  const [customCardSource, setCustomCardSource] = useState('')
  const [showLeaderboardPreview, setShowLeaderboardPreview] = useState(true)
  const [showDeansList, setShowDeansList] = useState(true)
  const [showCgpa, setShowCgpa] = useState(false)
  const [showPrs, setShowPrs] = useState(false)
  const [showAttendanceCard, setShowAttendanceCard] = useState(true)
  const [terms, setTerms] = useState(cohort.terms)
  const [sections, setSections] = useState(cohort.section)
  const [setupTermCount, setSetupTermCount] = useState(cohort.terms)
  const [setupSectionCount, setSetupSectionCount] = useState(Math.max(cohort.section, 1))
  const [isTermStructureConfigured, setIsTermStructureConfigured] = useState(false)
  const [termDrafts, setTermDrafts] = useState<TermDraft[]>(() => createTermDrafts(cohort))
  const [selectedTermId, setSelectedTermId] = useState('term-1')
  const [selectedSectionId, setSelectedSectionId] = useState('term-1-section-1')
  const [activeTermAccordion, setActiveTermAccordion] = useState<'details' | 'sections' | null>('details')
  const [savedTermId, setSavedTermId] = useState<string | null>(null)
  const [managementDialog, setManagementDialog] = useState<'courses' | 'students' | null>(null)
  const [managementSearch, setManagementSearch] = useState('')
  const [pendingSelections, setPendingSelections] = useState<string[]>([])
  const [timezone, setTimezone] = useState('Asia/Kolkata')
  const [cohortDescription, setCohortDescription] = useState(description)
  const [managers, setManagers] = useState([cohort.spoc || 'Mrs. Arjoo Mahajan', ...MANAGERS.slice(0, 3)])
  const [contributors, setContributors] = useState(CONTRIBUTORS.slice(0, 6))

  const inputClass = 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs outline-none transition focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
  const selectClass = `${inputClass} appearance-none pr-9 cursor-pointer`

  const removeTag = (value: string, type: 'manager' | 'contributor') => {
    if (type === 'manager') setManagers(current => current.filter(item => item !== value))
    else setContributors(current => current.filter(item => item !== value))
  }

  const selectedTerm = termDrafts.find(term => term.id === selectedTermId) || termDrafts[0]
  const selectedSection = selectedTerm.sections.find(section => section.id === selectedSectionId) || selectedTerm.sections[0]
  const availableManagementItems = managementDialog === 'courses'
    ? AVAILABLE_TERM_COURSES.filter(item => !selectedSection.courses.includes(item))
    : managementDialog === 'students'
      ? AVAILABLE_TERM_STUDENTS.filter(item => !selectedSection.students.includes(item))
      : []
  const filteredManagementItems = availableManagementItems.filter(item =>
    item.toLowerCase().includes(managementSearch.trim().toLowerCase())
  )
  const updateSelectedTerm = (updates: Partial<TermDraft>) => {
    setTermDrafts(current => current.map(term => term.id === selectedTerm.id ? { ...term, ...updates } : term))
    setSavedTermId(null)
  }
  const updateSelectedSection = (updates: Partial<TermSectionDraft>) => {
    setTermDrafts(current => current.map(term => term.id === selectedTerm.id
      ? { ...term, sections: term.sections.map(section => section.id === selectedSection.id ? { ...section, ...updates } : section) }
      : term
    ))
    setSavedTermId(null)
  }

  const createTermStructure = () => {
    const termCount = Math.min(Math.max(setupTermCount, 1), 20)
    const sectionCount = Math.min(Math.max(setupSectionCount, 1), 20)
    const generatedTerms = createTermDrafts(cohort, termCount, sectionCount)
    setTermDrafts(generatedTerms)
    setTerms(termCount)
    setSections(sectionCount)
    setSelectedTermId(generatedTerms[0].id)
    setSelectedSectionId(generatedTerms[0].sections[0].id)
    setActiveTermAccordion('details')
    setSavedTermId(null)
    setIsTermStructureConfigured(true)
  }

  const addTerm = () => {
    const nextNumber = termDrafts.length + 1
    const previousEnd = new Date(termDrafts[termDrafts.length - 1]?.endDate || toInputDate(cohort.endDate))
    const nextEnd = new Date(previousEnd)
    nextEnd.setMonth(nextEnd.getMonth() + 3)
    const termId = `term-${Date.now()}`
    const template = createTermDrafts(cohort, 1, Math.max(sections, 1))[0]
    const newTerm: TermDraft = {
      ...template,
      id: termId,
      name: `Term ${nextNumber}`,
      startDate: previousEnd.toISOString().slice(0, 10),
      endDate: nextEnd.toISOString().slice(0, 10),
      sections: template.sections.map((section, index) => ({
        ...section,
        id: `${termId}-section-${index + 1}`,
        courses: [],
        students: [],
      })),
    }
    setTermDrafts(current => [...current, newTerm])
    setTerms(current => current + 1)
    setSelectedTermId(newTerm.id)
    setSelectedSectionId(newTerm.sections[0].id)
    setActiveTermAccordion('details')
  }

  const deleteTerm = (termId: string) => {
    if (termDrafts.length <= 1) return
    const remainingTerms = termDrafts.filter(term => term.id !== termId)
    setTermDrafts(remainingTerms)
    setTerms(remainingTerms.length)
    if (selectedTermId === termId) {
      setSelectedTermId(remainingTerms[0].id)
      setSelectedSectionId(remainingTerms[0].sections[0].id)
    }
  }

  const addSection = () => {
    const nextNumber = selectedTerm.sections.length + 1
    const newSection: TermSectionDraft = {
      id: `${selectedTerm.id}-section-${Date.now()}`,
      name: `Section ${nextNumber}`,
      courses: [],
      students: [],
    }
    updateSelectedTerm({ sections: [...selectedTerm.sections, newSection] })
    setSections(current => Math.max(current, selectedTerm.sections.length + 1))
    setSelectedSectionId(newSection.id)
    setActiveTermAccordion('sections')
  }

  const deleteSection = (sectionId: string) => {
    if (selectedTerm.sections.length <= 1) return
    const remainingSections = selectedTerm.sections.filter(section => section.id !== sectionId)
    updateSelectedTerm({ sections: remainingSections })
    if (selectedSectionId === sectionId) setSelectedSectionId(remainingSections[0].id)
  }

  const openManagementDialog = (type: 'courses' | 'students') => {
    setManagementDialog(type)
    setActiveTermAccordion('sections')
    setManagementSearch('')
    setPendingSelections([])
  }

  const togglePendingSelection = (value: string) => {
    setPendingSelections(current => current.includes(value) ? current.filter(item => item !== value) : [...current, value])
  }

  const addSelectedItems = () => {
    if (managementDialog === 'courses') {
      updateSelectedSection({ courses: Array.from(new Set([...selectedSection.courses, ...pendingSelections])) })
    } else if (managementDialog === 'students') {
      updateSelectedSection({ students: Array.from(new Set([...selectedSection.students, ...pendingSelections])) })
    }
    setManagementDialog(null)
    setPendingSelections([])
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSave({
      ...cohort,
      name: name.trim(),
      badge: name.trim().split(/\s+/).map(word => word[0]).join('').slice(0, 2).toUpperCase() || cohort.badge,
      cohortSize,
      spoc: managers[0] || cohort.spoc,
      terms,
      section: sections,
      modality,
      startDate: toDisplayDate(startDate),
      endDate: toDisplayDate(endDate),
      status,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="h-6 w-1.5 rounded-full bg-teal-600" />
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
          <button type="button" onClick={onDiscard} className="cursor-pointer transition-colors hover:text-teal-700">Program Management</button>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="max-w-sm truncate">{programName}</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <button type="button" onClick={onDiscard} className="cursor-pointer transition-colors hover:text-teal-700">{cohort.name}</button>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-teal-700">Edit Cohort</span>
        </div>
      </div>

      {/* Entity header follows the same pattern as Program and Cohort detail pages */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Edit Cohort</h1>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={onDiscard} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50">
            <X className="h-3.5 w-3.5 text-slate-500" /> Discard
          </button>
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-700">
            <Check className="h-3.5 w-3.5" /> Save Changes
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="overflow-x-auto px-0">
          <div className="flex min-w-max items-center gap-6">
            {EDIT_TABS.map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative py-3.5 text-[11px] font-semibold transition-colors ${activeTab === tab ? 'text-teal-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab}
                {activeTab === tab && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-teal-600" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={activeTab === 'Terms & Section' ? '' : 'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs'}>
        <div className={activeTab === 'Terms & Section' ? '' : 'space-y-6 p-5 sm:p-6'}>
          {!CONFIGURED_TABS.includes(activeTab) && (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-slate-50/50 px-6 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Check className="h-4 w-4" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-800">{activeTab}</p>
              <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-500">
                This section has no cohort-specific configuration yet. You can continue editing another tab and save all changes together.
              </p>
            </div>
          )}

          <section className={activeTab === 'General Details' ? '' : 'hidden'}>
            <div className="mb-4">
              <h2 className="text-sm font-bold text-slate-900">Basic information</h2>
              <p className="mt-1 text-[11px] text-slate-500">Cohort identity, delivery mode, and active date range.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="sm:col-span-2"><FieldLabel required>Cohort Name</FieldLabel><input required value={name} onChange={e => setName(e.target.value)} className={inputClass} /></div>
              <div><FieldLabel>Grading Type</FieldLabel><div className="relative"><select className={selectClass} defaultValue="Default"><option>Default</option><option>Relative</option><option>Absolute</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /></div></div>
              <div><FieldLabel>Modality</FieldLabel><div className="relative"><select value={modality} onChange={e => setModality(e.target.value as CohortItem['modality'])} className={selectClass}><option>Offline</option><option>Online</option><option>Hybrid</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /></div></div>
              <div className="sm:col-span-1 xl:col-span-2"><FieldLabel required>Start Date</FieldLabel><div className="relative"><input required type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputClass} /><Calendar className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /></div></div>
              <div className="sm:col-span-1 xl:col-span-2"><FieldLabel required>End Date</FieldLabel><div className="relative"><input required type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className={inputClass} /><Calendar className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /></div></div>
            </div>
          </section>

          <section className={activeTab === 'General Details' ? 'border-t border-gray-100 pt-6' : 'hidden'}>
            <div className="mb-4">
              <h2 className="text-sm font-bold text-slate-900">Credits and support</h2>
              <p className="mt-1 text-[11px] text-slate-500">Credit allocation and cohort-level student settings.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div><FieldLabel required>Industry Credit</FieldLabel><input type="number" min={0} value={industryCredits} onChange={e => setIndustryCredits(Number(e.target.value))} className={inputClass} /></div>
              <div><FieldLabel required>Core Credit</FieldLabel><input type="number" min={0} value={coreCredits} onChange={e => setCoreCredits(Number(e.target.value))} className={inputClass} /></div>
              <div><FieldLabel required>Course Type Credit</FieldLabel><input type="number" min={0} value={courseTypeCredits} onChange={e => setCourseTypeCredits(Number(e.target.value))} className={inputClass} /></div>
              <div><FieldLabel>Concern Emergency Number</FieldLabel><input value={emergencyNumber} onChange={e => setEmergencyNumber(e.target.value)} placeholder="Enter contact number" className={inputClass} /></div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-gray-100 bg-slate-50/60 p-3.5 sm:grid-cols-2 xl:grid-cols-3">
              <Toggle checked={askFeedback} onChange={() => setAskFeedback(value => !value)} label="Ask Feedback" />
              <Toggle checked={profileMandatory} onChange={() => setProfileMandatory(value => !value)} label="Profile Completion Required" />
              <Toggle checked={attendanceCalculation} onChange={() => setAttendanceCalculation(value => !value)} label="Attendance Calculation" />
            </div>
          </section>

          <section className={activeTab === 'General Details' ? 'border-t border-gray-100 pt-6' : 'hidden'}>
            <h2 className="mb-1 text-sm font-bold text-slate-900">Cohort ownership</h2>
            <p className="mb-4 text-[11px] text-slate-500">Assign the managers and contributors responsible for this cohort.</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>Select Cohort Managers</FieldLabel>
                <div className="min-h-24 rounded-lg border border-gray-200 bg-slate-50/40 p-3">
                  <div className="flex flex-wrap gap-2">{managers.map(manager => <span key={manager} className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700">{manager}<button type="button" onClick={() => removeTag(manager, 'manager')} aria-label={`Remove ${manager}`}><X className="h-3 w-3 text-slate-400 hover:text-rose-500" /></button></span>)}</div>
                </div>
              </div>
              <div>
                <FieldLabel>Select Contributors</FieldLabel>
                <div className="min-h-24 rounded-lg border border-gray-200 bg-slate-50/40 p-3">
                  <div className="flex flex-wrap gap-2">{contributors.map(contributor => <span key={contributor} className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700">{contributor}<button type="button" onClick={() => removeTag(contributor, 'contributor')} aria-label={`Remove ${contributor}`}><X className="h-3 w-3 text-slate-400 hover:text-rose-500" /></button></span>)}</div>
                </div>
              </div>
            </div>
          </section>

          <section className={activeTab === 'General Details' ? 'border-t border-gray-100 pt-6' : 'hidden'}>
            <h2 className="mb-1 text-sm font-bold text-slate-900">Zoom attendance rules</h2>
            <p className="mb-4 text-[11px] text-slate-500">Set the attendance threshold and account used for live online sessions.</p>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div>
                <FieldLabel>Minimum attendance % for Zoom Present</FieldLabel>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={zoomPresentMinimum}
                  onChange={e => setZoomPresentMinimum(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
              <div className="lg:col-span-2">
                <FieldLabel>Zoom User Account</FieldLabel>
                <div className="relative">
                  <select value={zoomAccount} onChange={e => setZoomAccount(e.target.value)} className={selectClass}>
                    <option>zoom.edu@mastersunion.org</option>
                    <option>academic.ops@mastersunion.org</option>
                    <option>classroom@mastersunion.org</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
          </section>

          <section className={activeTab === 'Display Options' ? '' : 'hidden'}>
            <h2 className="mb-1 text-sm font-bold text-slate-900">Dashboard display</h2>
            <p className="mb-4 text-[11px] text-slate-500">Choose which areas and modules students can access on their cohort dashboard.</p>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-slate-50/30">
              <div className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Toggle checked={showAcademics} onChange={() => setShowAcademics(value => !value)} label="Show Academics on Student Side" />
                  <button
                    type="button"
                    onClick={() => setEditingDashboardArea(current => current === 'academics' ? null : 'academics')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-xs transition-colors hover:bg-teal-50"
                  >
                    {editingDashboardArea === 'academics' ? <Check className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
                    {editingDashboardArea === 'academics' ? 'Done' : 'Edit'}
                  </button>
                </div>

                {showAcademics && (
                  <div className="mt-3 rounded-lg border border-gray-200 bg-white p-3.5">
                    <div className="flex flex-wrap gap-x-5 gap-y-3">
                      {ACADEMIC_DASHBOARD_MODULES.map(module => (
                        <label key={module} className={`flex items-center gap-2 text-xs font-medium ${editingDashboardArea === 'academics' ? 'cursor-pointer text-slate-700' : 'cursor-default text-slate-500'}`}>
                          <input
                            type="checkbox"
                            checked={academicModules[module]}
                            disabled={editingDashboardArea !== 'academics'}
                            onChange={() => {
                              setAcademicModules(current => ({ ...current, [module]: !current[module] }))
                              if (module === 'Leaderboard' && academicModules.Leaderboard) setDisplayOption('custom')
                            }}
                            className="h-4 w-4 rounded border-gray-300 accent-teal-600 disabled:opacity-70"
                          />
                          <span>{module}</span>
                          {module === 'Leaderboard' && (
                            <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${academicModules.Leaderboard ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-400'}`}>
                              {academicModules.Leaderboard ? 'Visible' : 'Hidden'}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Toggle checked={showPlacement} onChange={() => setShowPlacement(value => !value)} label="Show Placement on Student Side" />
                  <button
                    type="button"
                    onClick={() => setEditingDashboardArea(current => current === 'placement' ? null : 'placement')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-xs transition-colors hover:bg-teal-50"
                  >
                    {editingDashboardArea === 'placement' ? <Check className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
                    {editingDashboardArea === 'placement' ? 'Done' : 'Edit'}
                  </button>
                </div>

                {showPlacement && (
                  <div className="mt-3 rounded-lg border border-gray-200 bg-white p-3.5">
                    <div className="flex flex-wrap gap-x-5 gap-y-3">
                      {PLACEMENT_DASHBOARD_MODULES.map(module => (
                        <label key={module} className={`flex items-center gap-2 text-xs font-medium ${editingDashboardArea === 'placement' ? 'cursor-pointer text-slate-700' : 'cursor-default text-slate-500'}`}>
                          <input
                            type="checkbox"
                            checked={placementModules[module]}
                            disabled={editingDashboardArea !== 'placement'}
                            onChange={() => setPlacementModules(current => ({ ...current, [module]: !current[module] }))}
                            className="h-4 w-4 rounded border-gray-300 accent-teal-600 disabled:opacity-70"
                          />
                          <span>{module}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                <div className="p-4"><Toggle checked={showMentorship} onChange={() => setShowMentorship(value => !value)} label="Show Mentorship" /></div>
                <div className="p-4"><Toggle checked={showMentorUnion} onChange={() => setShowMentorUnion(value => !value)} label="Show MentorUnion" /></div>
                <div className="p-4"><Toggle checked={showReachOut} onChange={() => setShowReachOut(value => !value)} label="Show Reach Out" /></div>
                <div className="p-4"><Toggle checked={showApps} onChange={() => setShowApps(value => !value)} label="Show Apps" /></div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="mb-1.5 flex items-center justify-between">
                <FieldLabel>Dashboard Card</FieldLabel>
                {displayOption === 'leaderboard' && (
                  <button
                    type="button"
                    onClick={() => setShowLeaderboardPreview(value => !value)}
                    className="text-[11px] font-semibold text-teal-700 hover:underline"
                  >
                    {showLeaderboardPreview ? 'Hide preview' : 'Show preview'}
                  </button>
                )}
              </div>
              <div className="grid max-w-xl grid-cols-2 overflow-hidden rounded-lg border border-teal-500 bg-white text-xs font-semibold">
                <button
                  type="button"
                  disabled={!academicModules.Leaderboard}
                  onClick={() => setDisplayOption('leaderboard')}
                  className={`px-4 py-2 transition-colors ${!academicModules.Leaderboard ? 'cursor-not-allowed bg-slate-50 text-slate-300' : displayOption === 'leaderboard' ? 'bg-teal-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                  title={!academicModules.Leaderboard ? 'Enable Leaderboard in Academics to configure it' : undefined}
                >
                  Show Leaderboard
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayOption('custom')}
                  className={`px-4 py-2 transition-colors ${displayOption === 'custom' ? 'bg-teal-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Add Other Card
                </button>
              </div>
            </div>

            {displayOption === 'custom' ? (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <FieldLabel>Add Card Title</FieldLabel>
                  <input value={customCardTitle} onChange={e => setCustomCardTitle(e.target.value)} placeholder="Enter card title" className={inputClass} />
                </div>
                <div>
                  <FieldLabel>Upload Card Image</FieldLabel>
                  <label className={`${inputClass} flex cursor-pointer items-center justify-between text-slate-400`}>
                    <span className="truncate">{customCardImage || 'Choose file'}</span>
                    <span className="font-semibold text-teal-700">Browse</span>
                    <input type="file" accept="image/*" className="sr-only" onChange={e => setCustomCardImage(e.target.files?.[0]?.name || '')} />
                  </label>
                </div>
                <div>
                  <FieldLabel>Add Source Link</FieldLabel>
                  <input type="url" value={customCardSource} onChange={e => setCustomCardSource(e.target.value)} placeholder="https://" className={inputClass} />
                </div>
              </div>
            ) : (
              <div className={`mt-4 grid grid-cols-1 gap-4 ${showLeaderboardPreview ? 'lg:grid-cols-2' : ''}`}>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                    <span className="text-xs font-bold text-slate-800">Leaderboard configuration</span>
                    <span className="rounded-full border border-teal-200/60 bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700">Live</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="space-y-3 p-4">
                      <Toggle checked={showDeansList} onChange={() => setShowDeansList(value => !value)} label="Dean's List" />
                      {showDeansList && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <FieldLabel>How many students should be visible?</FieldLabel>
                            <div className="relative"><select defaultValue="Top 5" className={selectClass}><option>Top 3</option><option>Top 5</option><option>Top 10</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /></div>
                          </div>
                          <div className="flex items-end pb-2"><Toggle checked={showCgpa} onChange={() => setShowCgpa(value => !value)} label="Show CGPA" /></div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3 p-4">
                      <Toggle checked={showPrs} onChange={() => setShowPrs(value => !value)} label="PRS" />
                      {showPrs && (
                        <div>
                          <FieldLabel>How many students should be visible?</FieldLabel>
                          <div className="relative"><select defaultValue="Top 5" className={selectClass}><option>Top 3</option><option>Top 5</option><option>Top 10</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /></div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Toggle checked={showAttendanceCard} onChange={() => setShowAttendanceCard(value => !value)} label="Attendance" />
                    </div>
                  </div>
                </div>

                {showLeaderboardPreview && (
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-slate-950 p-4 text-white shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Leaderboard preview</span>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-slate-300">Student view</span>
                    </div>
                    <div className="mt-5 flex justify-center">
                      <div className="inline-flex rounded-full bg-white/10 p-1 text-[10px] font-semibold">
                        <span className="rounded-full bg-white px-3 py-1 text-slate-900">Dean's List</span>
                        <span className="px-3 py-1 text-slate-300">Attendance</span>
                      </div>
                    </div>
                    <div className="mt-8 flex items-end justify-center gap-5 sm:gap-8">
                      {[
                        { initials: 'GS', name: 'Gautam', rank: 2, score: showCgpa ? '3.8 CGPA' : '92%' },
                        { initials: 'AG', name: 'Arjun', rank: 1, score: showCgpa ? '3.9 CGPA' : '96%' },
                        { initials: 'RK', name: 'Riya', rank: 3, score: showCgpa ? '3.7 CGPA' : '90%' },
                      ].map(student => (
                        <div key={student.rank} className={`text-center ${student.rank === 1 ? '-translate-y-4' : ''}`}>
                          <div className={`mx-auto flex items-center justify-center rounded-full border-2 border-white/80 bg-teal-600 font-bold ${student.rank === 1 ? 'h-16 w-16 text-base' : 'h-13 w-13 text-sm'}`}>{student.initials}</div>
                          <span className={`mx-auto -mt-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-slate-950 ${student.rank === 1 ? 'bg-amber-300' : 'bg-slate-200'}`}>{student.rank}</span>
                          <p className="mt-1 text-[10px] font-semibold">{student.name}</p>
                          <span className="mt-1 inline-block rounded bg-white/10 px-2 py-0.5 text-[10px] text-amber-300">{student.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          <section className={activeTab === 'Terms & Section' ? '' : 'hidden'}>
            {!isTermStructureConfigured ? (
              <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                  <h2 className="text-base font-bold text-slate-900">Set up terms and sections</h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">Define the cohort structure first. All terms and sections will be created automatically and can be adjusted afterward.</p>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel required>Number of Terms</FieldLabel>
                      <input type="number" min={1} max={20} value={setupTermCount} onChange={e => setSetupTermCount(Number(e.target.value))} className={inputClass} />
                      <p className="mt-1.5 text-[10px] text-slate-400">Each term receives an editable date range and credit structure.</p>
                    </div>
                    <div>
                      <FieldLabel required>Number of Sections</FieldLabel>
                      <input type="number" min={1} max={20} value={setupSectionCount} onChange={e => setSetupSectionCount(Number(e.target.value))} className={inputClass} />
                      <p className="mt-1.5 text-[10px] text-slate-400">Sections are available for assignment across every term.</p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-teal-100 bg-teal-50/50 p-4">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-600">Will create</span>
                      <p className="mt-1 text-lg font-bold text-slate-900">{Math.max(setupTermCount, 0)} <span className="text-xs font-semibold text-slate-500">terms</span></p>
                    </div>
                    <div className="border-l border-teal-100 pl-4">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-600">Available in each term</span>
                      <p className="mt-1 text-lg font-bold text-slate-900">{Math.max(setupSectionCount, 0)} <span className="text-xs font-semibold text-slate-500">sections</span></p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={createTermStructure}
                      disabled={setupTermCount < 1 || setupSectionCount < 1}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      <Plus className="h-3.5 w-3.5" /> Create Structure
                    </button>
                  </div>
                </div>
              </div>
            ) : (
            <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs lg:grid-cols-[260px_minmax(0,1fr)]">
              <aside className="border-b border-gray-200 bg-slate-50/60 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-3 py-2.5">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Term structure</p>
                    <p className="text-[10px] text-slate-400">{termDrafts.length} terms · {termDrafts.reduce((total, term) => total + term.sections.length, 0)} sections</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setIsTermStructureConfigured(false)} className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-slate-700" title="Edit setup"><Pencil className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={addTerm} className="rounded-md bg-teal-600 p-1.5 text-white transition-colors hover:bg-teal-700" title="Add term"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
                <div className="max-h-[620px] space-y-1.5 overflow-y-auto p-2">
                  {termDrafts.map(term => {
                    const isSelected = term.id === selectedTerm.id
                    return (
                      <div key={term.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTermId(term.id)
                            setSelectedSectionId(term.sections[0].id)
                            setActiveTermAccordion('details')
                          }}
                          className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${isSelected ? 'border-teal-200 bg-white shadow-xs' : 'border-transparent hover:border-gray-200 hover:bg-white'}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-xs font-semibold ${isSelected ? 'text-teal-700' : 'text-slate-700'}`}>{term.name}</span>
                            {isSelected ? <ChevronDown className="h-3.5 w-3.5 text-teal-600" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                          </div>
                          <div className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-slate-400">
                            <Calendar className="h-3 w-3" />
                            <span>{toDisplayDate(term.startDate)}</span>
                            <span>→</span>
                            <span>{toDisplayDate(term.endDate)}</span>
                          </div>
                        </button>

                      </div>
                    )
                  })}
                </div>
              </aside>

              <div className="min-w-0 bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{selectedTerm.name}</h3>
                    <p className="mt-1 text-[11px] text-slate-500">Manage term name, duration, sections, courses, and credits.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {savedTermId === selectedTerm.id && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-teal-200/60 bg-teal-50 px-2 py-1 text-[10px] font-semibold text-teal-700"><Check className="h-3 w-3" /> Saved</span>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteTerm(selectedTerm.id)}
                      disabled={termDrafts.length <= 1}
                      className="rounded-lg border border-gray-200 bg-white p-2 text-slate-400 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
                      title={termDrafts.length <= 1 ? 'At least one term is required' : 'Delete term'}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTermAccordion(current => current === 'details' ? null : 'details')}
                  className={`mt-4 flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${activeTermAccordion === 'details' ? 'border-teal-200 bg-teal-50/50 text-teal-700' : 'border-gray-200 bg-slate-50/60 text-slate-700 hover:bg-slate-50'}`}
                >
                  <span>
                    <span className="block text-xs font-bold">Details</span>
                    <span className="mt-0.5 block text-[10px] font-normal text-slate-500">Schedule, credits, requirements, and timezone</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeTermAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>

                <div className={activeTermAccordion === 'details' ? '' : 'hidden'}>
                <h4 className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Schedule and identity</h4>
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="md:col-span-2">
                    <FieldLabel>Term Name (custom)</FieldLabel>
                    <input value={selectedTerm.name} onChange={e => updateSelectedTerm({ name: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <FieldLabel required>Start Date</FieldLabel>
                    <input required type="date" value={selectedTerm.startDate} onChange={e => updateSelectedTerm({ startDate: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <FieldLabel required>End Date</FieldLabel>
                    <input required type="date" value={selectedTerm.endDate} onChange={e => updateSelectedTerm({ endDate: e.target.value })} className={inputClass} />
                  </div>
                </div>

                <h4 className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Credit structure</h4>
                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                  <div><FieldLabel required>Industry Credit</FieldLabel><input type="number" min={0} value={selectedTerm.industryCredit} onChange={e => updateSelectedTerm({ industryCredit: Number(e.target.value) })} className={inputClass} /></div>
                  <div><FieldLabel required>Core Credit</FieldLabel><input type="number" min={0} value={selectedTerm.coreCredit} onChange={e => updateSelectedTerm({ coreCredit: Number(e.target.value) })} className={inputClass} /></div>
                  <div><FieldLabel required>Outclass Credit</FieldLabel><input type="number" min={0} value={selectedTerm.outclassCredit} onChange={e => updateSelectedTerm({ outclassCredit: Number(e.target.value) })} className={inputClass} /></div>
                  <div><FieldLabel required>Min Credit</FieldLabel><input type="number" min={0} value={selectedTerm.minCredit} onChange={e => updateSelectedTerm({ minCredit: Number(e.target.value) })} className={inputClass} /></div>
                  <div><FieldLabel required>Max Credit</FieldLabel><input type="number" min={0} value={selectedTerm.maxCredit} onChange={e => updateSelectedTerm({ maxCredit: Number(e.target.value) })} className={inputClass} /></div>
                </div>

                <h4 className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Curriculum requirements</h4>
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-[minmax(180px,0.7fr)_minmax(260px,1.3fr)_auto] md:items-end">
                  <div>
                    <FieldLabel>Select Country</FieldLabel>
                    <div className="relative"><select value={selectedTerm.country} onChange={e => updateSelectedTerm({ country: e.target.value })} className={selectClass}><option>India</option><option>United Arab Emirates</option><option>United Kingdom</option><option>United States</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /></div>
                  </div>
                  <div><FieldLabel>Required Documents</FieldLabel><input value={selectedTerm.requiredDocuments} onChange={e => updateSelectedTerm({ requiredDocuments: e.target.value })} placeholder="Select or type to add a document" className={inputClass} /></div>
                  <button type="button" onClick={() => setSavedTermId(selectedTerm.id)} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-700"><Check className="h-3.5 w-3.5" />Save Term Details</button>
                </div>

                <div className="mt-5 max-w-md">
                  <FieldLabel>Capstone Section</FieldLabel>
                  <div className="relative"><select value={selectedTerm.capstoneSection} onChange={e => updateSelectedTerm({ capstoneSection: e.target.value })} className={selectClass}><option value="">Not assigned</option>{selectedTerm.sections.map(section => <option key={section.id} value={section.id}>{section.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /></div>
                </div>

                <div className="mt-5 max-w-md">
                  <FieldLabel required>Cohort Timezone</FieldLabel>
                  <div className="relative"><select value={timezone} onChange={e => setTimezone(e.target.value)} className={selectClass}><option>Asia/Kolkata</option><option>Asia/Dubai</option><option>Europe/London</option><option>America/New_York</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /></div>
                </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTermAccordion(current => current === 'sections' ? null : 'sections')}
                  className={`mt-3 flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${activeTermAccordion === 'sections' ? 'border-teal-200 bg-teal-50/50 text-teal-700' : 'border-gray-200 bg-slate-50/60 text-slate-700 hover:bg-slate-50'}`}
                >
                  <span>
                    <span className="block text-xs font-bold">Sections <span className="ml-1 text-[10px] text-slate-400">({selectedTerm.sections.length})</span></span>
                    <span className="mt-0.5 block text-[10px] font-normal text-slate-500">Section-level courses and student enrollment</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeTermAccordion === 'sections' ? 'rotate-180' : ''}`} />
                </button>

                <div className={activeTermAccordion === 'sections' ? '' : 'hidden'}>
                  <div className="mt-3 flex flex-col gap-3 border-b border-gray-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
                    <div role="tablist" aria-label="Term sections" className="flex min-w-0 items-center gap-1 overflow-x-auto">
                      {selectedTerm.sections.map(section => {
                        const isActive = section.id === selectedSection.id
                        return (
                          <button
                            key={section.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setSelectedSectionId(section.id)}
                            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${isActive ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'}`}
                          >
                            {section.name}
                            <span className={`ml-1.5 text-[9px] ${isActive ? 'text-teal-100' : 'text-slate-400'}`}>{section.courses.length}/{section.students.length}</span>
                          </button>
                        )
                      })}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button type="button" onClick={addSection} className="inline-flex items-center gap-1 rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-xs transition-colors hover:bg-teal-50"><Plus className="h-3.5 w-3.5" />Add Section</button>
                      <button type="button" onClick={() => deleteSection(selectedSection.id)} disabled={selectedTerm.sections.length <= 1} className="rounded-lg border border-gray-200 bg-white p-2 text-slate-400 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40" title={selectedTerm.sections.length <= 1 ? 'At least one section is required' : 'Delete selected section'}><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>

                <div className="mt-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Courses</p>
                      <p className="mt-0.5 text-[10px] text-slate-400">Assign curriculum courses to {selectedSection.name}.</p>
                    </div>
                    <button type="button" onClick={() => openManagementDialog('courses')} className="inline-flex items-center gap-1 rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-xs transition-colors hover:bg-teal-50"><Plus className="h-3.5 w-3.5" />Add Courses</button>
                  </div>
                  {selectedSection.courses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {selectedSection.courses.map(course => (
                        <div key={course} className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5">
                          <span className="truncate text-xs font-medium text-slate-700">{course}</span>
                          <button type="button" onClick={() => updateSelectedSection({ courses: selectedSection.courses.filter(item => item !== course) })} className="rounded p-1 text-slate-300 transition-colors hover:bg-rose-50 hover:text-rose-600" title={`Remove ${course}`}><X className="h-3.5 w-3.5" /></button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-gray-200 bg-slate-50/40 px-4 py-6 text-center text-xs text-slate-400">No courses assigned to this section.</div>
                  )}
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Students</p>
                      <p className="mt-0.5 text-[10px] text-slate-400">{selectedSection.students.length} students enrolled in {selectedSection.name}.</p>
                    </div>
                    <button type="button" onClick={() => openManagementDialog('students')} className="inline-flex items-center gap-1 rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-xs transition-colors hover:bg-teal-50"><Plus className="h-3.5 w-3.5" />Add Students</button>
                  </div>
                  {selectedSection.students.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedSection.students.map(student => (
                        <span key={student} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-700">
                          {student}
                          <button type="button" onClick={() => updateSelectedSection({ students: selectedSection.students.filter(item => item !== student) })} aria-label={`Remove ${student}`}><X className="h-3 w-3 text-slate-400 hover:text-rose-600" /></button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-gray-200 bg-slate-50/40 px-4 py-6 text-center text-xs text-slate-400">No students enrolled in this section.</div>
                  )}
                </div>


              </div>
            </div>
            </div>
            )}
          </section>

          <section className={activeTab === 'General Details' ? 'border-t border-gray-100 pt-6' : 'hidden'}>
            <div className="mb-4">
              <h2 className="text-sm font-bold text-slate-900">Cohort description</h2>
              <p className="mt-1 text-[11px] text-slate-500">Provide a concise overview shown across cohort-facing experiences.</p>
            </div>
            <FieldLabel required>Description</FieldLabel>
            <div className="overflow-hidden rounded-lg border border-gray-200 focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600">
              <div className="flex flex-wrap items-center gap-1 border-b border-gray-100 bg-slate-50 px-3 py-2 text-slate-500">
                <span className="mr-2 text-[11px] font-medium">Normal</span>
                {[Bold, Italic, Underline, Link, List, ListOrdered].map((Icon, index) => <button key={index} type="button" className="rounded p-1 hover:bg-white hover:text-slate-800"><Icon className="h-3.5 w-3.5" /></button>)}
              </div>
              <textarea required value={cohortDescription} onChange={e => setCohortDescription(e.target.value)} rows={7} className="w-full resize-y px-3 py-3 text-xs leading-relaxed text-slate-700 outline-none" />
            </div>
          </section>
        </div>
      </div>

      {managementDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button type="button" aria-label="Close dialog" onClick={() => setManagementDialog(null)} className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px]" />
          <div role="dialog" aria-modal="true" aria-labelledby="management-dialog-title" className="relative z-10 flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-5 py-4">
              <div>
                <h2 id="management-dialog-title" className="text-base font-bold text-slate-900">
                  {managementDialog === 'courses' ? 'Add Courses' : 'Add Students'}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {managementDialog === 'courses'
                    ? `Select courses to assign to ${selectedSection.name} in ${selectedTerm.name}.`
                    : `Select students to enroll in ${selectedSection.name}.`}
                </p>
              </div>
              <button type="button" onClick={() => setManagementDialog(null)} className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700" title="Close"><X className="h-4 w-4" /></button>
            </div>

            <>
                <div className="border-b border-gray-100 p-4">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input autoFocus value={managementSearch} onChange={e => setManagementSearch(e.target.value)} placeholder={`Search ${managementDialog}...`} className={`${inputClass} pl-9`} />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  {filteredManagementItems.length > 0 ? filteredManagementItems.map(item => (
                    <label key={item} className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[10px] font-bold text-teal-700">{item.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()}</span>
                        <span className="truncate text-xs font-medium text-slate-700">{item}</span>
                      </div>
                      <input type="checkbox" checked={pendingSelections.includes(item)} onChange={() => togglePendingSelection(item)} className="h-4 w-4 accent-teal-600" />
                    </label>
                  )) : (
                    <div className="px-4 py-10 text-center text-xs text-slate-400">No available {managementDialog} found.</div>
                  )}
                </div>
              </>

            <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-slate-50/60 px-5 py-3">
              <span className="text-[11px] font-medium text-slate-500">
                {pendingSelections.length} selected
              </span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setManagementDialog(null)} className="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50">Cancel</button>
                <button
                  type="button"
                  onClick={addSelectedItems}
                  disabled={pendingSelections.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Selected ({pendingSelections.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

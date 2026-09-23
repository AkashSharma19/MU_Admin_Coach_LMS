# Masters' Union LMS — UI Design System & Component Guidelines

A developer reference guide for building consistent, production-grade screens across the Masters' Union LMS portal.

---

## 1. Core Visual Principles & Color Palette

The interface follows a clean, high-density SaaS aesthetic with crisp white surfaces, soft slate neutrals, and a signature teal accent.

### Color Tokens

| Token Category | Tailwind Utility | Hex / Fallback | Usage |
|---|---|---|---|
| **Canvas Background** | `bg-[#f8fafc]` | `#f8fafc` (Slate 50) | Main page background behind tables and cards |
| **Surface Background** | `bg-white` | `#ffffff` | Headers, sidebar, tables, modal cards |
| **Subtle Hover** | `hover:bg-slate-50/70` | `#f8fafc` | Table rows, secondary button hover states |
| **Primary Accent** | `bg-teal-600`, `hover:bg-teal-700` | `#0d9488`, `#0f766e` | Primary CTAs, active badges, indicators |
| **Accent Surface** | `bg-teal-50`, `bg-teal-50/40` | `#f0fdfa` | Active sidebar item, active status badge |
| **Accent Text / Border**| `text-teal-700`, `border-teal-200/60` | `#0f766e` | Active text highlight, badge borders |
| **Primary Text** | `text-slate-900`, `text-slate-800` | `#0f172a`, `#1e293b` | Page titles, primary program/cohort names |
| **Secondary Text** | `text-slate-600` | `#475569` | Table cell data, descriptions |
| **Muted Text** | `text-slate-500`, `text-slate-400` | `#64748b`, `#94a3b8` | Breadcrumbs, table headers, placeholders |
| **Destructive** | `text-rose-600`, `hover:bg-rose-50`| `#e11d48` | Log out button, delete actions |
| **Border Neutral** | `border-gray-200`, `border-gray-100` | `#e5e7eb`, `#f3f4f6` | Table wrappers, dividers, inputs |

---

## 2. Typography Hierarchy

- **Font Family**: `Inter`, system-ui, sans-serif
- **Weight Convention**:
  - `font-normal` (400) for body, metadata, and table data (including course codes; do not use `font-mono`)
  - `font-medium` (500) for secondary details and navigation labels
  - `font-semibold` (600) for program titles, buttons, and badges
  - `font-bold` (700) for page `<h1>` headings

### Typography Scale

```tsx
// Page Title (H1)
<h1 className="text-xl font-bold text-slate-900 tracking-tight">
  Page Title
</h1>

// Section / Card Header
<h2 className="text-base font-semibold text-slate-900">
  Section Title
</h2>

// Table Header Label
<th className="py-3.5 px-4 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
  Column Name
</th>

// Table Primary Cell
<td className="py-3.5 px-5 font-semibold text-slate-800 text-xs">
  Entity Name
</td>

// Table Secondary Cell
<td className="py-3.5 px-4 text-slate-600 text-xs">
  Data Value
</td>

// Breadcrumbs
<div className="text-xs font-medium text-slate-500">
  Category > Subcategory
</div>
```

---

## 3. Layout Architecture

The application layout consists of a **fixed viewport container** (`h-screen overflow-hidden`):

```
+-------------------------------------------------------------------------+
| Top Header Navbar (h-16, shrink-0, sticky top-0, z-40)                  |
+-------------------------------------------------------------------------+
| Left Sidebar        | Main Canvas (flex-1 overflow-y-auto)             |
| (h-full, shrink-0,  | - Breadcrumbs with teal bar                      |
|  w-64 or w-[70px],  | - Page Title + Action Bar (Search + CTA)         |
|  fixed position)    | - White rounded Table Card with pagination       |
+-------------------------------------------------------------------------+
```

### Layout Code Template

```tsx
<div className="h-screen bg-[#f8fafc] text-slate-700 flex flex-col font-sans overflow-hidden">
  {/* Header */}
  <header className="shrink-0 sticky top-0 z-40 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
    {/* Brand, Search, User profile */}
  </header>

  {/* Main Container */}
  <div className="flex-1 flex overflow-hidden h-[calc(100vh-4rem)]">
    {/* Left Sidebar */}
    <aside className="bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-200 z-30 select-none shrink-0 h-full w-64">
      {/* Navigation items */}
    </aside>

    {/* Content Canvas */}
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Content */}
    </main>
  </div>
</div>
```

---

## 4. Standard Component Recipes

### 1. Breadcrumb Bar with Teal Accent

Used on top of every section view:

```tsx
<div className="flex items-center gap-2.5">
  {/* Signature Teal Pill Bar */}
  <div className="w-1.5 h-6 bg-teal-600 rounded-full"></div>
  
  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 flex-wrap">
    <button onClick={handleBack} className="hover:text-teal-700 cursor-pointer transition-colors">
      Program Management
    </button>
    <ChevronRight className="h-3 w-3 text-slate-400" />
    <span className="text-teal-700 font-semibold">Program List</span>
  </div>
</div>
```

For sub-detail pages (e.g. Cohort page), append the active view pill:

```tsx
<span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[11px] font-semibold shadow-xs">
  All Cohorts
</span>
```

---

### 2. Page Title & Action Bar

Consistent header placed directly on the canvas without a background box:

```tsx
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  {/* Left: Title or Title with Entity Avatar */}
  <div className="flex items-center gap-3">
    <h1 className="text-xl font-bold text-slate-900 tracking-tight">
      Page Title
    </h1>
  </div>

  {/* Right: Search Input + Primary Action CTA */}
  <div className="flex items-center gap-3">
    {/* Search Input */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
      <input
        type="text"
        placeholder="Search here..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all w-52 sm:w-60 shadow-xs"
      />
    </div>

    {/* Primary Teal CTA */}
    <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0">
      <Plus className="h-3.5 w-3.5" />
      <span>Add New</span>
    </button>
  </div>
</div>
```

---

### 3. Data Table Component

All data tables must share this structure:

```tsx
<div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-gray-100 bg-white text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
          <th className="py-3.5 px-5">First Column (Title)</th>
          <th className="py-3.5 px-4">Attribute 1</th>
          <th className="py-3.5 px-4">Attribute 2</th>
          <th className="py-3.5 px-4 text-center">Status</th>
          <th className="py-3.5 px-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 text-xs">
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
            <td className="py-3.5 px-5 font-semibold text-slate-800">
              {item.name}
            </td>
            <td className="py-3.5 px-4 text-slate-600">
              {item.attr1}
            </td>
            <td className="py-3.5 px-4 text-slate-600 font-medium">
              {item.attr2}
            </td>
            <td className="py-3.5 px-4 text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200/60">
                Active
              </span>
            </td>
            <td className="py-3.5 px-4 text-center">
              <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                <MoreVertical className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}

        {items.length === 0 && (
          <tr>
            <td colSpan={5} className="py-10 text-center text-slate-400">
              No records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Pagination Footer */}
  <div className="border-t border-gray-100 px-5 py-3.5 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
    <div className="flex items-center gap-2">
      <span>Rows per page</span>
      <div className="relative inline-flex items-center border border-gray-200 rounded-md px-2 py-1 bg-white cursor-pointer hover:border-gray-300">
        <span className="text-slate-700 font-medium mr-1">10</span>
        <ChevronDown className="h-3 w-3 text-slate-400" />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <span>1-10 of 33</span>
      <div className="flex items-center gap-1">
        <button disabled className="p-1.5 rounded border border-gray-200 text-slate-300 cursor-not-allowed">
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button className="p-1.5 rounded border border-gray-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </div>
</div>
```

---

### 4. Status Badges

| Status | Classes |
|---|---|
| **Active** | `bg-teal-50 text-teal-700 border border-teal-200/60 px-3 py-1 rounded-full text-[11px] font-medium` |
| **Inactive / Pending** | `bg-amber-50 text-amber-700 border border-amber-200/60 px-3 py-1 rounded-full text-[11px] font-medium` |
| **Archived / Terminated** | `bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-[11px] font-medium` |

---

## 5. Realistic Data Guidelines

Per application conventions, **never include placeholder/test strings** (e.g., `SBM_TEST`, `test-123`, `foo`, `Lorem ipsum`, `0` cohorts dummy records):

- **Program Names**: Authentic higher-ed / executive program titles (e.g. *Post Graduate Programme in Technology and Business Management (PGP-TBM)*, *Applied AI & Agentic Systems*, *Product Leadership MasterCamp*).
- **Cohorts Format**: Always display active cohorts in the format `active/total` (e.g., `2/4`, `3/5`).
- **Cohort Names**: Simple, clean naming convention like *Cohort 1*, *Cohort 2*, *Cohort 3* with corresponding badge pills (*C1*, *C2*, *C3*). Avoid repeating program names as prefixes in cohort titles.
- **Dates**: Standard formatted dates like `01/08/2025` or `31/12/2025`.
- **Modalities**: `Hybrid`, `Offline`, or `Online`.
- **Terms & Sections**: Standard curriculum counts (4 terms, 6 terms, 8 terms; sections 1-10).

---

## 6. Navigation State Persistence & Deep Linking

To prevent the application from resetting to the root screen on page refresh or browser reload:

1. **State Synchronization**:
   - Initialize navigation states (`selectedProgram`, `selectedCohort`, `selectedTerm`, `selectedSection`) from `URLSearchParams` on mount, falling back to `localStorage`.
   - Use `window.history.pushState` on transitions so the browser URL address bar immediately reflects the current screen:
     - Level 1 (Program List): `/`
     - Level 2 (Cohorts List): `/?program=2`
     - Level 3 (Cohort Curriculum): `/?program=2&cohort=c6&term=Term+1&section=Section+1`
2. **Browser History Support**:
   - Register a `popstate` event listener so clicking browser **Back** / **Forward** buttons transitions between navigation levels seamlessly.
3. **Reset Handlers**:
   - When navigating up the hierarchy (e.g. clicking the Program Management breadcrumb), always explicitly clear child states (`setSelectedCohort(null)` and `setSelectedProgram(null)`).

---

## 7. Slide-Over Drawers (Side Sheets)

Used for contextual sub-views like **Manage Students**:

- **Backdrop**: `fixed inset-0 bg-black/45 backdrop-blur-[0.5px] z-50`
- **Panel**: `fixed inset-y-0 right-0 max-w-2xl w-full bg-white shadow-2xl z-50 flex flex-col`
- **Header**:
  - Height `h-16 px-6 border-b border-gray-200 flex items-center justify-between`
  - Title: Bold `text-lg text-slate-900`
  - Secondary Action: Outlined teal button (`border border-teal-500 text-teal-700 text-xs font-semibold px-3.5 py-1.5 rounded-md`)
  - Close button: `X` icon button (`text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg`)
- **Sticky Table**:
  - `thead`: `sticky top-0 z-10 bg-white border-b border-gray-100 text-slate-600 text-xs font-semibold`
  - `tbody`: `divide-y divide-gray-100 text-xs hover:bg-slate-50/70`
- **Keyboard & Dismissal**:
  - Clicking the backdrop, clicking `X`, or pressing `Escape` dismisses the drawer.

---

## 8. Action Menus & Contextual Dropdowns

Used for table toolbar overflow actions:

- **Trigger**: Bordered icon button (`border border-gray-200 p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50`)
- **Container**: `absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-40`
- **Items**:
  - `w-full flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900`
  - Subtle icons (`h-4 w-4 text-slate-500`) with semantic accent overrides (e.g. `text-teal-600` for NPS)
- **Divider**: `<div className="border-t border-gray-100 my-1"></div>`
- **Toggle Switches (e.g., Group by Domain)**:
  - Container: `flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer select-none`
  - Pill track: `w-9 h-5 rounded-full relative flex items-center p-0.5` (`bg-teal-600` when on, `bg-slate-300` when off)
  - Knob: `w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform` (`translate-x-4` when on, `translate-x-0` when off)
- **Dismissal**: Closes automatically on outside click via `useRef` and `mousedown` listener.

---

## 9. Course Detail View (Harmonized Layout Matching Program & Cohort Design)

Used when drill-down navigating into an individual course from the curriculum table:

- **Deep Link Parameter**: `?program=:id&cohort=:id&term=:term&section=:section&course=:courseId`
- **Breadcrumbs Trail**:
  - Teal left indicator: `w-1.5 h-6 bg-teal-600 rounded-full`
  - Inline hierarchy items: `Program Management > [Program Name] > [Cohort Name] > [Term] > [Section] > [Course Name (teal font-semibold)]`
- **Entity Header Bar (Matches Program & Cohort Header)**:
  - **Avatar Badge**: `w-11 h-11 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm select-none shrink-0 shadow-xs tracking-wider` displaying course code prefix (e.g., `CXO`, `PGP`).
  - **Entity Title**: `h1 className="text-xl font-bold text-slate-900 tracking-tight"` + `Info` icon button + Course type pill (`Core`, `bg-teal-50 text-teal-700 border border-teal-200/60`).
  - **Metadata Strip**: Inlined pipe-separated metadata strip:
    `CREDIT - 0 | FACULTY - CXO Guest Faculty +12 | PROGRAM ASSOCIATE - Ms. Priya Sharma`
    With uppercase gray labels and bold slate-800 values separated by `<span className="text-slate-300">|</span>`.
  - **Action Buttons**: Right-aligned square icon buttons for `FileText` (Documents) and `Pencil` (Edit Course) with `p-2 rounded-lg border border-gray-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors shadow-xs`.
- **Course Navigation Tabs**:
  - Horizontal tab strip with underline indicator for active tab: `Sessions (31)`, `Resources (0)`, `Grades`, `Attendance`, `Groups`, `Grading Template`, `Attendance Template`, `Messages`.
- **Sessions Tab (Toolbar & Split View)**:
  - **Filter & Action Toolbar**:
    - Left: Search input (`Search sessions...`) with `Search` icon.
    - Right: Outlined `Schedule Sessions` (`bg-white border border-gray-200 text-slate-700`) and solid teal `+ Add Session` CTA (`bg-teal-600 hover:bg-teal-700 text-white`).
  - **Sessions Split View**:
    - **Left Column** (`lg:col-span-4`):
      - Clean white card wrapper (`bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden`).
      - Card Header: `px-4 py-3 bg-slate-50/70 border-b border-gray-100 flex items-center justify-between text-xs font-semibold text-slate-700` (`Sessions List (n)`).
      - Each session item displays:
        - `Session {sessionNum}` + Recording status badge/icon (`Recorded` with `Video` icon in teal when available, or `No Rec` with `VideoOff` icon in slate-400 when not added)
        - Session title (`text-xs font-semibold text-slate-800 line-clamp-2`)
        - Date & Time row (`Calendar` + date • `Clock` + time)
      - Divide-y list with active session highlighted in `bg-teal-50/70 border-l-4 border-l-teal-600`.
    - **Right Column** (`lg:col-span-8`):
      - **Unified Single-Card Architecture** (`bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden`):
        - Eliminates nested "box-in-a-box" fatigue with clean whitespace, subtle dividing lines, and color-coded icon badges.
        1. **Header & Context Section**:
           - **Title & Description**: `h3 font-bold text-slate-900 text-lg sm:text-xl` and `text-xs sm:text-sm text-slate-600 leading-relaxed`.
           - **Action Icons Cluster**: Outlined square icon buttons on top-right for quick actions:
             - `Watch` CTA (solid teal button when recording exists)
             - `Pencil` icon button (`Edit Session`)
             - `History` icon button (`Session History`)
             - `Trash` icon button (`Delete Session`, red hover)
           - **Smart Governance Toolbar**: Dedicated sub-toolbar right below the title:
             - **Enable Feedback**: Smooth toggle switch.
             - **Mandatory Feedback**: Dynamically revealed when Enable Feedback is ON, with tooltip on hover: *"Student attendance will only be marked Present upon successful feedback submission."*
             - **Show Feedback QR**: Dynamic QR code button with `QrCode` icon.
             - **View Feedback CTA**: Amber pill button with golden `Star` icon and live average rating (e.g., `★ 3.2`), opening a detailed feedback analytics drawer with score breakdowns, response counts, and qualitative student reviews.
             - **Mark Attendance**: Dropdown with options: *Mark Manually* (roll sheet) and *Display Attendance QR* (in-room scan).
             - **Interactive QR Modal**: Dynamic modal for displaying student feedback or attendance scan codes.
        2. **Logistics & Details Strip (Icon-Led, Zero Boxes)**:
           - Inlined in an open, breathable 3-column grid on a subtle `bg-slate-50/70` canvas with soft icon badges:
             - **Date & Time**: `Calendar` & `Clock` icons in teal badge (`bg-teal-50 text-teal-600`).
             - **Faculty**: `User` icon in blue badge (`bg-blue-50 text-blue-600`), title and academic role.
             - **Program Associate**: `Mail` icon in purple badge (`bg-purple-50 text-purple-600`) with lead coordinator tag.
             - **Location & Modality**: `MapPin` icon in emerald badge (`bg-emerald-50 text-emerald-600`).
             - **Session Link**: `ExternalLink` icon in amber badge (`bg-amber-50 text-amber-600`), direct link, `Join Room` action, and `Copy Link`.
        3. **Session Video Recording**:
           - 16:9 executive lecture video frame image with centered circular play button, pulsing ring animation, HD 1080p indicator, duration badge, scrub line, and quick streaming actions.
        4. **Topics & Sub-topics (Clean Checklist, No Boxes)**:
           - Topic headline with signature vertical teal pill bar (`w-1.5 h-4 bg-teal-600 rounded-full`).
           - 2-column checklist with soft circular teal checkmarks (`w-4 h-4 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center`).
        5. **Class Materials & Resources (Unified List with Icons)**:
           - Clean vertical list (`divide-y divide-gray-100 border border-gray-200/80 rounded-xl overflow-hidden`):
             - **Pre-Read**: Indigo `FileText` icon badge, size, and download button.
             - **In-Class**: Teal `Presentation` icon badge, deck size, and "Download Deck" CTA.
             - **Post-Class**: Amber `FileSpreadsheet` icon badge, size, and download / pending status.

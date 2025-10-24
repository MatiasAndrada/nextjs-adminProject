// Loading animation with dark mode support
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-white/10 before:to-transparent';

// ============= COMMON SKELETONS =============

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-300 dark:bg-gray-700 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white dark:bg-gray-900 px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-300 dark:bg-gray-700" />
      <div className="rounded-xl bg-gray-200 dark:bg-gray-800 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white dark:bg-gray-900 p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-300 dark:bg-gray-700" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 lg:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-300 dark:bg-gray-700" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-200 dark:bg-gray-800 p-4">
        <div className="bg-white dark:bg-gray-900 px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-300 dark:bg-gray-700`}
      />
      <CardsSkeleton />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

// ============= TABLE SKELETONS =============

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-200 dark:border-gray-700 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-6 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-10 w-10 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 dark:text-gray-100 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============= PROJECT SKELETONS =============

export function ProjectCardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="h-8 w-8 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex -space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 ring-2 ring-white dark:ring-gray-900" />
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 ring-2 ring-white dark:ring-gray-900" />
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 ring-2 ring-white dark:ring-gray-900" />
          </div>
          <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <section className="space-y-4">
      {/* Title */}
      <div className={`${shimmer} relative overflow-hidden h-10 w-48 rounded bg-gray-300 dark:bg-gray-700`} />
      
      {/* Your Projects Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-8 w-40 rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-10 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
        <ProjectsGridSkeleton />
      </div>
      
      {/* Projects with you Section */}
      <div className="space-y-4 pt-6">
        <div className="h-8 w-48 rounded bg-gray-300 dark:bg-gray-700" />
        <ProjectsGridSkeleton />
      </div>
      
      {/* Invitations Section */}
      <div className="space-y-4 pt-6">
        <div className="h-8 w-32 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </div>
    </section>
  );
}

// ============= TASK SKELETONS =============

export function TaskRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-200 dark:border-gray-700 last-of-type:border-none">
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-6 w-48 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-24 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-9 w-9 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-9 w-9 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </td>
    </tr>
  );
}

export function TasksTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 dark:text-gray-100">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Task
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Priority
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Assignee
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Due Date
                </th>
                <th scope="col" className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              <TaskRowSkeleton />
              <TaskRowSkeleton />
              <TaskRowSkeleton />
              <TaskRowSkeleton />
              <TaskRowSkeleton />
              <TaskRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function TaskCardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm`}>
      <div className="space-y-3">
        {/* Header with checkbox and title */}
        <div className="flex items-start gap-3">
          <div className="h-5 w-5 rounded bg-gray-300 dark:bg-gray-700 mt-0.5" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
        
        {/* Tags/Labels */}
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>
        
        {/* Footer with avatar and date */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-7 w-7 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export function TasksGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
    </div>
  );
}

// ============= TASK GROUP SKELETONS =============

export function TaskGroupCardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-6 w-2/3 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="h-8 w-8 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-4/5 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-8 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-12 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="h-3 w-16 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export function TaskGroupsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <TaskGroupCardSkeleton />
      <TaskGroupCardSkeleton />
      <TaskGroupCardSkeleton />
      <TaskGroupCardSkeleton />
      <TaskGroupCardSkeleton />
      <TaskGroupCardSkeleton />
    </div>
  );
}

// ============= MEMBER SKELETONS =============

export function MemberCardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm`}>
      <div className="space-y-4">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-32 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
        
        {/* Role badge */}
        <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
        
        {/* Email */}
        <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700" />
        
        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <div className="h-9 flex-1 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="h-9 w-9 rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export function MembersGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <MemberCardSkeleton />
      <MemberCardSkeleton />
      <MemberCardSkeleton />
      <MemberCardSkeleton />
      <MemberCardSkeleton />
      <MemberCardSkeleton />
    </div>
  );
}

export function MemberRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-200 dark:border-gray-700 last-of-type:border-none">
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="space-y-1">
            <div className="h-5 w-32 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-40 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-24 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-5 w-28 rounded bg-gray-300 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-9 w-9 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-9 w-9 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </td>
    </tr>
  );
}

export function MembersTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 dark:text-gray-100">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Member
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Joined
                </th>
                <th scope="col" className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              <MemberRowSkeleton />
              <MemberRowSkeleton />
              <MemberRowSkeleton />
              <MemberRowSkeleton />
              <MemberRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============= PROFILE SKELETONS =============

export function ProfileSkeleton() {
  return (
    <main className="space-y-4">
      {/* Title */}
      <div className={`${shimmer} relative overflow-hidden h-10 w-40 rounded bg-gray-300 dark:bg-gray-700`} />
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className={`${shimmer} relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm`}>
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="h-32 w-32 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
            
            {/* Name and Email */}
            <div className="space-y-3 text-center">
              <div className="h-7 w-48 mx-auto rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-5 w-56 mx-auto rounded bg-gray-300 dark:bg-gray-700" />
            </div>
            
            {/* Badges */}
            <div className="flex justify-center gap-2">
              <div className="h-6 w-24 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>
        </div>
        
        {/* Settings Card */}
        <div className={`${shimmer} relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm`}>
          <div className="space-y-4">
            <div className="h-6 w-32 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="space-y-3">
              <div className="h-12 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
              <div className="h-12 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
              <div className="h-12 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
              <div className="h-12 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ============= FORM SKELETONS =============

export function FormSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm`}>
      <div className="space-y-6">
        {/* Form Title */}
        <div className="h-7 w-48 rounded bg-gray-300 dark:bg-gray-700" />
        
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Field 1 */}
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-10 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
          </div>
          
          {/* Field 2 */}
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-10 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
          </div>
          
          {/* Field 3 */}
          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-24 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <div className="h-10 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="h-10 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

// ============= PAGE-SPECIFIC SKELETONS =============

export function DashboardOverviewSkeleton() {
  return (
    <main className="space-y-4">
      {/* Title */}
      <div className={`${shimmer} relative overflow-hidden h-10 w-48 rounded bg-gray-300 dark:bg-gray-700`} />
      
      {/* Stats Cards */}
      <CardsSkeleton />
      
      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChartSkeleton />
        <div className={`${shimmer} relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm`}>
          <div className="space-y-4">
            <div className="h-6 w-40 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="space-y-3">
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
              <InvoiceSkeleton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function TasksPageSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* Breadcrumbs */}
      <div className="flex gap-2">
        <div className="h-5 w-20 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-5 w-4 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-700" />
      </div>
      
      {/* Search and Create */}
      <div className="flex items-center justify-between gap-2">
        <div className="h-10 w-64 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-10 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
      </div>
      
      {/* Table */}
      <TasksTableSkeleton />
      
      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <div className="h-10 w-10 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-10 w-10 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-10 w-10 rounded-md bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export function MembersPageSkeleton() {
  return (
    <section className="w-full space-y-4">
      {/* Breadcrumbs */}
      <div className="flex gap-2">
        <div className="h-5 w-20 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-5 w-4 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-700" />
      </div>
      
      {/* Header Actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="h-10 w-40 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-10 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
      </div>
      
      {/* Members Table */}
      <MembersTableSkeleton />
      
      {/* Invitations Section */}
      <div className="space-y-4 pt-4">
        <div className="h-6 w-64 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </div>
    </section>
  );
}

export function TaskGroupsPageSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* Breadcrumbs */}
      <div className="flex gap-2">
        <div className="h-5 w-20 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-5 w-4 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-5 w-32 rounded bg-gray-300 dark:bg-gray-700" />
      </div>
      
      {/* Search and Create */}
      <div className="flex items-center justify-between gap-2">
        <div className="h-10 w-64 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-10 w-40 rounded-md bg-gray-300 dark:bg-gray-700" />
      </div>
      
      {/* Grid */}
      <TaskGroupsGridSkeleton />
      
      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <div className="h-10 w-10 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-10 w-10 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-10 w-10 rounded-md bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
}

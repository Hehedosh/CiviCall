import type React from "react"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-10">
        {/* Sidebar content */}
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4">
          <div className="text-[22px] text-center font-bold font-montserrat text-lg text-green-700">Система звернень - CiviCall</div>
          </div>
          <div className="mt-6 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1" aria-label="Sidebar">
              {/* Add navigation links here */}
              {/* Example: */}
              {/* <a href="#" className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                Dashboard
              </a> */}
            </nav>
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}


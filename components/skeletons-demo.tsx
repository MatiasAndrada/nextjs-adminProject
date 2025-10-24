/**
 * DEMO PAGE - Skeletons Preview
 * 
 * Esta página muestra todos los skeletons disponibles para referencia visual.
 * NO usar en producción - solo para desarrollo/testing.
 * 
 * Para ver: Crear una ruta temporal en app/demo-skeletons/page.tsx
 */

import DashboardSkeleton from '@/components/skeletons';
import {
  // General
  CardSkeleton,
  CardsSkeleton,
  DashboardOverviewSkeleton,
  RevenueChartSkeleton,
  
  // Tables
  TableRowSkeleton,
  InvoicesTableSkeleton,
  
  // Projects
  ProjectCardSkeleton,
  ProjectsGridSkeleton,
  ProjectsSkeleton,
  
  // Tasks
  TaskCardSkeleton,
  TasksGridSkeleton,
  TaskRowSkeleton,
  TasksTableSkeleton,
  TasksPageSkeleton,
  
  // Task Groups
  TaskGroupCardSkeleton,
  TaskGroupsGridSkeleton,
  TaskGroupsPageSkeleton,
  
  // Members
  MemberCardSkeleton,
  MembersGridSkeleton,
  MemberRowSkeleton,
  MembersTableSkeleton,
  MembersPageSkeleton,
  
  // Profile & Forms
  ProfileSkeleton,
  FormSkeleton,
} from '@/components/skeletons';

export default function SkeletonsDemo() {
  return (
    <div className="min-h-screen p-8 space-y-12 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Skeletons Preview</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Vista previa de todos los skeletons disponibles con soporte dark/light mode
        </p>

        {/* Cards Section */}
        <Section title="Cards" description="Tarjetas individuales y grids">
          <div className="space-y-6">
            <SubSection title="Single Card">
              <CardSkeleton />
            </SubSection>
            
            <SubSection title="Cards Grid (4 items)">
              <CardsSkeleton />
            </SubSection>
          </div>
        </Section>

        {/* Charts Section */}
        <Section title="Charts" description="Gráficos y visualizaciones">
          <SubSection title="Revenue Chart">
            <RevenueChartSkeleton />
          </SubSection>
        </Section>

        {/* Projects Section */}
        <Section title="Projects" description="Componentes de proyectos">
          <div className="space-y-6">
            <SubSection title="Project Card">
              <div className="max-w-sm">
                <ProjectCardSkeleton />
              </div>
            </SubSection>
            
            <SubSection title="Projects Grid">
              <ProjectsGridSkeleton />
            </SubSection>
          </div>
        </Section>

        {/* Tasks Section */}
        <Section title="Tasks" description="Componentes de tareas">
          <div className="space-y-6">
            <SubSection title="Task Card">
              <div className="max-w-sm">
                <TaskCardSkeleton />
              </div>
            </SubSection>
            
            <SubSection title="Tasks Grid">
              <TasksGridSkeleton />
            </SubSection>
            
            <SubSection title="Tasks Table">
              <TasksTableSkeleton />
            </SubSection>
          </div>
        </Section>

        {/* Task Groups Section */}
        <Section title="Task Groups" description="Grupos de tareas">
          <div className="space-y-6">
            <SubSection title="Task Group Card">
              <div className="max-w-sm">
                <TaskGroupCardSkeleton />
              </div>
            </SubSection>
            
            <SubSection title="Task Groups Grid">
              <TaskGroupsGridSkeleton />
            </SubSection>
          </div>
        </Section>

        {/* Members Section */}
        <Section title="Members" description="Miembros del equipo">
          <div className="space-y-6">
            <SubSection title="Member Card">
              <div className="max-w-sm">
                <MemberCardSkeleton />
              </div>
            </SubSection>
            
            <SubSection title="Members Grid">
              <MembersGridSkeleton />
            </SubSection>
            
            <SubSection title="Members Table">
              <MembersTableSkeleton />
            </SubSection>
          </div>
        </Section>

        {/* Forms Section */}
        <Section title="Forms" description="Formularios genéricos">
          <SubSection title="Form Skeleton">
            <div className="max-w-lg">
              <FormSkeleton />
            </div>
          </SubSection>
        </Section>

        {/* Page Skeletons Section */}
        <Section title="Full Page Skeletons" description="Páginas completas">
          <div className="space-y-8">
            <SubSection title="Dashboard Overview">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <DashboardOverviewSkeleton />
              </div>
            </SubSection>
            
            <SubSection title="Projects Page">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <ProjectsSkeleton />
              </div>
            </SubSection>
            
            <SubSection title="Tasks Page">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <TasksPageSkeleton />
              </div>
            </SubSection>
            
            <SubSection title="Task Groups Page">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <TaskGroupsPageSkeleton />
              </div>
            </SubSection>
            
            <SubSection title="Members Page">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <MembersPageSkeleton />
              </div>
            </SubSection>
            
            <SubSection title="Profile Page">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <ProfileSkeleton />
              </div>
            </SubSection>
          </div>
        </Section>

        {/* Usage Examples */}
        <Section 
          title="Usage Examples" 
          description="Ejemplos de código para implementación"
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h4 className="font-semibold mb-4">Ejemplo básico con Suspense:</h4>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{`import { Suspense } from 'react';
import { TasksPageSkeleton } from '@/components/skeletons';

export default function TasksPage() {
  return (
    <Suspense fallback={<TasksPageSkeleton />}>
      <TasksContent />
    </Suspense>
  );
}`}</code>
            </pre>

            <h4 className="font-semibold mt-6 mb-4">Múltiples Suspense boundaries:</h4>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{`<div className="space-y-6">
  <Suspense fallback={<CardsSkeleton />}>
    <StatsCards />
  </Suspense>
  
  <Suspense fallback={<TasksTableSkeleton />}>
    <TasksTable />
  </Suspense>
</div>`}</code>
            </pre>
          </div>
        </Section>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📚 Documentación Completa
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            Para más información, consulta los siguientes archivos:
          </p>
          <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
            <li><code>components/SKELETONS_README.md</code> - Resumen rápido</li>
            <li><code>components/SKELETONS_GUIDE.md</code> - Guía completa</li>
            <li><code>components/IMPLEMENTATION_EXAMPLES.md</code> - Ejemplos de implementación</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Section({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        {children}
      </div>
    </section>
  );
}

function SubSection({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
        {title}
      </h3>
      {children}
    </div>
  );
}

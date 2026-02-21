import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProjectTracker() {
  const { projectsByStatus, isLoading } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" message="Loading projects..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Tracker</h1>
          <p className="text-muted-foreground">Manage your development projects</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="Planning">Planning</TabsTrigger>
          <TabsTrigger value="In Progress">In Progress</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {Object.entries(projectsByStatus).map(([status, projects]) => (
            <div key={status}>
              <h2 className="mb-3 text-lg font-semibold">{status}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id.toString()}
                    project={project}
                    onEdit={() => {
                      setEditingProject(project);
                      setShowForm(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        {['Planning', 'In Progress', 'Completed'].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projectsByStatus[status]?.length === 0 ? (
                <div className="col-span-full rounded-lg border border-dashed p-12 text-center">
                  <p className="text-muted-foreground">No {status.toLowerCase()} projects</p>
                </div>
              ) : (
                projectsByStatus[status]?.map((project) => (
                  <ProjectCard
                    key={project.id.toString()}
                    project={project}
                    onEdit={() => {
                      setEditingProject(project);
                      setShowForm(true);
                    }}
                  />
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {showForm && (
        <ProjectForm
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          project={editingProject}
        />
      )}
    </div>
  );
}

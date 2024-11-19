import { ProjectCard } from '@/components/projects/project-card';
import { Button } from '../../../components/ui/button';
import { useProjects } from '@/hooks/use-project';
import { Plus } from 'lucide-react';

export default function ProjectsPage() {
  const { projects, isLoading } = useProjects();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
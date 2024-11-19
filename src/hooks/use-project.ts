import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Project } from '../types/project'; 
import { ProjectService } from '../lib/service/project.service';
import { Toast } from '../components/ui/toast';

export function useProjects() {
  const queryClient = useQueryClient();

  const projects = useQuery({
    queryKey: ['projects'],
    queryFn: ProjectService.getAll,
  });

  const createProject = useMutation({
    mutationFn: ProjectService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      Toast({ title: 'Project created successfully' });
    },
  });

  const updateProject = useMutation({
    mutationFn: ({ id, projectData }: { id: string; projectData: Partial<Project> }) => ProjectService.update(id, projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      Toast({ title: 'Project updated successfully' });
    },
  });

  return {
    projects: projects.data,
    isLoading: projects.isLoading,
    isError: projects.isError,
    error: projects.error,
    create: createProject.mutate,
    update: updateProject.mutate,
  };
}
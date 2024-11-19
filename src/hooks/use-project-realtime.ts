import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getSocket } from '@/lib/reealtime/socket';
import { useAuth } from './use-auth';

export function useProjectRealtime(projectId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();
    socket.emit('join:project', projectId);

    interface ProjectUpdateData {
      id: string;
      name: string;
      description: string;
    }

    socket.on('project:update', (data: ProjectUpdateData) => {
      queryClient.setQueryData(['projects', projectId], data);
    });

    socket.on('forecast:new', () => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'forecasts'] });
    });

    return () => {
      socket.emit('leave:project', projectId);
      socket.off('project:update');
      socket.off('forecast:new');
    };
  }, [projectId, user, queryClient]);
}
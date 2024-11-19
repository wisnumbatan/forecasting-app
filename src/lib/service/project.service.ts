import { api } from '@/lib/utils/api';
import { Project, ProjectMember, ProjectStatus } from '@/types/project';

export class ProjectService {
  static async getAll(): Promise<Project[]> {
    try {
      const { data } = await api.get<Project[]>('/projects');
      return data;
    } catch (error) {
      throw new Error('Failed to fetch projects');
    }
  }

  static async getById(id: string): Promise<Project> {
    try {
      const { data } = await api.get<Project>(`/projects/${id}`);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch project');
    }
  }

  static async create(projectData: Partial<Project>): Promise<Project> {
    try {
      const { data } = await api.post<Project>('/projects', projectData);
      return data;
    } catch (error) {
      throw new Error('Failed to create project');
    }
  }

  static async update(id: string, projectData: Partial<Project>): Promise<Project> {
    try {
      const { data } = await api.put<Project>(`/projects/${id}`, projectData);
      return data;
    } catch (error) {
      throw new Error('Failed to update project');
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`/projects/${id}`);
    } catch (error) {
      throw new Error('Failed to delete project');
    }
  }

  static async addMember(projectId: string, userId: string, role: ProjectMember['role']): Promise<Project> {
    try {
      const { data }: { data: Project } = await api.post(`/projects/${projectId}/members`, {
        userId,
        role
      });
      return data;
    } catch (error) {
      throw new Error('Failed to add member');
    }
  }

  static async removeMember(projectId: string, userId: string): Promise<Project> {
    try {
      const { data }: { data: Project } = await api.delete(`/projects/${projectId}/members/${userId}`);
      return data;
    } catch (error) {
      throw new Error('Failed to remove member');
    }
  }

  static async updateMemberRole(
    projectId: string, 
    userId: string, 
    role: ProjectMember['role']
  ): Promise<Project> {
    try {
      const { data }: { data: Project } = await api.put(`/projects/${projectId}/members/${userId}`, { role });
      return data;
    } catch (error) {
      throw new Error('Failed to update member role');
    }
  }

  static async updateStatus(projectId: string, status: ProjectStatus): Promise<Project> {
    try {
      const { data }: { data: Project } = await api.patch(`/projects/${projectId}/status`, { status });
      return data;
    } catch (error) {
      throw new Error('Failed to update project status');
    }
  }
}
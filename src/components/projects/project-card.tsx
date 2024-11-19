import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { ProjectMember } from "@/types/project";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    status: string;
    members: ProjectMember[];
    forecastCount?: number;
    createdAt: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
        </div>
        <Badge variant={project.status === 'active' ? 'success' : 'secondary'}>
          {project.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Members</p>
          <div className="text-lg font-semibold">
            {project.members.map((member) => (
              <p key={member.user}>{member.user}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Forecasts</p>
          <p className="text-lg font-semibold">{project.forecastCount}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Created {format(new Date(project.createdAt), 'MMM dd, yyyy')}
        </p>
        <Link href={`/dashboard/projects/${project.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
      </div>
    </Card>
  );
}
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, ExternalLink } from 'lucide-react';
import { Project } from '../backend';

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
}

export default function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const statusColors = {
    Planning: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'In Progress': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <Badge className={statusColors[project.status as keyof typeof statusColors] || ''}>{project.status}</Badge>
        </div>

        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            View on GitHub
          </a>
        )}

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <Badge key={index} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-3">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}

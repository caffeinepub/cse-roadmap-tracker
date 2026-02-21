import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddProject } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Project } from '../backend';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  project?: Project | null;
}

export default function ProjectForm({ open, onClose, project }: ProjectFormProps) {
  const [name, setName] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [status, setStatus] = useState('Planning');
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);

  const addProject = useAddProject();

  useEffect(() => {
    if (project) {
      setName(project.name);
      setGithubLink(project.githubLink);
      setStatus(project.status);
      setTechStack(project.techStack);
    } else {
      setName('');
      setGithubLink('');
      setStatus('Planning');
      setTechStack([]);
    }
  }, [project]);

  const handleAddTech = () => {
    if (techInput.trim()) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error('Please enter a project name');
      return;
    }

    try {
      await addProject.mutateAsync({ name, githubLink, techStack });
      toast.success('Project added successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to add project');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub Link</Label>
            <Input
              id="github"
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tech">Tech Stack</Label>
            <div className="flex gap-2">
              <Input
                id="tech"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="e.g., React, Node.js"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTech}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {tech}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTech(index)} />
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addProject.isPending}>
              {addProject.isPending ? 'Saving...' : project ? 'Update' : 'Add Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

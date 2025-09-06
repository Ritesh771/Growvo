import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  technologies, 
  githubUrl, 
  demoUrl,
  category 
}: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-hover transition-smooth hover:-translate-y-1 card-gradient border border-white/20">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-32 md:h-48 object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-smooth" />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/90 text-primary text-xs font-medium">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-smooth">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 rounded-md bg-secondary text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border border-primary/30 hover:border-primary hover:bg-primary/5"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          {demoUrl && (
            <Button
              size="sm"
              className="flex-1 btn-gradient hover:shadow-hover"
              asChild
            >
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
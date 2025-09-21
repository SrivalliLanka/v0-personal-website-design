import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

export function ProjectsSection() {
  const projects = [
    {
      title: "E-commerce Store",
      description:
        "A modern e-commerce platform built with Next.js and Stripe integration. Features include product catalog, shopping cart, and secure checkout.",
      image: "/modern-ecommerce-interface.png",
      technologies: ["Next.js", "Stripe", "Tailwind CSS"],
    },
    {
      title: "Restaurant Website",
      description:
        "A beautiful restaurant website with online menu, reservation system, and location finder. Optimized for mobile and desktop.",
      image: "/restaurant-website.png",
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Portfolio Blog",
      description:
        "A personal blog platform with CMS integration, SEO optimization, and responsive design. Built for content creators and professionals.",
      image: "/clean-blog-website-layout.jpg",
      technologies: ["Gatsby", "Contentful", "GraphQL"],
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-balance">My Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 text-primary">{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

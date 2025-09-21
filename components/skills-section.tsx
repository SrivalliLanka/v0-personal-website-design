export function SkillsSection() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      category: "Design Tools",
      skills: ["Figma", "Photoshop"],
    },
    {
      category: "Other",
      skills: ["WordPress", "Git"],
    },
  ]

  const allSkills = skillCategories.flatMap((cat) => cat.skills)

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-balance">Skills & Technologies</h2>

          <div className="space-y-12">
            {/* All Skills Display */}
            <div className="flex flex-wrap justify-center gap-4">
              {allSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:bg-primary/90 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Categorized Skills */}
            <div className="grid md:grid-cols-3 gap-8">
              {skillCategories.map((category, index) => (
                <div key={index} className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">{category.category}</h3>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="px-4 py-2 bg-card rounded-lg border hover:border-primary/50 transition-colors"
                      >
                        <span className="text-card-foreground font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

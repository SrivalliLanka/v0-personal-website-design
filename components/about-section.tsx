export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-balance">About Me</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate web developer with over 5 years of experience creating digital experiences that make a
                difference. I specialize in modern web technologies and have a keen eye for design that converts
                visitors into customers.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects,
                or mentoring aspiring developers. I believe in creating websites that are not just beautiful, but also
                accessible and performant.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I work closely with clients to understand their unique needs and translate their vision into reality
                through clean, efficient code and thoughtful user experiences.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">What I Enjoy</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-card">
                  <span className="text-2xl">☕</span>
                  <span className="font-medium">Coffee</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-card">
                  <span className="text-2xl">📸</span>
                  <span className="font-medium">Photography</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-card">
                  <span className="text-2xl">✈️</span>
                  <span className="font-medium">Travel</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-card">
                  <span className="text-2xl">💻</span>
                  <span className="font-medium">Coding</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-balance">About Me</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate MSIM student at the University of Illinois Urbana-Champaign with a strong interest in
                Data Science and Analytics. I enjoy exploring data patterns, building analytical models, and deriving
                meaningful insights that drive decision-making.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not analyzing data, you'll find me learning new analytical techniques, working on data
                visualization projects, or exploring the latest trends in machine learning and statistical modeling. I
                believe in the power of data to tell compelling stories and solve real-world problems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always eager to collaborate on projects that involve data analysis, predictive modeling, and
                creating data-driven solutions that make a meaningful impact.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">What I Enjoy</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-card">
                  <span className="text-2xl">📊</span>
                  <span className="font-medium">Data Analysis</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-card">
                  <span className="text-2xl">🤖</span>
                  <span className="font-medium">Machine Learning</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-card">
                  <span className="text-2xl">📈</span>
                  <span className="font-medium">Data Visualization</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-card">
                  <span className="text-2xl">💡</span>
                  <span className="font-medium">Problem Solving</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

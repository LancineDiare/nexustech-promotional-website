// App is the main component that will contain all website sections.
function App() {
  return (
    <main>
      <section className="section-padding">
        <div className="container text-center">
          <div className="glass-panel p-4 p-md-5">
            <p className="text-uppercase text-info fw-semibold mb-2">
              Enterprise Software Solutions
            </p>

            <h1 className="display-3 fw-bold mb-3">
              Welcome to <span className="gradient-text">NexusTech</span>
            </h1>

            <p className="lead mx-auto mb-4" style={{ maxWidth: "700px" }}>
              A modern promotional portal for discovering, configuring, and
              evaluating enterprise software solutions.
            </p>

            <button type="button" className="btn btn-neon">
              Explore Our Solutions
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// Export App so it can be imported by main.jsx.
export default App;
const ClientLogos = () => {
  const clients = [
    "Fortune 500",
    "Global Banks",
    "Energy Leaders",
    "Tech Giants",
    "Healthcare Systems",
    "Manufacturing",
    "Retail Chains",
  ];

  return (
    <section className="py-16 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-4">
        <p className="text-center text-lg md:text-xl text-foreground mb-10">
          Trusted by{" "}
          <span className="text-primary font-medium">industry leaders across sectors worldwide</span>
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {clients.map((client) => (
            <div 
              key={client}
              className="text-muted-foreground/60 font-semibold text-lg md:text-xl tracking-tight hover:text-foreground transition-colors duration-300"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;

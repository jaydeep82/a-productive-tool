import { Button } from "@/components/atoms/Button";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-8 pt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 animate-in">
          {/* Icon is decorative, hidden from screen readers */}
          <Zap size={14} className="fill-primary" aria-hidden="true" />
          <span>v1.0 is now live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl text-balance">
          Master Your Workflow with <span className="text-primary/60">Autonomous</span> Precision.
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl text-balance">
          The ultimate productivity suite for senior engineers and product leaders.
          Built with Clean Architecture, high-performance code, and a obsession for detail.
        </p>

        <div className="flex items-center gap-4 mt-4">
          <Button size="lg" className="gap-2">
            Get Started {/* Icon is decorative, hidden from screen readers */}
            <ArrowRight size={20} aria-hidden="true" />
          </Button>
          <Button variant="outline" size="lg">
            View Roadmap
          </Button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Invisible H2 heading to provide semantic context for the section landmark */}
        <h2 className="sr-only">Key Features</h2>
        <FeatureCard
          icon={<Zap className="text-blue-500" />}
          title="Lightning Fast"
          description="Optimized for Core Web Vitals and peak performance. Zero unnecessary overhead."
        />
        <FeatureCard
          icon={<Shield className="text-green-500" />}
          title="Secure by Default"
          description="Strict security protocols and automated dependency auditing for peace of mind."
        />
        <FeatureCard
          icon={<BarChart3 className="text-purple-500" />}
          title="Insightful Analytics"
          description="Track your productivity with clean, actionable data visualizations."
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    // Note: Since this card is not interactive (no onClick or link), using a div is correct.
    <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Icon wrapper is decorative, hidden from screen readers */}
      <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center border border-border mb-6 group-hover:scale-110 transition-transform" aria-hidden="true">
        {icon}
      </div>
      {/* H3 provides correct heading structure within the section */}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

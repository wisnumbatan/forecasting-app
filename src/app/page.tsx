// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Lock, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-primary/5 to-background text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Advanced Time Series Forecasting
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
          Powerful, accurate, and easy-to-use forecasting platform for your business needs
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/register">
            <Button>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button>
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10" />}
              title="Advanced Analytics"
              description="Powerful statistical models and machine learning algorithms for accurate predictions"
            />
            <FeatureCard
              icon={<Lock className="h-10 w-10" />}
              title="Secure & Reliable"
              description="Enterprise-grade security with data encryption and regular backups"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10" />}
              title="Team Collaboration"
              description="Work together efficiently with role-based access control and sharing features"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Forecasting?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of businesses making better decisions with our platform
          </p>
          <Link href="/register">
            <Button>
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
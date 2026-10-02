import { ArrowUp, CornerDownLeft, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestedPrompts = [
  "Find me a software engineering job",
  "Track my job applications",
  "Help me manage my AlgoLens project",
  "Plan my week",
];

export default function WelcomeScreen() {
  return (
    <section className="flex min-h-0 flex-1 w-full items-center justify-center overflow-hidden bg-background px-4 py-8">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          What can I help you accomplish?
        </h1>

        <div className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg shadow-background/20">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Add attachment"
            className="shrink-0 rounded-xl text-text-secondary hover:bg-muted hover:text-foreground"
          >
            <Plus className="size-5" />
          </Button>

          <Input
            type="text"
            placeholder="Tell me what you want to accomplish."
            aria-label="Tell me what you want to accomplish."
            className="h-10 border-0 bg-transparent px-1 text-base shadow-none placeholder:text-text-muted focus-visible:ring-0"
          />

          <Button
            type="button"
            variant="default"
            size="icon"
            aria-label="Send message"
            className="shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/80"
          >
            <ArrowUp className="size-5" />
          </Button>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {suggestedPrompts.map((prompt) => (
            <Button
              key={prompt}
              type="button"
              variant="outline"
              className="h-auto min-h-12 justify-between gap-4 rounded-xl border-border bg-card px-4 py-3 text-left text-sm font-normal text-text-secondary hover:border-primary/60 hover:bg-muted hover:text-foreground"
            >
              <span className="truncate">{prompt}</span>
              <CornerDownLeft className="size-4 shrink-0 text-text-muted" />
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

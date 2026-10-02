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

        <div className="flex min-h-44 w-full flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-lg shadow-background/20 transition-colors focus-within:border-primary/60">
          <Input
            type="text"
            placeholder="What do you want to accomplish?"
            aria-label="What do you want to accomplish?"
            className="h-10 border-0 bg-transparent px-0 text-base shadow-none placeholder:text-text-secondary focus-visible:ring-0"
          />

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              className="h-9 gap-2 rounded-lg px-2 text-sm text-text-secondary hover:bg-muted hover:text-foreground"
            >
              <Plus className="size-4" />
              <span>Attach</span>
            </Button>

            <Button
              type="button"
              variant="default"
              size="icon"
              aria-label="Send message"
              className="size-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80"
            >
              <ArrowUp className="size-5" />
            </Button>
          </div>
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

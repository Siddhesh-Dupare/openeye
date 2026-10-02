import { ArrowUp, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WelcomeScreen() {
  return (
    <section className="flex min-h-0 flex-1 w-full items-center justify-center overflow-hidden bg-background px-4 py-8">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Welcome Siddhesh
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
            placeholder="Ask anything"
            aria-label="Ask anything"
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
      </div>
    </section>
  );
}

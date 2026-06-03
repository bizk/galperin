"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useState } from "react";
import { createSearchTask } from "../lib/api";

export function SearchTaskForm(): ReactNode {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const task = await createSearchTask({
        query
      });
      router.push(`/search-tasks/${task.id}`);
      router.refresh();
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to create search task.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="query">Product search</label>
      <input
        className="input"
        id="query"
        minLength={2}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Example: stainless steel water bottle"
        required
        type="text"
        value={query}
      />
      <button className="button" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Creating task..." : "Create search task"}
      </button>
      {errorMessage ? <p className="muted">{errorMessage}</p> : null}
    </form>
  );
}

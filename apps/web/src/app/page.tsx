import type { SearchTaskSummary } from "@galperin/shared";
import Link from "next/link";
import type { ReactNode } from "react";
import { SearchTaskForm } from "../components/search-task-form";
import { StatusBadge } from "../components/status-badge";
import { listSearchTasks } from "../lib/api";

export default async function HomePage(): Promise<ReactNode> {
  const searchTasks: readonly SearchTaskSummary[] = await listSearchTasks().catch(() => []);

  return (
    <main className="page stack">
      <section>
        <p className="muted">Galperin</p>
        <h1>Find supplier products asynchronously.</h1>
        <p className="muted">
          Create a search task, let the scraper queue process suppliers, then review normalized products.
        </p>
      </section>

      <section className="panel">
        <h2>Create a task</h2>
        <SearchTaskForm />
      </section>

      <section className="panel stack">
        <div>
          <h2>Recent tasks</h2>
          <p className="muted">Statuses refresh when you reload the page.</p>
        </div>
        <div className="grid">
          {searchTasks.length === 0 ? <p className="muted">No search tasks yet.</p> : null}
          {searchTasks.map((task: SearchTaskSummary) => (
            <Link className="task-card stack" href={`/search-tasks/${task.id}`} key={task.id}>
              <div>
                <StatusBadge status={task.status} />
              </div>
              <strong>{task.query}</strong>
              <span className="muted">
                {task.productCount} products · suppliers: {task.supplierKeys.join(", ")}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

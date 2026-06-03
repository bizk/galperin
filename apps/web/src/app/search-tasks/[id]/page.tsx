import type { SearchTaskDetail, SupplierProductSummary } from "@galperin/shared";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { StatusBadge } from "../../../components/status-badge";
import { getSearchTask } from "../../../lib/api";

type SearchTaskPageProperties = {
  readonly params: Promise<{
    readonly id: string;
  }>;
};

export default async function SearchTaskPage(properties: SearchTaskPageProperties): Promise<ReactNode> {
  const params: { readonly id: string } = await properties.params;
  const task: SearchTaskDetail | null = await getSearchTask(params.id).catch(() => null);

  if (!task) {
    notFound();
  }

  return (
    <main className="page stack">
      <Link className="muted" href="/">
        Back to tasks
      </Link>

      <section className="panel stack">
        <div>
          <StatusBadge status={task.status} />
          <h1>{task.query}</h1>
          <p className="muted">
            {task.productCount} products · suppliers: {task.supplierKeys.join(", ")}
          </p>
        </div>
        {task.errorMessage ? <p>{task.errorMessage}</p> : null}
      </section>

      <section className="panel stack">
        <h2>Products</h2>
        <div className="grid">
          {task.products.length === 0 ? <p className="muted">No products have been persisted yet.</p> : null}
          {task.products.map((product: SupplierProductSummary) => (
            <article className="task-card stack" key={product.id}>
              <div>
                <strong>{product.title}</strong>
                <p className="muted">{product.supplierName ?? product.supplierKey}</p>
              </div>
              <p>
                {product.price ?? "No price"} · MOQ {product.minimumOrderQuantity ?? "not listed"}
              </p>
              <a href={product.productUrl} rel="noreferrer" target="_blank">
                View supplier product
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

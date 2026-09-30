// admin/AdminNotFound.jsx
import { Link } from "react-router-dom";
import { Card } from "./adminUI";

export default function AdminNotFound() {
  return (
    <Card>
      <div className="text-center py-10">
        <div className="mx-auto h-12 w-12 rounded-full bg-smsorange-50 text-smsorange-600 grid place-items-center font-bold mb-3">404</div>
        <h2 className="text-xl font-bold text-charcoal-900">Page not found</h2>
        <p className="mt-1 text-sm text-charcoal-500">This admin section doesn't exist.</p>
        <Link to="/admin" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-smsorange-500 hover:bg-smsorange-600 text-white text-sm font-semibold">
          ← Back to Overview
        </Link>
      </div>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";

export default function ContactInfo() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Let’s Talk</h2>

      <p className="text-muted-foreground text-sm">
        We help coaching centers manage students, fees, batches, and exams easily.
      </p>

      <div className="space-y-2 text-sm">
        <p>✔ Student Management</p>
        <p>✔ Fee Tracking</p>
        <p>✔ Batch Scheduling</p>
        <p>✔ Attendance System</p>
      </div>

      <Badge>Response within 24h</Badge>
    </div>
  );
}
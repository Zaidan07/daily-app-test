import DailyPage from "@/components/UserDaily";
import { NotificationSetup } from "@/components/Common/NotificationSetup";


export default function UserPage() {
  return (
    <>
      <NotificationSetup />
      <DailyPage />
    </>
  );
}
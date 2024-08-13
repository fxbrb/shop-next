import { CustomIcons } from "@/components/icons/CustomIcons";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex size-full min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center">
        <div className="size-32 animate-pulse">
          <CustomIcons name="logo" />
        </div>
        <p className="-mt-7 text-sm font-semibold">Chargement...</p>
      </div>
    </div>
  );
}

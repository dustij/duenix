export function ProfileLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-sky-400" />
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    </div>
  );
}

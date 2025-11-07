import AuthGuard from '@/components/auth-guard';

export default function EditorPage() {
  return (
    <AuthGuard>
      <EditorInner />
    </AuthGuard>
  );
}

function EditorInner() {
  return <div>Editor Page</div>;
}

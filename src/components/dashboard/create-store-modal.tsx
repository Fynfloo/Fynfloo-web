import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StoreCreationFlow from './store-creation-flow';

export function CreateStoreModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full  p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle>Create Your Store</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <StoreCreationFlow />
        </div>
      </DialogContent>
    </Dialog>
  );
}

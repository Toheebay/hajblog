
import React from 'react';
import { AuthTabs } from './AuthForms';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <AuthTabs />
      </DialogContent>
    </Dialog>
  );
};

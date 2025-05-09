
import React from 'react';
import { AuthTabs } from './AuthForms';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, ButtonProps } from '@/components/ui/button';

interface AuthModalProps extends ButtonProps {
  triggerText: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ triggerText, ...buttonProps }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...buttonProps}>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <AuthTabs />
      </DialogContent>
    </Dialog>
  );
};

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PropsWithChildren } from "react";

type FormProps = React.FC<
  PropsWithChildren & {
    title: string;
    isOpen: boolean;
    onDismiss: () => void;
  }
>;

const FormDialog: FormProps = ({ children, title, onDismiss, isOpen }) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onDismiss();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;

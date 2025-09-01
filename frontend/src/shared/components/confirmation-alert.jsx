import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";

const defaultTextProps = {
  heading: "Are you absolutely sure?",
  description: "This action cannot be undone.",
  cancelBtnText: "Cancel",
  confirmBtnText: "Confirm",
};

const ConfirmationAlert = ({
  className = "",
  children,
  onCancel = () => {},
  onConfirm = () => {},
  textProps = {},
}) => {
  const mergedTextProps = { ...defaultTextProps, ...textProps };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={className} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{mergedTextProps.heading}</AlertDialogTitle>
          <AlertDialogDescription>
            {mergedTextProps.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="w-full md:max-w-1/2 grid grid-cols-2 gap-4">
            <AlertDialogCancel onClick={onCancel}>
              {mergedTextProps.cancelBtnText}
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>
              {mergedTextProps.confirmBtnText}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationAlert;

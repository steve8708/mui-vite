import * as React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

interface MenuButtonProps {
  children: React.ReactNode;
  showBadge?: boolean;
  [key: string]: any;
}

export default function MenuButton({
  children,
  showBadge = false,
  ...props
}: MenuButtonProps) {
  return (
    <IconButton
      sx={{ width: 48, height: 48, mr: -1 }}
      size="small"
      color="primary"
      {...props}
    >
      {showBadge ? (
        <Badge color="error" variant="dot">
          {children}
        </Badge>
      ) : (
        children
      )}
    </IconButton>
  );
}

import { Button, IconButton } from "@mui/material";

const SmallButton: React.FC<{
  value: string;
  icon?: React.ReactNode;
  buttonWidth?: number;
  disabled?: boolean;
  isSecondaryBackgroundColor?: boolean;
  onClick: (param: any) => void;
}> = ({
  value,
  icon,
  buttonWidth,
  disabled = false,
  isSecondaryBackgroundColor,
  onClick,
}) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      sx={{
        height: 52,
        textTransform: "none",
        fontSize: 18,
        borderRadius: 2,
        width: buttonWidth || "auto",
        ...(isSecondaryBackgroundColor && {
          backgroundColor: "var(--mui-palette-secondary-main)",
          color: "var(--mui-palette-primary-main)",
        }),
      }}
    >
      {icon && <IconButton sx={{ margin: 0, padding: 0 }}>{icon}</IconButton>}
      {value}
    </Button>
  );
};
export default SmallButton;

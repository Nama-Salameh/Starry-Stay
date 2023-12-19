import { Button } from "@mui/material";

const SmallButton: React.FC<{
  text: string;
  buttonWidth?: number;
  disabled?: boolean;
  onClick: () => void;
}> = ({ text, buttonWidth, disabled = false, onClick }) => {
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
      }}
    >
      {text}
    </Button>
  );
};
export default SmallButton;

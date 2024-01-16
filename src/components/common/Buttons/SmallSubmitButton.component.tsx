import { Button } from "@mui/material";

const SmallSubmitButton: React.FC<{
  text: string;
  buttonWidth?: number;
  disabled?: boolean;
}> = ({ text, buttonWidth = 110, disabled = false }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
      sx={{
        height: 38,
        width: buttonWidth,
        marginTop: 1,
        textTransform: "none",
      }}
    >
      {text}
    </Button>
  );
};
export default SmallSubmitButton;

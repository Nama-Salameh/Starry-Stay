import { Button } from "@mui/material";

const BigSubmitButton: React.FC<{
  text: string;
  buttonWidth?: number;
  disabled?: boolean;
}> = ({ text, buttonWidth = 500, disabled = false }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
      sx={{
        height: 50,
        width: buttonWidth,
        marginTop: 1,
        textTransform: "none",
        fontWeight: "Bold",
        fontSize: 18,
      }}
    >
      {text}
    </Button>
  );
};
export default BigSubmitButton;

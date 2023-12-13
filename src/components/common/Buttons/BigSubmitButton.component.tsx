import { Button } from "@mui/material";

const BigSubmitButton: React.FC<{
  text: string;
  buttonWidth?: number;
  disabled?: boolean;
  onClick: () => void;
}> = ({ text, buttonWidth = 500, disabled = false, onClick }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      onClick={onClick}
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

import { Button, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";

interface TextFieldWithButtonProps {
  id: string;
  onChange: any;
  onClickButton: any;
  disabled: any;
  buttonText: string;
  label: string;
  helperText?: string;
  autoComplete?: string;
  value?: string;
}

function TextFieldWithButton({ id, onChange, onClickButton, autoComplete = "", buttonText, label, helperText = "", disabled, value = "" }: TextFieldWithButtonProps) {

  return (
    <FormControl variant="outlined" error={!!helperText} className="mynick">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        label={label}
        fullWidth
        id={id}
        name={id}
        autoComplete={autoComplete}
        autoFocus
        onChange={onChange}
        disabled={disabled}
        aria-describedby={`${id}-helper-text`}
        defaultValue={value}
        endAdornment={
          <InputAdornment position="end">
            <Button onClick={onClickButton} color="primary" variant="contained" disabled={!!helperText} className="mynickbutton" style={{ fontFamily: "'GmarketSansMedium', sans-serif" }}>
              {disabled ? `${label} 재작성` : buttonText}
            </Button>
          </InputAdornment>
        }
      />
      <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default TextFieldWithButton;

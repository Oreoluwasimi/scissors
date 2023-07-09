import { createTheme } from "@material-ui/core";
//import { cyan } from "@material-ui/core/colors";

export default createTheme(
    {
        palette: {
            primary: {
                main: "#669CEE", //"#56B7BA",
                contrastText: "#fff",
            },
            secondary: {
                main: "#1D3447" //"#03142F",
            },
        },
        typography: {
            fontFamily: 'Poppins, sans-serif',
            button: {
                textTransform: "capitalize",
                fontWeight: 600,
            },
            h3: {
                fontWeight: 600,
            },
            h4: {
                fontWeight: 600,
            }
        }
    }
);
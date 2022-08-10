import {
  ChakraTheme,
  extendTheme,
  type ThemeConfig,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  styles: {
    global: (theme: StyleFunctionProps) => ({
      "*": {
        scrollBehavior: "smooth",
      },
      body: {
        backgroundColor: theme.theme.colors.black,
        color: theme.theme.colors.white,
        lineHeight: "1",
        minH: "100vh",
      },
    }),
  },
  fonts: {
    body: "'Raleway', sans-serif",
    raleway: "'Raleway', sans-serif",
    less: "'Less', sans-serif",
  },
  colors: {
    primary: {
      default: "#f95454",
      50: "#fee1e1",
      100: "#fdbaba",
      200: "#fb9393",
      300: "#fb7f7f",
      400: "#fa6b6b",
      500: "#f95454",
      600: "#f60909",
      700: "#e30808",
      800: "#bb0707",
      900: "#6c0404",
    },

    logo: "#9c7e79",

    background: {
      default: "white",
    },
  },

  components: {
    // Custom components go here
    GlobalLink: {
      defaultProps: {
        underline: "none",
      },
    },
    GlobalAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          backgroundColor: "white",
          height: 60,
        },
      },
    },
    GlobalTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },
    GlobalCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
          borderRadius: "10px",
        },
      },
    },
    Box: {
      variants: {
        paidBtn: (theme: StyleFunctionProps) => ({
          color: "green",
          border: "1px solid green",
          borderColor: "green",
          "&:hover": {
            backgroundColor: "green",
            color: "white",
          },
        }),
      },
    },
    Button: {
      /*defaultProps: {
        colorScheme: 'primary',
        variant: 'primary',
        size: 'brandSm',
      },*/
      sizes: {
        brandSm: {
          fontSize: "sm",
          px: 1,
          py: 1,
        },
        brandMd: {
          fontSize: "1rem",
          px: "1rem",
        },
        brandLg: {
          fontSize: "1.25rem",
          px: "1.25rem",
        },
      },
      variants: {
        primary: (theme: StyleFunctionProps) => ({
          overflow: "hidden",
          bg: "transparent",
          color: "white",
          borderRadius: "none",
          border: "none",
          borderTop: "3px solid transparent",
          borderBottomWidth: "3px",
          borderBottomStyle: "solid",
          borderBottomColor:
            theme.colorScheme !== "primary"
              ? theme.theme.colors[theme.colorScheme][500]
              : theme.theme.colors.primary[500],

          "&:hover": {
            bg: "blackAlpha.50",
            borderBottomColor:
              theme.colorScheme !== "primary"
                ? theme.theme.colors[theme.colorScheme][600]
                : theme.theme.colors.primary[600],
          },
          "&:active": {
            bg: "blackAlpha.75",
            borderBottomColor:
              theme.colorScheme !== "primary"
                ? theme.theme.colors[theme.colorScheme][700]
                : theme.theme.colors.primary[700],
          },
          "&:focus": {
            boxShadow: "none",
          },
        }),
      },
    },
  },
} as Partial<ChakraTheme>);

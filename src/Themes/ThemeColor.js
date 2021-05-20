import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  guide: {
    spacing: {
      xxs: '4px',
      xs: '8px',
      s: '12px',
      m: '16px',
      l: '24px',
      xl: '32px',
      xxl: '36px'
    },
    colors: {
      black: '#333333',
      'dark-grey': '#666666',
      grey: '#999999',
      'light-grey': '#e5e5e5',
      white: '#ffffff',
      'primary-brand-color': '#8e0c99',
      'cta-hover': '#b02ebb',
      'notification-background': '#1e1e1e',
      background: '#ededed',
      progress: '#48e674',
      error: '#fd6060',
      'secondary-colour-blue': '#3e97ff',
      'tile-colour-violet': '#945bf0',
      'tile-colour-green': '#b5e156',
      'tile-colour-yellow': '#ffdb1f',
      'tile-colour-blue-2': '#546df5',
      'tile-colour-blue': '#6ec5f5',
      'tile-colour-orange': '#f4893b'
    }
  },
  spacing: 4
});

export default ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

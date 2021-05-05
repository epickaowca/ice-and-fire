import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
media: {
    tablet: "@media only screen and (min-width: 768px)",
    desktop: "@media only screen and (min-width: 1440px)",
},
colors: {
    backgroundColor: '#1E2139',
    fireColor: '#FF5A00',
    iceColor: '#B4CFFA',
},
};

export { myTheme };
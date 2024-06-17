import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Press Start 2P', Arial, sans-serif;
    background-color: #1b2127;
    color: #f1f7f3;
  }
 

  a {
    color: #f1f7f3;
  }

  header, footer, div {
    border-radius: 5px !important; 
  }

  .w-md-editor-toolbar, .wmde-markdown {
  background-color: #12161a;
  font-family: 'Press Start 2P'
  }

  .tagInput{
    margin-top: 1%;
  }

  .logo-text{
    text-decoration: none;
    font-size: 1.7em;
  }
`

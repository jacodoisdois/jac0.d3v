import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "IBM Plex Mono", monospace;
    background-color: #1b2127;
    color: #f1f7f3;
  }
  
  .logo-text{
    font-family: 'Press Start 2P', Arial, sans-serif;
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
    font-size: 2em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .logo-text:hover {
    color: #8e8e8e;
    transform: scale(1.25); 
    display: inline-block; 
    transition: transform 0.15s ease-out;
  }

  h2 {
    font-size: 1.3em;
  }
`

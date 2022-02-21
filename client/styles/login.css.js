export default () => `
  padding: 0 2rem;

  .main {
    min-height: 100vh;
    padding: 4rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .title {
      margin: 0;
      line-height: 1.15;
      font-size: 4rem;
      text-align: center;

      a {
        color: #0070f3;
        text-decoration: none;

        :hover,
        :focus,
        :active {
          text-decoration: underline;
        }
      }
    }

    .description {
      margin: 4rem 0;
      line-height: 1.5;
      font-size: 1.5rem;
      text-align: center;

      .code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
          Bitstream Vera Sans Mono, Courier New, monospace;
      }
    }
    
    .Grid{
        background: "pink";
    }
    .cardcarousel {
        text-align: left;
        transition: color 0.15s ease, border-color 0.15s ease;
        max-width: 1000px;
    }

    .card {
      margin: 1rem;
      padding: 1.5rem;
      text-align: left;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      transition: color 0.15s ease, border-color 0.15s ease;
      max-width: 1000px;


    
      a {
        text-decoration: none;
        color: inherit;
      }
      
      
      

      h2 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      h4 {
        margin: 1 10 1rem 0;
        font-size: 0.5rem;
        font-family: Roboto;
      }
      
      .signintext {
        font-size: 3rem;

      }

      p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }
    }
  }
  
  .carousel {
    border-radius: 0px;
    width: 400px;
    height: 400px;
  }
  .carousel__main {
    border-radius: 0px;
    height: 400px;
  }
  
  .demo-item {
    height: 400px;
  }

  .footer {
    display: flex;
    flex: 1;
    padding: 2rem 0;
    border-top: 1px solid #eaeaea;
    justify-content: center;
    align-items: center;


    a {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      text-decoration: none;
      color: inherit;
    }

    .logo {
      height: 1em;
      margin-left: 0.5rem;
    }
  }

`

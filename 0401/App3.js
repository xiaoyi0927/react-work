import React from 'react';

const App = () => {
   render() 
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
const Header = () => {
   render() 
      return (
         <div>
            <h1>Header</h1>
         </div>
      );
}
const Content = () => {
   render() 
      return (
         <div>
            <h2>Content</h2>
            <p>The content text!!!</p>
         </div>
      );
}
export default App;
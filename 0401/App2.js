import React from 'react';

function App () {
   render() 
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
function Header () {
   render() 
      return (
         <div>
            <h1>Header</h1>
         </div>
      );
}
function Content (){
   render() 
      return (
         <div>
            <h2>Content</h2>
            <p>The content text!!!</p>
         </div>
      );
}
export default App;
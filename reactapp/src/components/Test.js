import React, { Component } from 'react'

 class Test extends Component {
     constructor(props){
         super(props);
         this.state = {
             a:10
         }
         console.log("Constructor");
         
     }
     componentDidMount() {
         console.log("ComponentDidMount");
         //React burda Api isteklerinizi gerçekleştirin der.
         this.setState({
             a:20
         });
     }
     componentDidUpdate = (prevProps, prevState) => {
         console.log("ComponentDidUpdate");
         //State,prop değişirse ya da setstate, forceUpdate kullanılırsa güncelleşme uygulanır. Güncelleşmeden sonra DOM Manipulasyonu yapmak istiyorsak kullanırız.
         // Bazı durumlarda update olduktan sonra render yapılmasını istemiyorsak default ComponentShouldUpdate fonksiyonunu özel olarak yazıp false döndürürüz.Yoksa default true döner.    
         //ComponentShuoldUpdate yenibaşlayanlar için tavsiye edilmez ancak return false döndürerek performans arttırabiliriz. Ancak react dokumanlarda bunun yerine OureComponent tavsiye ediliyor.

        }
        shouldComponentUpdate = () => {
            console.log("should Component Update");
            return true;
        }
        
     
     
    render() {
        console.log("Render");
        
        return (
            <div>
                <h2>  {this.props.test}  </h2>
            </div>
        )
    }
}
export default Test; 

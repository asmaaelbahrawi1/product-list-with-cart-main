# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). 

## Table of contents

  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Author](#author)


### Screenshot
![image](https://github.com/user-attachments/assets/6adc6eb1-63dd-4e8c-b2fe-a15dc72d2eca)
![image](https://github.com/user-attachments/assets/b76900cb-610b-41e8-afbd-0fc0063ca487)
![image](https://github.com/user-attachments/assets/23c1a0c2-cdea-43e5-901a-42669ef5b2f9)


![image](https://github.com/user-attachments/assets/4ce60d71-5d04-4523-a2ee-82b71d78de9d)
![image](https://github.com/user-attachments/assets/4c5516cc-b198-4e9f-bbb1-e4e551deccee)
![image](https://github.com/user-attachments/assets/22d5dd4b-87aa-4f55-98f8-6d606f23c853)


### Links
- Solution URL: [Solution ](https://www.frontendmentor.io/solutions/responsive-product-list-with-cart-using-html-css-java-script-wwzJZ4lWJD)
- Live Site URL: [Live Demo](https://asmaaelbahrawi1.github.io/product-list-with-cart-main/)


### Built with
- Semantic HTML5 markup
- CSS 
- Flexbox
- CSS Grid
- Java Script 
- Mobile-first workflow




### What I learned
I learned how to handle json file using java script it was amazing that i had less html code and more java script . Just fetching data fron json file and use it more dynamically in java script as the following:
```js
fetch('data.json')
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
```

## Author

- Frontend Mentor - [Asmaa Elbahrawi](https://www.frontendmentor.io/profile/asmaaelbahrawi1)
- Linked In - [Asmaa Elbahrawi](https://www.linkedin.com/in/asmaa-elbahrawi/)

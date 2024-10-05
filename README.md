# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). 

## Table of contents

  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Author](#author)


### Screenshot
![image](https://github.com/user-attachments/assets/08046c43-f0a4-453f-be8b-e734a938781c)
![image](https://github.com/user-attachments/assets/4cb64f43-1ea0-4fd6-afdc-f684c90dec03)
![image](https://github.com/user-attachments/assets/5e10f910-95a8-4fad-a7c3-6446d4e5b83b)

![image](https://github.com/user-attachments/assets/c061fd80-9b4d-49fa-a29a-e1ca4c7bb382)
![image](https://github.com/user-attachments/assets/018bfd9e-57c7-4d87-ba5e-492ca2476412)
![image](https://github.com/user-attachments/assets/7ccaa693-7f0a-441c-a985-0a07c71f9efb)



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

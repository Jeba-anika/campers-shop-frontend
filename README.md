<!-- <div align="center">
  <h1>Comprehensive Project README Template</h1>
</div>

--- -->

# Campers Shop ([Live Link](https://campers-shop-mu.vercel.app/))

## Introduction

Campers Shop is an e-commerce website dedicated to providing all the necessary and fun items for camping enthusiasts.

## Project Description

Campers Shop is a user-friendly e-commerce website tailored specifically for camping enthusiasts. Designed with the adventurer in mind, this platform offers a seamless shopping experience, allowing users to easily browse, select, and purchase a wide range of camping gear and accessories.
This Minimum Viable Product (MVP) provides all the core functionalities expected of a modern e-commerce website. Users can effortlessly explore products through a well-organized catalog, take advantage of advanced search and filtering options, and dive deep into product details with rich descriptions and images. The website also supports intuitive cart management, allowing users to add, remove, and adjust quantities of items, ensuring a hassle-free shopping experience.
The checkout process is streamlined to cater to user convenience, offering both traditional and online payment methods, including integration with popular payment gateways like Stripe. Whether you prefer the simplicity of Cash on Delivery or the efficiency of online payments, Campers Shop has you covered. Dive into the website to check these exciting features.

## Features

- User-Friendly Interface.
- Responsive layout optimized for desktops, tablets, and smartphones.
- Advanced Search and Filtering
- Add to Cart functionality with quantity management based on stock availability.
- Add, remove, and update product quantities within the cart. Real-time pricing updates as items are added, removed, or modified.
- Streamlined checkout with user information collection
- Multiple payment options: Cash on Delivery and optional Stripe integration.
- Consistent design language with uniform colors, fonts, and styles.

## Technology Stack

- Front-end: React JS, Redux.
- Back-end: Node.js, Mongoose.

## Installation Guideline

Instructions on how to install, configure, and get the project running locally.

### Prerequisites

- Node Js need to be installed beforehand.

### Installation Steps

1. Clone this Github repo. To clone this repo, copy the url and give the following command on cmd:

```
git clone {copied_url}
```

2.Run this command:

```
npm install
```

3. After successful installation, run this command:

```
npm run dev
```

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.
   Example:
   ```bash
    REACT_APP_STRIPE_PK=your_stripe_pk
   ```

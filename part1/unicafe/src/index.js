/*
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Header = () =>{
  return(
    <h1>Give Feedback</h1>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
    )
  }


const Statistics = ({text, value}) =>{
  return (
    <tr><td>{text}: {value}</td></tr>
  )
}

const Footer = (props) =>{
  const {good, neutral, bad} = props.totalReviews
  const totalReviews = good + neutral + bad
  const positivereviews = (good / totalReviews)*100 || 0
  const avgReviews= (good - bad)/totalReviews || 0
  if (totalReviews !== 0){
    return(
      <div>
        <table>
          <thead>
            Statistics
          </thead>
          <tbody>
            <Statistics text="Good" value={good}/>
            <Statistics text="Neutral" value={neutral}/>
            <Statistics text="Bad" value={bad}/>
            <Statistics text="All" value={totalReviews}/>
            <Statistics text="Average" value={avgReviews}/>
            <Statistics text="Positive" value={positivereviews}/>

          </tbody>
        </table>
      </div>
    )
  }
  return(
    <p>No Feedback given</p>
  )
}

const App = () =>{
  const [review, setReview] = useState({"good": 0, "neutral": 0, "bad": 0})

  const newReview = (text) => {
    if(text ==="good"){
      return setReview( state => ({...state , good: state.good + 1}))
    }
    if(text ==="neutral"){
      return setReview( state => ({...state , neutral: state.neutral + 1}))
    }
    return setReview( state => ({...state , bad: state.bad + 1}))
   }

  const resetReviews = () => {
    setReview({good:0,neutral:0,bad:0})
  }
  
  return (
    <div>
      <Header/>
      <Button onClick={() => newReview("good")} text="Good"/>
      <Button onClick={() => newReview("neutral")} text="Neutral"/>
      <Button onClick={() => newReview("bad")} text="Bad"/>
      <Button onClick={resetReviews} text="Reset"/>
      <Footer totalReviews={review}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

*/

import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const ProductCategoryRow = ({ category }) =>{
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (!product.name.toLowerCase().includes(filterText.toLowerCase())) return;
    if (inStockOnly && !product.stocked) return;
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    );  
    lastCategory = product.category;
  });
   
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
  return (
    <form>
      <input 
      type="text" 
      value={filterText} 
      placeholder="Search..." 
      onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
      products={products}
      filterText={filterText}
      inStockOnly={inStockOnly} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

const App = () => {
  return <FilterableProductTable products={PRODUCTS} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
)

import React, {useEffect, useState} from 'react';
import './App.css';
import { get } from 'https';
import Recipe from './Recipe';

const App = () =>{
  const APP_ID = 'a68f9c44';
  const APP_KEY = '342d41d7eaf44a0222ac2f0e6515882d';
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')

  useEffect(()=>{
    getRecipes();
    
  }, [query]); // runs once when the application gets mounted with empty array, dependency array; whenever the value changes the effect fires


  const getRecipes = async() =>{
    const response = await fetch( `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

    //fetch(the link)
    //.then(response=>{response.json()})
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit= {getSearch} className="search-form">
        <input className="search-bar" type="text" value = {search} onChange={updateSearch}/>
        <button  className="search-button" type="submit">Search</button>
      </form>
      <div className= "recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key = {recipe.recipe.label}
        title = {recipe.recipe.label} 
        calories = {recipe.recipe.calories} 
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />

      ))}
     </div>
    </div>
  );
}
export default App;

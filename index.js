import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.post("/search",async(req,res)=>{
    try{
        const mealName = req.body.meal;
        const response=await axios.get("https://www.themealdb.com/api/json/v1/1/search.php",{
        params:{
            s:mealName,
        },
    });
    const result=response.data;
    res.render("index.ejs",{result:result});
    console.log(result);
    }
    catch(error){
        console.error("Failed to make request: ", error.message);
        res.render("index.ejs",{
            error:error.message,
        });
    }
});
app.post("/meal-details",async(req,res)=>{
    try{
        const mealId = req.body.mealId;
        const response=await axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php",{
            params:{
                i:mealId,
            },
        })
        const meal = response.data.meals[0];
        res.render("details.ejs", { meal: meal });
    }
    catch (error) {
    res.render("index.ejs", {
      error: error.message,
    });
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});